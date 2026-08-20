import { Quote } from 'lucide-react'
import { getIcon } from './icons'
import { profile, whyMe } from '../data/content'
import { Reveal, Section, SectionTitle } from './ui'

export default function About() {
  return (
    <Section id="about">
      <div className="container-x">
        <SectionTitle
          eyebrow="نبذة عني"
          title="لست مجرد مطوّر — أنا شريكك التقني"
          desc="أفهم عملك أولاً، ثم أبني النظام الذي يخدمه فعلاً."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* ----- Bio ----- */}
          <Reveal>
            <div className="glass ring-glow relative rounded-3xl p-7 sm:p-9">
              <Quote
                size={40}
                className="mb-5 text-accent/25"
                strokeWidth={1.5}
              />

              <div className="space-y-5">
                {profile.bio.map((p, i) => (
                  <p key={i} className="text-[15px] leading-loose text-ink-soft sm:text-base">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 grid gap-3 border-t border-white/[0.06] pt-7 sm:grid-cols-2">
                <InfoRow icon="User" label="الاسم" value={profile.name} />
                <InfoRow icon="Briefcase" label="التخصص" value="Full Stack" />
                <InfoRow icon="MapPin" label="الموقع" value="الرياض، السعودية" />
                <InfoRow icon="CircleCheck" label="الحالة" value={profile.status} highlight />
              </div>
            </div>
          </Reveal>

          {/* ----- Why me ----- */}
          <div className="grid gap-4 sm:grid-cols-2">
            {whyMe.map((item, i) => {
              const Icon = getIcon(item.icon)
              return (
                <Reveal key={item.title} delay={0.08 * i}>
                  <div className="glass glass-hover ring-glow group h-full rounded-2xl p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-transform group-hover:scale-110">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-lg font-bold">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                      {item.desc}
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

function InfoRow({ icon, label, value, highlight }) {
  const Icon = getIcon(icon)
  return (
    <div className="flex items-center gap-3">
      <Icon size={16} className="shrink-0 text-accent" />
      <span className="text-xs text-ink-dim">{label}:</span>
      <span className={`text-sm font-semibold ${highlight ? 'text-accent' : 'text-ink-soft'}`}>
        {value}
      </span>
    </div>
  )
}
