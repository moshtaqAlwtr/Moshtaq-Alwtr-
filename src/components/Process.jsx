import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useI18n } from '../app/providers'
import { processMeta } from '../data/structure'
import { Reveal, Section, SectionHeading } from './ui'

export default function Process() {
  const { t } = useI18n()
  const listRef = useRef(null)
  const reduced = useReducedMotion()

  // The rail draws itself as the section scrolls past, so the seven steps read
  // as a route being travelled rather than a static list.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 60%'],
  })
  const railScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <Section id="process">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          desc={t.process.desc}
        />

        <div className="relative" ref={listRef}>
          {/* unfilled track */}
          <div
            className="absolute inset-y-0 hidden w-px bg-border sm:block"
            style={{ insetInlineStart: '23px' }}
            aria-hidden
          />
          {/* the portion already travelled */}
          <motion.div
            className="absolute inset-y-0 hidden w-px origin-top sm:block"
            style={{
              insetInlineStart: '23px',
              scaleY: reduced ? 1 : railScale,
              background:
                'linear-gradient(180deg, rgb(var(--brand)), rgb(var(--brand-2)))',
              boxShadow: '0 0 12px rgb(var(--brand) / 0.5)',
            }}
            aria-hidden
          />

          <ol className="space-y-3">
            {processMeta.map((stepId, i) => (
              <Step key={stepId} index={i} copy={t.process.steps[stepId]} />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

function Step({ index, copy }) {
  const ref = useRef(null)
  // -45% keeps the marker from lighting until the step reaches mid-viewport,
  // so the highlight tracks the rail rather than running ahead of it.
  const reached = useInView(ref, { once: false, margin: '-45% 0px -45% 0px' })

  return (
    <Reveal delay={0.04 * index}>
      <li ref={ref} className="group relative flex gap-5">
        <motion.span
          className="relative z-10 hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-bg font-mono text-[13px] font-bold sm:flex"
          animate={{
            borderColor: reached ? 'rgb(var(--brand) / 0.5)' : 'rgb(var(--border))',
            color: reached ? 'rgb(var(--brand))' : 'rgb(var(--text-3))',
            backgroundColor: reached ? 'rgb(var(--brand) / 0.1)' : 'rgb(var(--bg))',
            scale: reached ? 1.06 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          aria-hidden
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        <div className="card card-hover edge-glow flex-1 rounded-2xl p-5 sm:p-6">
          <div className="mb-2 flex items-center gap-3">
            <span className="font-mono text-[13px] font-bold text-brand sm:hidden">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-base font-bold tracking-tight">{copy.title}</h3>
          </div>
          <p className="text-[15px] leading-[1.85] text-text-3">{copy.desc}</p>
        </div>
      </li>
    </Reveal>
  )
}
