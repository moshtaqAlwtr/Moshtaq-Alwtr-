import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, MapPin, MessageCircle } from './icons'
import { useI18n } from '../app/providers'
import { contact, statsMeta } from '../data/structure'
import { CountUp, Typewriter } from './ui'
import { Magnetic, SplitText } from './motion/primitives'
import ConstellationField from './motion/ConstellationField'

const rise = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const { t, isRTL } = useI18n()
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)

  // Scroll-linked parallax. Layers move at different rates as the hero exits,
  // which reads as depth in a way time-based loops never do.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // Hooks are called directly rather than through a helper: wrapping useSpring
  // in a function would break the rules of hooks.
  const SPRING = { stiffness: 140, damping: 30, mass: 0.4 }

  const copyY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]),
    SPRING
  )
  const portraitY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70]),
    SPRING
  )
  const portraitScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.06]),
    SPRING
  )
  const statsY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 40]),
    SPRING
  )
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0.25])

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="home" ref={sectionRef} className="relative overflow-hidden pt-[68px]">
      <ConstellationField />

      <div className="container-x relative py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          {/* ---------------------------------------------------------- copy */}
          <motion.div style={{ y: copyY, opacity: fade }}>
            <motion.span {...rise(0)} className="chip">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              {t.profile.status}
            </motion.span>

            <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.18] tracking-tight sm:text-5xl lg:text-[3.85rem]">
              <SplitText
                as="span"
                text={t.hero.greeting}
                className="block text-text-2"
                delay={0.15}
              />
              <SplitText
                as="span"
                text={t.profile.name}
                className="brand-text brand-text-live block"
                delay={0.32}
              />
            </h1>

            <motion.p
              {...rise(0.5)}
              className="mt-4 min-h-[1.5em] text-lg font-semibold text-text-2 sm:text-xl"
            >
              <Typewriter words={t.profile.roles} />
            </motion.p>

            <motion.p
              {...rise(0.58)}
              className="mt-5 max-w-xl text-base leading-[1.85] text-text-3"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div {...rise(0.66)} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.4}>
                <button onClick={() => go('projects')} className="btn-primary" data-cursor="link">
                  {t.hero.viewWork}
                  <ArrowUpRight size={17} className={isRTL ? '-scale-x-100' : ''} />
                </button>
              </Magnetic>

              <Magnetic strength={0.4}>
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost" data-cursor="link"
                >
                  <MessageCircle size={17} className="text-brand" />
                  {t.hero.contactMe}
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              {...rise(0.74)}
              className="mt-6 flex items-center gap-2 text-sm text-text-4"
            >
              <MapPin size={14} className="text-brand" />
              {t.profile.location}
            </motion.div>
          </motion.div>

          {/* ------------------------------------------------------- portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: portraitY, scale: portraitScale }}
            className="relative mx-auto w-full max-w-[330px] lg:max-w-[400px]"
          >
            <div className="relative aspect-square">
              <div
                className="absolute inset-3 rounded-[2.5rem] opacity-35 dark:opacity-55"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgb(var(--brand)), rgb(var(--brand-2)), rgb(var(--brand-3)), rgb(var(--brand)))',
                  filter: 'blur(34px)',
                  animation: 'ring-spin 14s linear infinite',
                }}
              />

              <div className="card relative h-full w-full overflow-hidden rounded-[2.25rem] p-2">
                <img
                  src={`${import.meta.env.BASE_URL}moshtaq.jpg`}
                  alt={t.profile.name}
                  width="400"
                  height="400"
                  loading="eager"
                  className="h-full w-full rounded-[1.75rem] object-cover object-top"
                />
              </div>

              <motion.div
                animate={reduced ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="card absolute -bottom-4 -start-4 rounded-2xl bg-surface px-4 py-3 font-mono text-[12.5px] leading-relaxed shadow-lg sm:text-xs"
              >
                {/* dir stays on the inner node: putting it on the positioned
                    element would make -start-4 resolve LTR inside an RTL page. */}
                <div dir="ltr">
                  <div className="text-text-4">{'<Developer'}</div>
                  <div className="ps-3 text-brand">
                    stack=<span className="text-brand-2">"Full"</span>
                  </div>
                  <div className="text-text-4">{'/>'}</div>
                </div>
              </motion.div>

              <motion.div
                animate={reduced ? {} : { y: [0, 10, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="card absolute -top-3 -end-3 rounded-2xl bg-surface px-4 py-2.5 text-center shadow-lg"
              >
                <div className="brand-text text-xl font-extrabold">5+</div>
                <div className="text-[11.5px] text-text-3">{t.hero.experienceBadge}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ---------------------------------------------------------- stats */}
        <motion.dl
          {...rise(0.82)}
          style={{ y: statsY }}
          className="card mt-14 grid grid-cols-2 rounded-2xl lg:grid-cols-4"
        >
          {statsMeta.map((s, i) => (
            <div
              key={s.id}
              className={`px-5 py-6 text-center ${
                i < 2 ? 'border-b border-border lg:border-b-0' : ''
              } ${i % 2 === 0 ? 'border-e border-border' : ''} ${
                i === 2 ? 'lg:border-s lg:border-border' : ''
              }`}
            >
              <dd className="brand-text text-3xl font-extrabold sm:text-4xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-1.5 text-xs text-text-3 sm:text-sm">{t.stats[s.id]}</dt>
            </div>
          ))}
        </motion.dl>
      </div>

    </section>
  )
}
