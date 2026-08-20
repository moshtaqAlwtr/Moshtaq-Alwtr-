import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '../app/providers'

/**
 * Scroll-lit statement.
 *
 * Each word brightens as the section travels through the viewport, so reading
 * it and scrolling it are the same gesture. It breaks up a page that was
 * otherwise heading-then-card-grid seven times over, and unlike hover effects
 * it works identically on a phone.
 */
export default function Statement() {
  const { t } = useI18n()
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  })

  const words = t.statement.text.split(' ')

  return (
    <section ref={ref} className="relative py-24 sm:py-32">
      <div className="container-x">
        <span className="mb-8 block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {t.statement.eyebrow}
        </span>

        <p className="max-w-4xl text-[1.6rem] font-bold leading-[1.6] tracking-tight sm:text-[2.1rem] md:text-[2.5rem]">
          {words.map((word, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              reduced={reduced}
            >
              {word}
            </Word>
          ))}
        </p>

        <div className="mt-10 flex items-center gap-3">
          <span className="h-px w-12 bg-brand" />
          <span className="text-sm font-semibold text-text-3">{t.profile.name}</span>
        </div>
      </div>
    </section>
  )
}

function Word({ children, progress, range, reduced }) {
  // Each word owns a slice of the scroll range, and lights slightly before its
  // slice starts so the sentence reads ahead of the scroll rather than lagging.
  const opacity = useTransform(progress, range, [0.18, 1])

  // The space lives inside the span rather than coming from a margin, so the
  // DOM text stays a real sentence — margins are invisible to a crawler and to
  // anyone copying the line, which would leave it as one run-on word.
  if (reduced) return <span className="inline-block">{children}&nbsp;</span>

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  )
}
