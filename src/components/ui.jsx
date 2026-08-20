import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Section heading ---------- */
export function SectionTitle({ eyebrow, title, desc, align = 'center' }) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-right items-start'

  return (
    <Reveal className={`flex flex-col ${alignCls} gap-4 mb-14`}>
      {eyebrow && (
        <span className="chip">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-extrabold leading-[1.35] sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      <div className="mt-1 h-1 w-20 rounded-full bg-grad-primary" />
      {desc && (
        <p className={`max-w-2xl text-base leading-relaxed text-ink-muted ${align === 'center' ? 'mx-auto' : ''}`}>
          {desc}
        </p>
      )}
    </Reveal>
  )
}

/* ---------- Section shell ---------- */
export function Section({ id, children, className = '', tinted = false }) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-20 sm:py-28 ${tinted ? 'bg-section/60' : ''} ${className}`}
    >
      {children}
    </section>
  )
}

/* ---------- Count-up number ---------- */
export function CountUp({ value, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame
    const start = performance.now()

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setDisplay(Math.round(eased * value))
      if (p < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

/* ---------- Rotating role typewriter ---------- */
export function Typewriter({ words, typeSpeed = 90, deleteSpeed = 45, pause = 1800 }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let timeout

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () =>
          setText(
            deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
          ),
        deleting ? deleteSpeed : typeSpeed
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return (
    <span className="inline-flex items-center">
      <bdi className="grad-text font-bold">{text}</bdi>
      <span className="ms-1 inline-block h-[1em] w-[2px] animate-blink bg-accent align-middle" />
    </span>
  )
}

/* ---------- Ambient background orbs + grid ---------- */
export function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-page" />
      <div className="absolute inset-0 grid-bg" />
      <div
        className="orb animate-drift"
        style={{
          top: '-10%',
          insetInlineEnd: '-8%',
          width: '46vw',
          height: '46vw',
          background: 'radial-gradient(circle, rgba(16,185,129,0.18), transparent 65%)',
        }}
      />
      <div
        className="orb animate-drift"
        style={{
          top: '35%',
          insetInlineStart: '-12%',
          width: '42vw',
          height: '42vw',
          background: 'radial-gradient(circle, rgba(6,182,212,0.14), transparent 65%)',
          animationDelay: '-6s',
        }}
      />
      <div
        className="orb animate-drift"
        style={{
          bottom: '-15%',
          insetInlineEnd: '20%',
          width: '38vw',
          height: '38vw',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 65%)',
          animationDelay: '-12s',
        }}
      />
      <div className="noise absolute inset-0 opacity-[0.015] mix-blend-overlay" />
    </div>
  )
}

/* ---------- Floating particles (canvas-free, cheap) ---------- */
export function Particles({ count = 26 }) {
  const dots = useRef(
    Array.from({ length: count }, (_, i) => ({
      left: (i * 37) % 100,
      top: (i * 61) % 100,
      size: 1 + ((i * 13) % 3),
      delay: (i % 10) * 0.7,
      duration: 7 + ((i * 3) % 9),
    }))
  ).current

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-accent/40 animate-float"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
