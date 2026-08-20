import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Languages, Menu, Moon, Sun, X } from './icons'
import { useI18n, useTheme } from '../app/providers'
import { contact, sectionIds } from '../data/structure'

export default function Navbar() {
  const { t, toggleLang } = useI18n()
  const { isDark, toggleTheme } = useTheme()

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight whichever section currently owns the middle of the viewport.
  useEffect(() => {
    const nodes = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-border bg-bg/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="container-x flex h-[68px] items-center justify-between gap-4">
          <button
            onClick={() => go('home')}
            className="group flex items-center gap-2.5 text-[16.5px] font-extrabold tracking-tight"
          >
            <span className="brand-fill flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
              <Code2 size={17} strokeWidth={2.6} />
            </span>
            <span className="hidden sm:inline">
              {t.profile.firstName} <span className="brand-text">{t.profile.lastName}</span>
            </span>
          </button>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {sectionIds.map((id) => (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  className={`relative rounded-lg px-3.5 py-2 text-[14.5px] font-semibold transition-colors ${
                    active === id ? 'text-text' : 'text-text-3 hover:text-text'
                  }`}
                >
                  {t.nav[id]}
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-brand/10 ring-1 ring-brand/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              aria-label={t.ui.switchLang}
              title={t.ui.switchLang}
              className="icon-btn h-9 gap-1.5 px-2.5 text-xs font-bold" data-cursor="link"
            >
              <Languages size={15} />
              {t.ui.langShort}
            </button>

            <button
              onClick={toggleTheme}
              aria-label={isDark ? t.ui.toLight : t.ui.toDark}
              title={isDark ? t.ui.toLight : t.ui.toDark}
              className="icon-btn h-9 w-9" data-cursor="link"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.22 }}
                  className="flex"
                >
                  {isDark ? <Moon size={16} /> : <Sun size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary hidden !px-5 !py-2.5 !text-[14.5px] sm:inline-flex"
            >
              {t.nav.cta}
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={t.ui.menu}
              aria-expanded={open}
              className="icon-btn h-9 w-9 lg:hidden" data-cursor="link"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/97 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-x flex h-full flex-col justify-center gap-1">
              {sectionIds.map((id, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <button
                    onClick={() => go(id)}
                    className={`flex w-full items-center gap-4 rounded-2xl px-5 py-3.5 text-start text-2xl font-extrabold tracking-tight transition-colors ${
                      active === id ? 'bg-brand/10 text-brand' : 'text-text-2'
                    }`}
                  >
                    <span className="font-mono text-xs font-medium text-text-4">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {t.nav[id]}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
