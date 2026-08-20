import { Quote } from './icons'
import { getIcon } from './icons'
import { useI18n } from '../app/providers'
import { whyMeMeta } from '../data/structure'
import { Reveal, Section, SectionHeading } from './ui'

export default function About() {
  const { t } = useI18n()

  const info = [
    { icon: 'User', label: t.about.info.name, value: t.profile.name },
    { icon: 'Briefcase', label: t.about.info.role, value: t.about.info.roleValue },
    { icon: 'MapPin', label: t.about.info.location, value: t.profile.location },
    {
      icon: 'CircleCheck',
      label: t.about.info.status,
      value: t.profile.status,
      highlight: true,
    },
  ]

  return (
    <Section id="about">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          desc={t.about.desc}
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          {/* ------------------------------------------------------ bio card */}
          <Reveal>
            <div className="card edge-glow h-full rounded-3xl p-7 sm:p-9">
              <Quote size={34} className="mb-5 text-brand/30" strokeWidth={1.5} />

              <div className="space-y-5">
                {t.about.bio.map((paragraph, i) => (
                  <p key={i} className="text-[15px] leading-[1.95] text-text-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              <dl className="mt-8 grid gap-3.5 border-t border-border pt-7 sm:grid-cols-2">
                {info.map((row) => {
                  const Icon = getIcon(row.icon)
                  return (
                    <div key={row.label} className="flex items-center gap-2.5">
                      <Icon size={15} className="shrink-0 text-brand" />
                      <dt className="text-xs text-text-4">{row.label}</dt>
                      <dd
                        className={`truncate text-sm font-semibold ${
                          row.highlight ? 'text-brand' : 'text-text-2'
                        }`}
                      >
                        {row.value}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </div>
          </Reveal>

          {/* ------------------------------------------------------- why me */}
          <div className="grid gap-4 sm:grid-cols-2">
            {whyMeMeta.map((item, i) => {
              const Icon = getIcon(item.icon)
              const copy = t.about.whyMe[item.id]

              return (
                <Reveal key={item.id} delay={0.07 * i}>
                  <div className="card card-hover edge-glow group h-full rounded-2xl p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold tracking-tight">{copy.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-3">
                      {copy.desc}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
