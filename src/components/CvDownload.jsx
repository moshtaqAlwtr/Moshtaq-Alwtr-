import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download } from './icons'
import { useI18n } from '../app/providers'
import { resumes } from '../data/structure'

/**
 * CV download with a language choice.
 *
 * The CV exists in Arabic and English, and the visitor's site language is not
 * a reliable signal for which one they want — an Arabic speaker applying to an
 * international company needs the English copy. So both are offered, with the
 * current language listed first and file sizes shown, because one of them is
 * 5.7MB and nobody on mobile data should start that blind.
 */
/**
 * Arabic marks duality in the noun, so "صفحتان" already carries the two and a
 * leading digit would read as "2 two-pages". Only three or more take a number.
 */
function pageCount(n, t) {
  if (n === 1) return t.cv.onePage
  if (n === 2) return t.cv.twoPages
  return `${n} ${t.cv.manyPages}`
}

export default function CvDownload({ variant = 'button', className = '' }) {
  const { t, lang } = useI18n()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  // Current language first — the likelier pick, without hiding the other.
  const ordered = [...resumes].sort((a, b) => (a.lang === lang ? -1 : b.lang === lang ? 1 : 0))

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isIcon = variant === 'icon'

  return (
    <div ref={wrapRef} className={`relative ${isIcon ? '' : 'inline-block'} ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.cv.action}
        title={t.cv.action}
        data-cursor="link"
        className={
          isIcon
            ? 'flex h-9 w-9 items-center justify-center rounded-xl text-text-3 transition-colors hover:bg-brand/10 hover:text-brand'
            : 'btn-ghost'
        }
      >
        <Download size={isIcon ? 16 : 17} className={isIcon ? '' : 'text-brand'} />
        {!isIcon && t.cv.action}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-2xl"
            style={{ insetInlineStart: 0 }}
          >
            <p className="px-3 py-2 text-[12.5px] font-semibold text-text-4">
              {t.cv.choose}
            </p>

            {ordered.map((cv) => (
              <a
                key={cv.lang}
                role="menuitem"
                href={`${import.meta.env.BASE_URL}${cv.file}`}
                download={`Moshtaq-Alwtr-CV-${cv.lang.toUpperCase()}.pdf`}
                onClick={() => setOpen(false)}
                data-cursor="link"
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start transition-colors hover:bg-brand/10"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-text">
                    {cv.lang === 'ar' ? t.cv.arabic : t.cv.english}
                  </span>
                  <span className="block text-[12.5px] text-text-4">
                    PDF · {cv.sizeMB}MB · {pageCount(cv.pages, t)}
                  </span>
                </span>
                <Download size={15} className="shrink-0 text-brand" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
