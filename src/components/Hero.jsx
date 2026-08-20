import { motion } from 'framer-motion'
import { ArrowDown, MessageCircle, FolderGit2, MapPin } from 'lucide-react'
import { profile, stats } from '../data/content'
import { CountUp, Particles, Typewriter } from './ui'

const techBadges = ['React', 'Laravel', 'Node.js', 'MySQL', 'React Native', 'REST API', 'TailwindCSS', 'Firebase']

export default function Hero() {
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="home" className="relative min-h-svh overflow-hidden pt-[72px]">
      <Particles />

      <div className="container-x flex min-h-[calc(100svh-72px)] flex-col justify-center py-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ---------- Copy ---------- */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="chip"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.status}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-black leading-[1.15] sm:text-5xl lg:text-6xl"
            >
              مرحباً، أنا{' '}
              <span className="relative inline-block">
                <span className="grad-text">{profile.name}</span>
                <svg
                  className="absolute -bottom-4 right-0 w-full"
                  height="10"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 7 Q 50 1 100 5 T 198 4"
                    stroke="url(#underline)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="underline" x1="0" x2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-7 font-display text-xl font-semibold text-ink-soft sm:text-2xl"
            >
              <Typewriter words={profile.roles} />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 max-w-xl text-base leading-loose text-ink-muted sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => go('projects')}
                className="group inline-flex items-center gap-2 rounded-xl bg-grad-primary px-6 py-3.5 font-bold text-page shadow-lg shadow-accent/25 transition-transform hover:scale-105"
              >
                <FolderGit2 size={18} />
                شاهد مشاريعي
              </button>

              <a
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="glass glass-hover inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-bold text-ink"
              >
                <MessageCircle size={18} className="text-accent" />
                تواصل معي
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-7 flex items-center gap-2 text-sm text-ink-dim"
            >
              <MapPin size={15} className="text-accent" />
              {profile.location}
            </motion.div>
          </div>

          {/* ---------- Portrait ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[340px] lg:max-w-none"
          >
            <div className="relative aspect-square">
              {/* rotating conic ring */}
              <div
                className="absolute inset-0 rounded-[2.5rem] opacity-70"
                style={{
                  background:
                    'conic-gradient(from 0deg, #10b981, #06b6d4, #8b5cf6, #10b981)',
                  filter: 'blur(28px)',
                  animation: 'ring-spin 12s linear infinite',
                }}
              />

              <div className="glass relative h-full w-full overflow-hidden rounded-[2.5rem] p-2">
                <img
                  src={`${import.meta.env.BASE_URL}moshtaq.jpg`}
                  alt={profile.name}
                  loading="eager"
                  className="h-full w-full rounded-[2rem] object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-2 rounded-[2rem] bg-gradient-to-t from-page/70 via-transparent to-transparent" />
              </div>

              {/* floating code chip */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="glass absolute -bottom-5 -start-5 rounded-2xl px-4 py-3 font-mono text-xs shadow-xl sm:text-sm"
                dir="ltr"
              >
                <div className="text-ink-dim">{'<Developer'}</div>
                <div className="ps-3 text-accent">
                  stack=<span className="text-accent-2">"Full"</span>
                </div>
                <div className="text-ink-dim">{'/>'}</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="glass absolute -top-4 -end-4 rounded-2xl px-4 py-3 text-center shadow-xl"
              >
                <div className="font-display text-2xl font-black grad-text">+5</div>
                <div className="text-[11px] text-ink-muted">سنوات خبرة</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ---------- Stats ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass glass-hover rounded-2xl px-4 py-5 text-center"
            >
              <div className="font-display text-3xl font-black grad-text sm:text-4xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-xs text-ink-muted sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ---------- Tech marquee ---------- */}
      <div className="relative overflow-hidden border-y border-white/[0.05] bg-section/40 py-4">
        <div className="flex w-max animate-marquee gap-10">
          {[...techBadges, ...techBadges].map((t, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-mono text-sm text-ink-dim transition-colors hover:text-accent"
              dir="ltr"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => go('about')}
        aria-label="انتقل للأسفل"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 animate-float text-ink-dim transition-colors hover:text-accent lg:block"
      >
        <ArrowDown size={22} />
      </button>
    </section>
  )
}
