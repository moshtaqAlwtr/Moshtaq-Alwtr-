import { getIcon } from './icons'
import { useI18n } from '../app/providers'
import { skillGroupsMeta } from '../data/structure'
import { LevelMeter, Reveal, Section, SectionHeading } from './ui'

// Tailwind needs the full class strings, so the tone map is spelled out.
const TONE = {
  brand: { text: 'text-brand', bg: 'bg-brand/10', ring: 'ring-brand/20' },
  'brand-2': { text: 'text-brand-2', bg: 'bg-brand-2/10', ring: 'ring-brand-2/20' },
  'brand-3': { text: 'text-brand-3', bg: 'bg-brand-3/10', ring: 'ring-brand-3/20' },
}

export default function Skills() {
  const { t } = useI18n()

  return (
    <Section id="skills" tinted>
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          desc={t.skills.desc}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {skillGroupsMeta.map((group, gi) => {
            const Icon = getIcon(group.icon)
            const tone = TONE[group.tone] ?? TONE.brand

            return (
              <Reveal key={group.id} delay={0.07 * gi}>
                <div className="card card-hover edge-glow h-full rounded-2xl p-6 sm:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${tone.bg} ${tone.text} ${tone.ring}`}
                    >
                      <Icon size={19} />
                    </span>
                    <h3 className="text-base font-bold tracking-tight">
                      {t.skills.groups[group.id]}
                    </h3>
                  </div>

                  <ul className="space-y-3.5">
                    {group.skills.map((skill, si) => (
                      <li
                        key={skill.name}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="text-sm font-medium text-text-2" dir="ltr">
                          {skill.name}
                        </span>
                        <LevelMeter
                          level={skill.level}
                          tone={group.tone}
                          delay={si * 0.09}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
