import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp, MessageCircle } from './icons'
import { useI18n } from '../app/providers'
import { contact, sectionIds } from '../data/structure'

export function ScrollProgress() {
  const { isRTL } = useI18n()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: isRTL ? 'right' : 'left' }}
      className="brand-fill fixed inset-x-0 top-0 z-[70] h-[3px]"
      aria-hidden
    />
  )
}

/**
 * Vertical section rail (desktop only).
 *
 * Gives the page a persistent sense of place that a top bar alone doesn't —
 * you can see how far through the site you are and jump without scrolling up.
 */
export function SectionRail() {
  const { t } = useI18n()
  const [active, setActive] = useState('home')

  useEffect(() => {
    const nodes = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.5, 1] }
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label={t.ui.menu}
      className="fixed top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
      style={{ insetInlineStart: '1.75rem' }}
    >
      {sectionIds.map((id) => (
        <button
          key={id}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          className="group flex items-center gap-2.5"
          aria-label={t.nav[id]}
          aria-current={active === id ? 'true' : undefined}
        >
          <span
            className={`h-px transition-all duration-300 ${
              active === id
                ? 'w-7 bg-brand'
                : 'w-3.5 bg-border-strong group-hover:w-5 group-hover:bg-text-3'
            }`}
          />
          <span
            className={`text-[12.5px] font-semibold transition-all duration-300 ${
              active === id
                ? 'text-brand opacity-100'
                : 'text-text-4 opacity-0 group-hover:opacity-100'
            }`}
          >
            {t.nav[id]}
          </span>
        </button>
      ))}
    </nav>
  )
}

export function FloatingActions() {
  const { t } = useI18n()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed bottom-6 z-40 flex flex-col gap-2.5"
      style={{ insetInlineEnd: '1.25rem' }}
    >
      <a
        href={`https://wa.me/${contact.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="group relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-2xl bg-[#25D366] opacity-20" />
        <MessageCircle size={22} className="relative" />
      </a>

      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t.ui.backToTop}
            className="icon-btn h-12 w-12 bg-surface"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
