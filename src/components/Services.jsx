import { getIcon } from './icons'
import { useI18n } from '../app/providers'
import { servicesMeta } from '../data/structure'
import { Reveal, Section, SectionHeading } from './ui'
import { Tilt } from './motion/primitives'

export default function Services() {
  const { t } = useI18n()

  return (
    <Section id="services" tinted>
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          desc={t.services.desc}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicesMeta.map((service, i) => {
            const Icon = getIcon(service.icon)
            const copy = t.services.items[service.id]

            return (
              <Reveal key={service.id} delay={0.05 * i}>
                <Tilt className="card card-hover edge-glow group relative h-full overflow-hidden rounded-2xl p-6 sm:p-7" max={6}>
                  <span className="pointer-events-none absolute end-6 top-6 font-mono text-lg font-bold text-text-4/50 transition-colors duration-300 group-hover:text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-all duration-300 group-hover:bg-brand group-hover:text-brand-contrast">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold tracking-tight">{copy.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-text-3">
                      {copy.desc}
                    </p>
                  </div>
                </Tilt>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
