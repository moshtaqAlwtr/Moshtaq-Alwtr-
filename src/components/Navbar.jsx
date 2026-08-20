import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Languages, Menu, Moon, Sun, X } from './icons'
import { useI18n, useTheme } from '../app/providers'
import { contact, sectionIds } from '../data/structure'

/**
 * Floating island header.
 *
 * A centred pill rather than a full-width bar: it detaches from the page, so
 * the hero reads edge to edge behind it and the nav stays a compact object
 * instead of a band cutting the design in half.
 */
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
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4"
      >
        <nav
          className={`flex items-center gap-1 rounded-2xl border p-1.5 transition-all duration-300 ${
            scrolled
              ? 'border-border bg-surface/90 shadow-lg backdrop-blur-xl'
              : 'border-border/70 bg-surface/70 backdrop-blur-xl'
          }`}
        >
          <button
            onClick={() => go('home')}
            aria-label={t.profile.name}
            data-cursor="link"
            className="brand-fill flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform hover:scale-105"
          >
            <Code2 size={16} strokeWidth={2.6} />
          </button>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {sectionIds.map((id) => (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  data-cursor="link"
                  className={`relative rounded-xl px-3 py-2 text-[14px] font-semibold transition-colors ${
                    active === id ? 'text-text' : 'text-text-3 hover:text-text'
                  }`}
                >
                  {t.nav[id]}
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-xl bg-brand/12 ring-1 ring-brand/25"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <span className="mx-1 hidden h-6 w-px bg-border lg:block" aria-hidden />

          <button
            onClick={toggleLang}
            aria-label={t.ui.switchLang}
            title={t.ui.switchLang}
            data-cursor="link"
            className="flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-xs font-bold text-text-3 transition-colors hover:bg-brand/10 hover:text-brand"
          >
            <Languages size={15} />
            {t.ui.langShort}
          </button>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? t.ui.toLight : t.ui.toDark}
            title={isDark ? t.ui.toLight : t.ui.toDark}
            data-cursor="link"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-text-3 transition-colors hover:bg-brand/10 hover:text-brand"
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
            data-cursor="link"
            className="brand-fill ms-1 hidden h-9 items-center rounded-xl px-4 text-[13px] font-bold transition-transform hover:scale-[1.04] sm:flex"
          >
            {t.nav.cta}
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t.ui.menu}
            aria-expanded={open}
            data-cursor="link"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-text-3 transition-colors hover:bg-brand/10 hover:text-brand lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

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
