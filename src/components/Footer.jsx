import { Code2, Github, Mail, MessageCircle, Phone } from 'lucide-react'
import { navLinks, profile } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  const socials = [
    { icon: MessageCircle, href: `https://wa.me/${profile.whatsapp}`, label: 'واتساب' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'البريد' },
    { icon: Phone, href: `tel:${profile.phone}`, label: 'الهاتف' },
    { icon: Github, href: profile.github, label: 'GitHub' },
  ]

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <footer className="relative border-t border-white/[0.06] bg-page pt-14">
      <div className="container-x">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2.5 font-display text-lg font-extrabold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-grad-primary text-page">
                <Code2 size={18} strokeWidth={2.6} />
              </span>
              مشتاق <span className="grad-text">الوتر</span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-loose text-ink-muted">
              {profile.tagline}
            </p>

            <div className="mt-6 flex gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-xl text-ink-muted hover:text-accent"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* nav */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold text-ink">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold text-ink">للتواصل</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="transition-colors hover:text-accent"
                  dir="ltr"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone}`}
                  className="transition-colors hover:text-accent"
                  dir="ltr"
                >
                  {profile.phone}
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] py-6 text-xs text-ink-dim sm:flex-row">
          <p>© {year} مشتاق الوتر — جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1.5">
            بُني بـ
            <span className="font-mono text-accent">React</span>
            <span className="text-ink-dim">·</span>
            <span className="font-mono text-accent-2">TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
