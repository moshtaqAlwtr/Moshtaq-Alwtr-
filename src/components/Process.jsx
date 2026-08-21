import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useI18n } from '../app/providers'
import { processMeta } from '../data/structure'
import { Reveal, Section, SectionHeading } from './ui'

/**
 * Alternating timeline.
 *
 * The rail runs down the centre and steps sit either side of it, so the eye
 * zigzags instead of scanning one straight column — the same shape the
 * reference site uses for its experience list, and it reads far less like a
 * stack of identical cards.
 *
 * The rail fills from scroll progress and each node lights as it reaches the
 * middle of the viewport, so the section reports how far along you are.
 */
export default function Process() {
  const { t } = useI18n()
  const railRef = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 78%', 'end 62%'],
  })
  const fill = useSpring(scrollYProgress, {
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

        <div ref={railRef} className="relative mx-auto max-w-5xl">
          {/* rail: centred on desktop, hugging the start edge on mobile */}
          <div
            className="absolute inset-y-0 start-[19px] w-px bg-border md:start-1/2 md:-translate-x-1/2"
            aria-hidden
          />
          <motion.div
            className="absolute inset-y-0 start-[19px] w-px origin-top md:start-1/2 md:-translate-x-1/2"
            style={{
              scaleY: reduced ? 1 : fill,
              background: 'linear-gradient(180deg, rgb(var(--brand)), rgb(var(--brand-2)))',
              boxShadow: '0 0 14px rgb(var(--brand) / 0.6)',
            }}
            aria-hidden
          />

          <ol className="space-y-6 md:space-y-2">
            {processMeta.map((stepId, i) => (
              <Step
                key={stepId}
                index={i}
                copy={t.process.steps[stepId]}
                side={i % 2 === 0 ? 'start' : 'end'}
              />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

function Step({ index, copy, side }) {
  const ref = useRef(null)
  // once:false so the node dims again on the way back up, keeping the lit
  // portion in step with the rail rather than staying permanently on
  const reached = useInView(ref, { once: false, margin: '-50% 0px -50% 0px' })

  const onStart = side === 'start'

  return (
    <li ref={ref} className="relative md:grid md:grid-cols-2 md:items-center md:gap-10">
      {/* Node sits on the rail: at the start edge on mobile, on the centre
          line from md up. Same start/translate pair as the rail, so the two
          stay aligned in both writing directions. */}
      <motion.span
        className="absolute top-6 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full start-[19px] md:start-1/2 md:top-1/2 md:-translate-y-1/2"
        animate={{
          backgroundColor: reached ? 'rgb(var(--brand))' : 'rgb(var(--border-strong))',
          boxShadow: reached
            ? '0 0 0 5px rgb(var(--brand) / 0.18)'
            : '0 0 0 0px rgb(var(--brand) / 0)',
          scale: reached ? 1.25 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        aria-hidden
      />

      <Reveal
        delay={0.04}
        className={
          onStart
            ? 'ps-12 md:col-start-1 md:pe-2 md:ps-0 md:text-end'
            : 'ps-12 md:col-start-2 md:ps-2'
        }
      >
        <div className="card card-hover edge-glow rounded-2xl p-5 sm:p-6">
          <div
            className={`mb-2 flex items-center gap-3 ${onStart ? 'md:flex-row-reverse' : ''}`}
          >
            <motion.span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[13px] font-bold"
              animate={{
                backgroundColor: reached ? 'rgb(var(--brand) / 0.14)' : 'rgb(var(--surface-2))',
                color: reached ? 'rgb(var(--brand))' : 'rgb(var(--text-4))',
              }}
              transition={{ duration: 0.3 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>
            <h3 className="text-base font-bold tracking-tight">{copy.title}</h3>
          </div>
          <p className="text-[15px] leading-[1.85] text-text-3">{copy.desc}</p>
        </div>
      </Reveal>
    </li>
  )
}
