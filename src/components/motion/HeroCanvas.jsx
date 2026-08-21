import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from '../../app/providers'

/**
 * Hero backdrop: rotating 3D wireframes over a pointer-reactive node field,
 * both drawn on a single canvas.
 *
 * The reference site gets this look from a bundled particle engine plus a 3D
 * library across two full-viewport canvases. The maths here is a torus and an
 * octahedron projected by hand — a few hundred line segments per frame — so it
 * costs one canvas, one animation frame, and no dependency at all.
 *
 * It also answers the pointer, which a self-running scene cannot: the shapes
 * lean toward the cursor and the nodes scatter away from it.
 */

/* ------------------------------------------------------------- geometry */

function torus(R, r, ringSeg, tubeSeg) {
  const verts = []
  const edges = []
  for (let i = 0; i < ringSeg; i++) {
    const u = (i / ringSeg) * Math.PI * 2
    for (let j = 0; j < tubeSeg; j++) {
      const v = (j / tubeSeg) * Math.PI * 2
      verts.push([
        (R + r * Math.cos(v)) * Math.cos(u),
        (R + r * Math.cos(v)) * Math.sin(u),
        r * Math.sin(v),
      ])
      const cur = i * tubeSeg + j
      // link along the tube, and across to the next ring
      edges.push([cur, i * tubeSeg + ((j + 1) % tubeSeg)])
      edges.push([cur, ((i + 1) % ringSeg) * tubeSeg + j])
    }
  }
  return { verts, edges }
}

function octahedron(s) {
  const verts = [
    [s, 0, 0], [-s, 0, 0],
    [0, s, 0], [0, -s, 0],
    [0, 0, s], [0, 0, -s],
  ]
  const edges = [
    [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [1, 3], [1, 4], [1, 5],
    [2, 4], [2, 5], [3, 4], [3, 5],
  ]
  return { verts, edges }
}

/* --------------------------------------------------------------- scene */

// x/y are fractions of the canvas, so the layout holds at any width.
const SHAPES = [
  { kind: 'torus', x: 0.22, y: 0.3, scale: 0.9, tone: 'brand', speed: [0.00022, 0.00035], depth: 1 },
  { kind: 'torus', x: 0.78, y: 0.22, scale: 0.45, tone: 'brand-2', speed: [-0.0004, 0.00028], depth: 0.7 },
  { kind: 'octa', x: 0.62, y: 0.74, scale: 1.15, tone: 'brand-3', speed: [0.0003, -0.00042], depth: 0.85 },
  { kind: 'octa', x: 0.12, y: 0.78, scale: 0.6, tone: 'brand-2', speed: [-0.00025, 0.0005], depth: 0.6 },
]

export default function HeroCanvas({ className = '' }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()
  const { theme } = useTheme()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const parent = canvas.parentElement
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const root = getComputedStyle(document.documentElement)
    const tone = (name) => root.getPropertyValue(`--${name}`).trim() || '255 143 63'
    // a dark accent on a light ground reads fainter at equal alpha
    const gain = theme === 'light' ? 1.7 : 1

    // Weaker devices draw the two feature shapes only. hardwareConcurrency is
    // a coarse signal, but it is the one that is actually available, and the
    // scene still reads as the same scene with half the geometry.
    const lowPower =
      (navigator.hardwareConcurrency || 8) <= 4 ||
      window.matchMedia('(pointer: coarse)').matches
    const active = lowPower ? SHAPES.slice(0, 2) : SHAPES

    const meshes = active.map((s) => ({
      ...s,
      geo: s.kind === 'torus' ? torus(1, 0.38, lowPower ? 12 : 16, lowPower ? 6 : 7) : octahedron(1),
      rgb: tone(s.tone),
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
    }))

    let w = 0, h = 0, unit = 0
    let nodes = []
    let raf = 0
    let running = true
    const pointer = { x: -9999, y: -9999, active: false }

    const LINK = 130
    const RADIUS = 150

    function build() {
      const rect = parent.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      unit = Math.min(w, h) * 0.13

      const count = Math.round(Math.min(Math.max(w * h * 0.00006, 16), lowPower ? 26 : 42))
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
        r: 0.9 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    function drawMesh(m, t) {
      m.rx += m.speed[0]
      m.ry += m.speed[1]

      // the pointer tilts the shape instead of only moving past it
      let leanX = 0, leanY = 0
      if (pointer.active) {
        leanX = ((pointer.y / h) - 0.5) * 0.55
        leanY = ((pointer.x / w) - 0.5) * 0.55
      }

      const cx = m.x * w
      const cy = m.y * h
      const size = unit * m.scale
      const cosX = Math.cos(m.rx + leanX), sinX = Math.sin(m.rx + leanX)
      const cosY = Math.cos(m.ry + leanY), sinY = Math.sin(m.ry + leanY)
      const fov = 3.2

      const pts = m.geo.verts.map(([x, y, z]) => {
        // rotate Y then X
        let X = x * cosY + z * sinY
        let Z = -x * sinY + z * cosY
        let Y = y * cosX - Z * sinX
        Z = y * sinX + Z * cosX
        const p = fov / (fov + Z)
        return [cx + X * size * p, cy + Y * size * p, p]
      })

      ctx.lineWidth = 1
      for (const [a, b] of m.geo.edges) {
        const pa = pts[a], pb = pts[b]
        // nearer edges are brighter, which is what makes it read as 3D
        const near = (pa[2] + pb[2]) / 2
        const alpha = Math.min(Math.max((near - 0.72) * 1.5, 0), 1) * 0.5 * m.depth * gain
        if (alpha < 0.01) continue
        ctx.strokeStyle = `rgb(${m.rgb} / ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(pa[0], pa[1])
        ctx.lineTo(pb[0], pb[1])
        ctx.stroke()
      }
    }

    function frame(now) {
      if (!running) return
      ctx.clearRect(0, 0, w, h)

      for (const m of meshes) drawMesh(m, now)

      const brand = tone('brand')
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < -20) n.x = w + 20
        if (n.x > w + 20) n.x = -20
        if (n.y < -20) n.y = h + 20
        if (n.y > h + 20) n.y = -20
        if (pointer.active) {
          const dx = n.x - pointer.x, dy = n.y - pointer.y
          const d = Math.hypot(dx, dy)
          if (d < RADIUS && d > 0.01) {
            const push = (1 - d / RADIUS) * 0.85
            n.x += (dx / d) * push
            n.y += (dy / d) * push
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d > LINK) continue
          let alpha = (1 - d / LINK) * 0.26 * gain
          if (alpha < 0.012 && !pointer.active) continue
          if (pointer.active) {
            const pd = Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y)
            if (pd < RADIUS) alpha += (1 - pd / RADIUS) * 0.45 * gain
          }
          ctx.strokeStyle = `rgb(${brand} / ${Math.min(alpha, 1).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        let alpha = (0.55 + Math.sin(now / 1400 + n.phase) * 0.25) * 0.7 * gain
        if (pointer.active) {
          const pd = Math.hypot(n.x - pointer.x, n.y - pointer.y)
          if (pd < RADIUS) alpha += (1 - pd / RADIUS) * 0.5 * gain
        }
        ctx.fillStyle = `rgb(${brand} / ${Math.min(alpha, 1).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    const start = () => { if (!raf) { running = true; raf = requestAnimationFrame(frame) } }
    const stop = () => { running = false; cancelAnimationFrame(raf); raf = 0 }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => { pointer.active = false; pointer.x = -9999; pointer.y = -9999 }

    build(); start()
    const ro = new ResizeObserver(build); ro.observe(parent)
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 })
    io.observe(parent)
    const onVis = () => (document.hidden ? stop() : start())

    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVis)

    return () => {
      stop(); ro.disconnect(); io.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduced, theme])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
