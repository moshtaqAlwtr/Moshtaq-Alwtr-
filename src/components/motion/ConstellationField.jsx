import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from '../../app/providers'

/**
 * Pointer-reactive constellation field.
 *
 * Nodes drift on their own and link to nearby neighbours; the pointer pushes
 * them aside and lights up whatever it passes near. Unlike a generic particle
 * library this reacts to the visitor, and it costs no extra dependency —
 * roughly 3KB of canvas code against ~147KB for a bundled particle engine.
 *
 * Runs only while the section is on screen and the tab is visible, and drops
 * out entirely under prefers-reduced-motion.
 */
export default function ConstellationField({ className = '', density = 0.00009 }) {
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

    // Brand colour comes from the theme tokens so the field recolours with it.
    const brand = getComputedStyle(document.documentElement)
      .getPropertyValue('--brand')
      .trim() || '255 143 63'

    // A dark accent on a light ground reads fainter than a bright accent on a
    // dark one at the same alpha, so the light theme gets more weight.
    const gain = theme === 'light' ? 1.75 : 1

    let width = 0
    let height = 0
    let nodes = []
    let raf = 0
    let running = true

    const pointer = { x: -9999, y: -9999, active: false }

    const LINK_DIST = 132
    const POINTER_RADIUS = 150

    function build() {
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(
        Math.min(Math.max(width * height * density, 26), 74)
      )

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.9 + Math.random() * 1.5,
        // per-node offset so the twinkle never pulses in unison
        phase: Math.random() * Math.PI * 2,
      }))
    }

    function frame(now) {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy

        // wrap rather than bounce: bouncing makes the edges read as walls
        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20

        if (pointer.active) {
          const dx = n.x - pointer.x
          const dy = n.y - pointer.y
          const d = Math.hypot(dx, dy)
          if (d < POINTER_RADIUS && d > 0.01) {
            const push = (1 - d / POINTER_RADIUS) * 0.9
            n.x += (dx / d) * push
            n.y += (dy / d) * push
          }
        }
      }

      // links first so nodes sit on top of them
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d > LINK_DIST) continue

          let alpha = (1 - d / LINK_DIST) * 0.28 * gain

          // brighten links the pointer is near
          if (pointer.active) {
            const mx = (a.x + b.x) / 2
            const my = (a.y + b.y) / 2
            const pd = Math.hypot(mx - pointer.x, my - pointer.y)
            if (pd < POINTER_RADIUS) alpha += (1 - pd / POINTER_RADIUS) * 0.5 * gain
          }

          ctx.strokeStyle = `rgb(${brand} / ${Math.min(alpha, 1).toFixed(3)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        const twinkle = 0.55 + Math.sin(now / 1400 + n.phase) * 0.25
        let alpha = twinkle * 0.7 * gain

        if (pointer.active) {
          const pd = Math.hypot(n.x - pointer.x, n.y - pointer.y)
          if (pd < POINTER_RADIUS) alpha += (1 - pd / POINTER_RADIUS) * 0.55 * gain
        }

        ctx.fillStyle = `rgb(${brand} / ${Math.min(alpha, 1).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (raf) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    function stop() {
      running = false
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    build()
    start()

    const ro = new ResizeObserver(build)
    ro.observe(parent)

    // don't burn frames on a section nobody is looking at
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    )
    io.observe(parent)

    const onVisibility = () => (document.hidden ? stop() : start())

    parent.addEventListener('pointermove', onPointerMove)
    parent.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      parent.removeEventListener('pointermove', onPointerMove)
      parent.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
    // theme is a dependency so the field picks up the new brand colour
  }, [reduced, density, theme])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
