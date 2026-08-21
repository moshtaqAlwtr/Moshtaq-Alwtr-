import { Code2 } from './icons'
import { useI18n } from '../app/providers'
import { contact, sectionIds } from '../data/structure'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()


  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <footer className="relative border-t border-border bg-bg-soft pt-14">
      <div className="container-x">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 text-[16.5px] font-extrabold tracking-tight">
              <span className="brand-fill flex h-9 w-9 items-center justify-center rounded-xl">
                <Code2 size={17} strokeWidth={2.6} />
              </span>
              {t.profile.firstName}{' '}
              <span className="brand-text">{t.profile.lastName}</span>
            </div>

            <p className="mt-4 max-w-sm text-[15px] leading-[1.9] text-text-3">
              {t.hero.tagline}
            </p>

            <SocialLinks className="mt-6" />
          </div>

          <nav>
            <h4 className="mb-4 text-[14.5px] font-bold">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5">
              {sectionIds.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => go(id)}
                    className="text-[15px] text-text-3 transition-colors hover:text-brand"
                  >
                    {t.nav[id]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="mb-4 text-[14.5px] font-bold">{t.footer.contactHeading}</h4>
            <ul className="space-y-3 text-[15px] text-text-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-brand"
                >
                  <bdi dir="ltr">{contact.email}</bdi>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="transition-colors hover:text-brand"
                >
                  <bdi dir="ltr">{contact.phone}</bdi>
                </a>
              </li>
              <li>{t.profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-text-4 sm:flex-row">
          <p>
            © {year} {t.profile.name} — {t.footer.rights}
          </p>
          <p className="flex items-center gap-1.5">
            {t.footer.builtWith}
            <span className="font-mono text-brand">React</span>
            <span>·</span>
            <span className="font-mono text-brand-2">TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
