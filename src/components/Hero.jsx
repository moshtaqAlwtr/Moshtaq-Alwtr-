import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, MessageCircle } from './icons'
import { useI18n } from '../app/providers'
import { contact, statsMeta, techMarquee } from '../data/structure'
import { CountUp, Particles, Typewriter } from './ui'

const rise = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const { t, isRTL } = useI18n()

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="home" className="relative overflow-hidden pt-[68px]">
      <Particles />

      <div className="container-x py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          {/* ---------------------------------------------------------- copy */}
          <div>
            <motion.span {...rise(0)} className="chip">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              {t.profile.status}
            </motion.span>

            <motion.h1
              {...rise(0.08)}
              className="mt-6 text-[2.5rem] font-extrabold leading-[1.18] tracking-tight sm:text-5xl lg:text-[3.85rem]"
            >
              <span className="block text-text-2">{t.hero.greeting}</span>
              <span className="brand-text">{t.profile.name}</span>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-4 min-h-[1.5em] text-lg font-semibold text-text-2 sm:text-xl"
            >
              <Typewriter words={t.profile.roles} />
            </motion.p>

            <motion.p
              {...rise(0.24)}
              className="mt-5 max-w-xl text-base leading-[1.85] text-text-3"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div {...rise(0.32)} className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={() => go('projects')} className="btn-primary">
                {t.hero.viewWork}
                <ArrowUpRight size={17} className={isRTL ? '-scale-x-100' : ''} />
              </button>

              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <MessageCircle size={17} className="text-brand" />
                {t.hero.contactMe}
              </a>
            </motion.div>

            <motion.div
              {...rise(0.4)}
              className="mt-7 flex items-center gap-2 text-sm text-text-4"
            >
              <MapPin size={14} className="text-brand" />
              {t.profile.location}
            </motion.div>
          </div>

          {/* ------------------------------------------------------- portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[330px] lg:max-w-[400px]"
          >
            <div className="relative aspect-square">
              <div
                className="absolute inset-3 rounded-[2.5rem] opacity-30 dark:opacity-60"
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
                animate={{ y: [0, -10, 0] }}
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
                animate={{ y: [0, 10, 0] }}
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
          {...rise(0.5)}
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

      {/* ---------------------------------------------------- tech marquee */}
      <div className="relative overflow-hidden border-y border-border bg-bg-soft/60 py-3.5">
        <div className="flex w-max animate-marquee gap-10">
          {[...techMarquee, ...techMarquee].map((tech, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-mono text-[14.5px] text-text-4 transition-colors hover:text-brand"
              dir="ltr"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
