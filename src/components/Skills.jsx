import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getIcon } from './icons'
import { skillGroups } from '../data/content'
import { Reveal, Section, SectionTitle } from './ui'

export default function Skills() {
  return (
    <Section id="skills" tinted>
      <div className="container-x">
        <SectionTitle
          eyebrow="المهارات التقنية"
          title="التقنيات التي أعمل بها"
          desc="مجموعة أدوات اخترتها لأنها تنجز العمل — من الواجهة حتى قاعدة البيانات والسيرفر."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, gi) => {
            const Icon = getIcon(group.icon)
            return (
              <Reveal key={group.title} delay={0.08 * gi}>
                <div className="glass glass-hover ring-glow h-full rounded-3xl p-6 sm:p-7">
                  <div className="mb-7 flex items-center gap-3.5">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        background: `${group.color}1a`,
                        color: group.color,
                        boxShadow: `inset 0 0 0 1px ${group.color}33`,
                      }}
                    >
                      <Icon size={21} />
                    </span>
                    <h3 className="font-display text-lg font-bold">{group.title}</h3>
                  </div>

                  <div className="space-y-5">
                    {group.skills.map((skill, si) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        color={group.color}
                        delay={si * 0.09}
                      />
                    ))}
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

function SkillBar({ skill, color, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink-soft" dir="auto">
          {skill.name}
        </span>
        <span className="font-mono text-xs text-ink-dim">{skill.level}%</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(270deg, ${color}, ${color}99)`,
            boxShadow: `0 0 12px ${color}66`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
