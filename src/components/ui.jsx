import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ---------- Scroll reveal ---------- */
export function Reveal({ children, delay = 0, y = 24, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Section shell ---------- */
export function Section({ id, children, tinted = false, className = '' }) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-20 sm:py-28 ${tinted ? 'bg-bg-soft' : ''} ${className}`}
    >
      {children}
    </section>
  )
}

/**
 * Section heading.
 *
 * The index ("02") and a hairline rule sit beside the eyebrow rather than
 * stacking a centred chip + bar + text, which keeps the vertical rhythm tighter
 * and gives every section a consistent left/right anchor.
 */
export function SectionHeading({ index, eyebrow, title, desc, align = 'start' }) {
  const centered = align === 'center'

  return (
    <Reveal className={`mb-12 sm:mb-16 ${centered ? 'text-center' : ''}`}>
      <div
        className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
      >
        {index && (
          <span className="font-mono text-xs font-medium text-brand">{index}</span>
        )}
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-3">
          {eyebrow}
        </span>
        <span
          className={`h-px flex-1 bg-border ${centered ? 'max-w-[60px]' : 'max-w-[160px]'}`}
        />
      </div>

      <h2 className="mt-5 max-w-3xl text-[1.75rem] font-extrabold leading-[1.3] tracking-tight sm:text-4xl md:text-[2.6rem]">
        {title}
      </h2>

      {desc && (
        <p
          className={`mt-4 max-w-2xl text-[15px] leading-relaxed text-text-3 sm:text-base ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {desc}
        </p>
      )}
    </Reveal>
  )
}

/* ---------- Count-up ---------- */
export function CountUp({ value, suffix = '', duration = 1500 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame
    const start = performance.now()

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p) // easeOutExpo
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
export function Typewriter({ words, typeSpeed = 65, deleteSpeed = 32, pause = 2000 }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  // Restart cleanly when the language (and therefore the word list) changes.
  useEffect(() => {
    setIndex(0)
    setText('')
    setDeleting(false)
  }, [words])

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
      {/* <bdi> isolates the typed string so mixed Arabic/Latin phrases keep the
          caret at the visual end instead of scrambling at the bidi boundary. */}
      <bdi className="brand-text font-bold">{text}</bdi>
      <span className="ms-1 inline-block h-[1.05em] w-[2px] animate-blink bg-brand align-middle" />
    </span>
  )
}

/* ---------- Segmented proficiency meter ---------- */

// Written out in full because Tailwind cannot see interpolated class names.
const TONE_BG = {
  brand: 'bg-brand',
  'brand-2': 'bg-brand-2',
  'brand-3': 'bg-brand-3',
}

export function LevelMeter({ level, max = 5, tone = 'brand' }) {
  return (
    <span className="flex items-center gap-1" aria-label={`${level}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i < level ? `w-4 ${TONE_BG[tone] ?? TONE_BG.brand}` : 'w-2 bg-border-strong'
          }`}
        />
      ))}
    </span>
  )
}

/* ---------- Ambient background ---------- */
export function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-bg transition-colors duration-500" />
      <div className="absolute inset-0 grid-bg" />
      <div
        className="orb animate-drift opacity-70 dark:opacity-100"
        style={{
          top: '-12%',
          insetInlineEnd: '-8%',
          width: '46vw',
          height: '46vw',
          background: 'radial-gradient(circle, rgb(var(--brand) / 0.18), transparent 65%)',
        }}
      />
      <div
        className="orb animate-drift opacity-70 dark:opacity-100"
        style={{
          top: '38%',
          insetInlineStart: '-12%',
          width: '42vw',
          height: '42vw',
          background: 'radial-gradient(circle, rgb(var(--brand-2) / 0.16), transparent 65%)',
          animationDelay: '-7s',
        }}
      />
      <div
        className="orb animate-drift opacity-70 dark:opacity-100"
        style={{
          bottom: '-14%',
          insetInlineEnd: '18%',
          width: '38vw',
          height: '38vw',
          background: 'radial-gradient(circle, rgb(var(--brand-3) / 0.1), transparent 65%)',
          animationDelay: '-14s',
        }}
      />
    </div>
  )
}

/* ---------- Sparse floating particles (hero only) ---------- */
export function Particles({ count = 22 }) {
  // Deterministic positions keep server/client and re-renders identical.
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
          className="absolute animate-float rounded-full bg-brand/40"
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
