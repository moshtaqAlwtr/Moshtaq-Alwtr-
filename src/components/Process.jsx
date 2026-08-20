import { process } from '../data/content'
import { Reveal, Section, SectionTitle } from './ui'

export default function Process() {
  return (
    <Section id="process">
      <div className="container-x">
        <SectionTitle
          eyebrow="آلية العمل"
          title="٧ خطوات من الفكرة إلى الإطلاق"
          desc="مسار واضح تعرف فيه أين وصل مشروعك في كل لحظة — بلا مفاجآت."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* vertical rail */}
          <div
            className="absolute bottom-0 top-0 hidden w-px sm:block"
            style={{
              insetInlineStart: '27px',
              background:
                'linear-gradient(180deg, transparent, rgba(16,185,129,0.35) 8%, rgba(16,185,129,0.35) 92%, transparent)',
            }}
          />

          <div className="space-y-4">
            {process.map((item, i) => (
              <Reveal key={item.step} delay={0.05 * i}>
                <div className="group relative flex gap-5">
                  {/* node */}
                  <div className="relative z-10 hidden shrink-0 sm:block">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-section font-mono text-sm font-bold text-ink-muted transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent">
                      {item.step}
                    </span>
                  </div>

                  <div className="glass glass-hover ring-glow flex-1 rounded-2xl p-6">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-accent sm:hidden">
                        {item.step}
                      </span>
                      <h3 className="font-display text-lg font-bold">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-loose text-ink-muted">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
