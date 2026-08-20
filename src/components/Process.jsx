import { useI18n } from '../app/providers'
import { processMeta } from '../data/structure'
import { Reveal, Section, SectionHeading } from './ui'

export default function Process() {
  const { t } = useI18n()

  return (
    <Section id="process">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          desc={t.process.desc}
        />

        <div className="relative">
          {/* Rail sits behind the step numbers; the numbers carry a solid
              background so the line appears to pass through them. */}
          <div
            className="absolute inset-y-0 hidden w-px sm:block"
            style={{
              insetInlineStart: '23px',
              background:
                'linear-gradient(180deg, transparent, rgb(var(--border-strong)) 6%, rgb(var(--border-strong)) 94%, transparent)',
            }}
            aria-hidden
          />

          <ol className="space-y-3">
            {processMeta.map((stepId, i) => {
              const copy = t.process.steps[stepId]

              return (
                <Reveal key={stepId} delay={0.04 * i}>
                  <li className="group relative flex gap-5">
                    <span
                      className="relative z-10 hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-bg font-mono text-[14.5px] font-bold text-text-3 transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand/10 group-hover:text-brand sm:flex"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="card card-hover edge-glow flex-1 rounded-2xl p-5 sm:p-6">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="font-mono text-[14.5px] font-bold text-brand sm:hidden">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-base font-bold tracking-tight">{copy.title}</h3>
                      </div>
                      <p className="text-[15px] leading-[1.85] text-text-3">{copy.desc}</p>
                    </div>
                  </li>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </Section>
  )
}
