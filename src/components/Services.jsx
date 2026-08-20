import { getIcon } from './icons'
import { services } from '../data/content'
import { Reveal, Section, SectionTitle } from './ui'

export default function Services() {
  return (
    <Section id="services" tinted>
      <div className="container-x">
        <SectionTitle
          eyebrow="خدماتي"
          title="ماذا أقدّم لك"
          desc="مجموعة شاملة من خدمات التطوير — من الفكرة الأولى حتى الإطلاق والدعم المستمر."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <Reveal key={service.title} delay={0.06 * i}>
                <div className="glass glass-hover ring-glow group relative h-full overflow-hidden rounded-2xl p-7">
                  <span className="pointer-events-none absolute -top-10 -end-6 font-display text-7xl font-black text-white/[0.03] transition-colors group-hover:text-accent/[0.07]">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-all duration-300 group-hover:bg-accent group-hover:text-page">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-lg font-bold">{service.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
