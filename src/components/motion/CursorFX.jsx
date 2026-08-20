import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * Custom pointer.
 *
 * A precise dot plus a ring that lags behind it. Elements carrying
 * `data-cursor` grow the ring, and `data-cursor-label` turns it into a
 * labelled disc — so hovering a project card literally says what a click does.
 *
 * Only mounts for fine pointers (a mouse or trackpad) and never under
 * prefers-reduced-motion, so touch and motion-sensitive visitors keep the
 * native cursor untouched.
 */
export default function CursorFX() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [state, setState] = useState('default') // default | link | label
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // the dot tracks exactly so aiming stays accurate; only the ring lags
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 })

  const rafRef = useRef(0)

  useEffect(() => {
    if (reduced) return
    const fine = window.matchMedia('(pointer: fine)')
    const apply = () => setEnabled(fine.matches)
    apply()
    fine.addEventListener('change', apply)
    return () => fine.removeEventListener('change', apply)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return

    // hide the native cursor only once we know we're taking over
    document.documentElement.classList.add('has-custom-cursor')

    let pending = null

    const onMove = (e) => {
      pending = e
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        if (!pending) return
        x.set(pending.clientX)
        y.set(pending.clientY)
        setVisible(true)
      })
    }

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (!target) {
        setState('default')
        setLabel('')
        return
      }
      const text = target.getAttribute('data-cursor-label')
      if (text) {
        setLabel(text)
        setState('label')
      } else {
        setLabel('')
        setState('link')
      }
    }

    const onLeaveWindow = () => setVisible(false)
    const onEnterWindow = () => setVisible(true)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeaveWindow)
    document.addEventListener('pointerenter', onEnterWindow)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeaveWindow)
      document.removeEventListener('pointerenter', onEnterWindow)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const ringSize = state === 'label' ? 74 : state === 'link' ? 46 : 28

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-brand"
        style={{
          x,
          y,
          width: 6,
          height: 6,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible && state !== 'label' ? 1 : 0,
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          backgroundColor:
            state === 'label' ? 'rgb(var(--brand))' : 'rgb(var(--brand) / 0)',
          borderColor:
            state === 'label' ? 'rgb(var(--brand) / 0)' : 'rgb(var(--brand) / 0.55)',
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 26 }}
        initial={false}
      >
        <span
          className="rounded-full border"
          style={{ position: 'absolute', inset: 0, borderColor: 'inherit' }}
        />
        {state === 'label' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-1 text-center text-[11px] font-bold leading-tight text-brand-contrast"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
