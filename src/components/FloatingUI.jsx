import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { profile } from '../data/content'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'right' }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-grad-primary"
    />
  )
}

export function FloatingActions() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-6 z-40 flex flex-col gap-3" style={{ insetInlineEnd: '1.25rem' }}>
      <a
        href={`https://wa.me/${profile.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل عبر واتساب"
        className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-xl shadow-[#25D366]/25 transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-2xl bg-[#25D366] opacity-20" />
        <MessageCircle size={26} className="relative" />
      </a>

      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="العودة للأعلى"
            className="glass glass-hover flex h-14 w-14 items-center justify-center rounded-2xl text-ink-soft hover:text-accent"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
