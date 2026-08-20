import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import { navLinks, profile } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently filling the viewport
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll while the mobile sheet is open
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
            ? 'border-b border-white/[0.06] bg-section/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="container-x flex h-[72px] items-center justify-between gap-4">
          <button
            onClick={() => go('home')}
            className="group flex items-center gap-2.5 font-display text-lg font-extrabold"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-grad-primary text-page shadow-lg shadow-accent/25 transition-transform group-hover:scale-110">
              <Code2 size={18} strokeWidth={2.6} />
            </span>
            <span className="hidden sm:inline">
              مشتاق <span className="grad-text">الوتر</span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    active === link.id
                      ? 'text-ink'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-accent/10 ring-1 ring-accent/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${profile.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-xl bg-grad-primary px-5 py-2.5 text-sm font-bold text-page shadow-lg shadow-accent/20 transition-transform hover:scale-105 sm:inline-block"
            >
              لنتحدّث
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="القائمة"
              className="glass flex h-10 w-10 items-center justify-center rounded-xl lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
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
            className="fixed inset-0 z-40 bg-page/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-x flex h-full flex-col justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className={`w-full rounded-2xl px-5 py-4 text-right font-display text-2xl font-bold transition-colors ${
                      active === link.id ? 'bg-accent/10 text-accent' : 'text-ink-soft'
                    }`}
                  >
                    <span className="me-3 font-mono text-sm text-ink-dim">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
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
