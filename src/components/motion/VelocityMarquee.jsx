import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/**
 * Marquee whose speed and direction follow scroll velocity.
 *
 * Scrolling down drags the strip along; scrolling up reverses it. A constant
 * CSS marquee is decoration — this one responds, so the page feels connected
 * to the visitor's input.
 */
export default function VelocityMarquee({ items, baseVelocity = 2.4, className = '' }) {
  const reduced = useReducedMotion()
  const baseX = useMotionValue(0)
  const directionRef = useRef(1)

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 900], [0, 4], { clamp: false })

  // the track holds two copies, so wrapping at -50% is seamless
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let moveBy = directionRef.current * baseVelocity * (delta / 1000)

    const factor = velocityFactor.get()
    if (factor < 0) directionRef.current = -1
    else if (factor > 0) directionRef.current = 1

    moveBy += directionRef.current * moveBy * Math.abs(factor)
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* fade the ends so items enter and leave rather than getting clipped */}
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-20 bg-gradient-to-r from-bg-soft to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-20 bg-gradient-to-l from-bg-soft to-transparent rtl:bg-gradient-to-r" />

      <motion.div className="flex w-max gap-10" style={{ x }}>
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="group flex items-center gap-10 whitespace-nowrap font-mono text-[14.5px] text-text-4 transition-colors hover:text-brand"
            dir="ltr"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-border-strong" aria-hidden />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
