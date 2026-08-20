import { useRef } from 'react'
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

/* ------------------------------------------------------------------ split text */

const WORD = {
  hidden: { opacity: 0, y: '0.45em', rotateX: -55 },
  show: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * Staggered heading reveal.
 *
 * Splits on words only — never characters. Arabic letters change shape based
 * on their neighbours, so wrapping each character in its own element breaks
 * the joining and renders the word in isolated forms.
 */
export function SplitText({ text, className = '', delay = 0, stagger = 0.055, as = 'span' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  const Tag = motion[as] ?? motion.span

  if (reduced) return <Tag className={className}>{text}</Tag>

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ perspective: 600 }}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {String(text)
        .split(' ')
        .map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span variants={WORD} className="inline-block" aria-hidden>
              {word}
              {/* the trailing space has to live inside the animated span or
                  the words collapse together mid-flight */}
              {' '}
            </motion.span>
          </span>
        ))}
    </Tag>
  )
}

/* -------------------------------------------------------------------- magnetic */

/**
 * Pulls its child toward the pointer while hovered. Disabled on coarse
 * pointers, where there is no cursor to attract to.
 */
export function Magnetic({ children, strength = 0.35, radius = 90, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.35 })

  if (reduced) return <span className={className}>{children}</span>

  const onMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    const dist = Math.hypot(dx, dy)
    const falloff = Math.max(0, 1 - dist / (radius + Math.max(r.width, r.height) / 2))
    x.set(dx * strength * falloff)
    y.set(dy * strength * falloff)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  )
}

/* ------------------------------------------------------------------ tilt card */

/**
 * Pointer-tracked 3D tilt with a specular highlight that follows the cursor.
 * The highlight is what sells the depth — tilt alone reads as a cheap trick.
 */
export function Tilt({ children, className = '', max = 7, glare = true }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const active = useMotionValue(0)

  const srx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 220,
    damping: 22,
  })
  const sry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 220,
    damping: 22,
  })
  const glareOpacity = useSpring(active, { stiffness: 180, damping: 26 })

  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(320px circle at ${gx} ${gy}, rgb(var(--brand) / 0.16), transparent 65%)`

  if (reduced) return <div className={className}>{children}</div>

  const onMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
    active.set(1)
  }

  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
    active.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
      }}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  )
}

/* ---------------------------------------------------------------- clip reveal */

/**
 * Wipes content in behind a moving mask instead of fading it. Reads as
 * deliberate composition rather than "everything fades up".
 */
export function ClipReveal({ children, delay = 0, className = '', from = 'bottom' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  const hidden =
    from === 'bottom'
      ? 'inset(100% 0% 0% 0%)'
      : from === 'start'
        ? 'inset(0% 100% 0% 0%)'
        : 'inset(0% 0% 100% 0%)'

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: hidden, opacity: 0 }}
      animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
