import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FolderOpen,
  House,
  Languages,
  LayoutGrid,
  Layers,
  Mail,
  Menu,
  Moon,
  Route,
  Sun,
  UserRound,
  X,
} from './icons'
import { useI18n, useTheme } from '../app/providers'
import { sectionIds } from '../data/structure'
import CvDownload from './CvDownload'

/**
 * Floating icon pill, built to the reference site's measurements: 36px items,
 * 4px gap, 8px/12px padding, 16px radius, 1x24 divider before the controls.
 *
 * The reference carries three destinations and can leave its icons unlabelled.
 * This site has seven, which is past the point where an icon alone is
 * guessable — so each one names itself in a tooltip on hover and focus.
 */
const NAV_ICONS = {
  home: House,
  about: UserRound,
  skills: Layers,
  projects: FolderOpen,
  services: LayoutGrid,
  process: Route,
  contact: Mail,
}

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
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          className={`flex items-center gap-1 rounded-2xl border px-3 py-2 transition-all duration-300 ${
            scrolled
              ? 'border-border bg-surface/90 shadow-xl backdrop-blur-xl'
              : 'border-border/70 bg-surface/75 backdrop-blur-xl'
          }`}
        >
          {sectionIds.map((id) => (
            <PillButton
              key={id}
              icon={NAV_ICONS[id]}
              label={t.nav[id]}
              active={active === id}
              onClick={() => go(id)}
              className="hidden sm:flex"
              layoutIdWhenActive="nav-active"
            />
          ))}

          {/* mobile keeps only home, so the pill stays a pill on a phone */}
          <PillButton
            icon={House}
            label={t.nav.home}
            active={active === 'home'}
            onClick={() => go('home')}
            className="sm:hidden"
          />

          <span className="mx-1 h-6 w-px shrink-0 bg-border" aria-hidden />

          <PillButton
            icon={isDark ? Moon : Sun}
            label={isDark ? t.ui.toLight : t.ui.toDark}
            onClick={toggleTheme}
            animateIconKey={isDark ? 'moon' : 'sun'}
          />

          <PillButton
            label={t.ui.switchLang}
            onClick={toggleLang}
            text={t.ui.langShort}
            icon={Languages}
            compactText
          />

          <CvDownload variant="icon" />

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t.ui.menu}
            aria-expanded={open}
            data-cursor="link"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-text-3 transition-colors hover:bg-brand/10 hover:text-brand sm:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/97 backdrop-blur-xl sm:hidden"
          >
            <ul className="container-x flex h-full flex-col justify-center gap-1">
              {sectionIds.map((id, i) => {
                const Icon = NAV_ICONS[id]
                return (
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
                      <Icon size={20} className="shrink-0 opacity-70" />
                      {t.nav[id]}
                    </button>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * One 36x36 cell of the pill, with a tooltip that names it.
 */
function PillButton({
  icon: Icon,
  label,
  text,
  active,
  onClick,
  className = '',
  animateIconKey,
  compactText,
  layoutIdWhenActive,
}) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className={`relative shrink-0 ${className}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <button
        onClick={onClick}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        aria-label={label}
        data-cursor="link"
        className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
          active ? 'text-brand' : 'text-text-3 hover:text-brand'
        }`}
      >
        {active && layoutIdWhenActive && (
          <motion.span
            layoutId={layoutIdWhenActive}
            className="absolute inset-0 rounded-xl bg-brand/12 ring-1 ring-brand/25"
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        )}

        <span className="relative flex items-center gap-1">
          {animateIconKey ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={animateIconKey}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.22 }}
                className="flex"
              >
                <Icon size={17} />
              </motion.span>
            </AnimatePresence>
          ) : compactText ? (
            <span className="text-[11px] font-extrabold leading-none">{text}</span>
          ) : (
            <Icon size={17} />
          )}
        </span>
      </button>

      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: -4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            role="tooltip"
            className="pointer-events-none absolute left-1/2 top-[calc(100%+10px)] z-50 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-surface px-2.5 py-1 text-[12px] font-semibold text-text shadow-lg"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
