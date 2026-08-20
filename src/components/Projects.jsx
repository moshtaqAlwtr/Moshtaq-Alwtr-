import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, Layers, ListChecks, Star, X } from 'lucide-react'
import { getIcon } from './icons'
import { projects } from '../data/content'
import { Reveal, Section, SectionTitle } from './ui'

const ALL = 'الكل'

export default function Projects() {
  const categories = useMemo(
    () => [ALL, ...new Set(projects.map((p) => p.category))],
    []
  )
  const [filter, setFilter] = useState(ALL)
  const [selected, setSelected] = useState(null)

  const visible = filter === ALL ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section id="projects">
      <div className="container-x">
        <SectionTitle
          eyebrow="أعمالي"
          title="مشاريع بنيتها من الصفر"
          desc="كل مشروع هنا حلّ مشكلة تشغيلية حقيقية. اضغط على أي بطاقة لتقرأ القصة كاملة."
        />

        {/* ----- Filters ----- */}
        <Reveal className="mb-10 flex flex-wrap justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                filter === cat ? 'text-page' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {filter === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-grad-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </Reveal>

        {/* ----- Grid ----- */}
        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}

function ProjectCard({ project, index, onOpen }) {
  const Icon = getIcon(project.icon)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      onClick={onOpen}
      className="glass glass-hover ring-glow group relative cursor-pointer overflow-hidden rounded-3xl p-7"
    >
      {/* accent wash */}
      <div
        className="pointer-events-none absolute -top-24 -end-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: project.accent }}
      />

      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-4">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
            style={{
              background: `${project.accent}1a`,
              color: project.accent,
              boxShadow: `inset 0 0 0 1px ${project.accent}33`,
            }}
          >
            <Icon size={26} />
          </span>

          <div className="flex items-center gap-2">
            {project.featured && (
              <span className="chip !px-2.5 !py-0.5 text-[11px]">
                <Star size={11} fill="currentColor" />
                مميّز
              </span>
            )}
            <span className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-ink-muted">
              {project.category}
            </span>
          </div>
        </div>

        <h3 className="font-display text-xl font-bold transition-colors group-hover:text-accent sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-ink-dim">{project.subtitle}</p>

        <p className="mt-4 text-sm leading-loose text-ink-muted">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] text-ink-soft ring-1 ring-white/[0.06]"
              dir="auto"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-accent">
          تفاصيل المشروع
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1.5"
          />
        </div>
      </div>
    </motion.article>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  const Icon = project ? getIcon(project.icon) : null

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/85 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/[0.08] bg-section sm:rounded-3xl"
          >
            {/* header */}
            <div
              className="relative overflow-hidden px-7 pb-8 pt-9 sm:px-9"
              style={{
                background: `linear-gradient(160deg, ${project.accent}26, transparent 70%)`,
              }}
            >
              <button
                onClick={onClose}
                aria-label="إغلاق"
                className="absolute end-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-ink-muted transition-colors hover:bg-white/[0.12] hover:text-ink"
              >
                <X size={18} />
              </button>

              <span
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background: `${project.accent}1f`,
                  color: project.accent,
                  boxShadow: `inset 0 0 0 1px ${project.accent}40`,
                }}
              >
                <Icon size={26} />
              </span>

              <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-muted">{project.subtitle}</p>
            </div>

            {/* body */}
            <div className="space-y-7 px-7 pb-9 sm:px-9">
              <Block
                icon="CircleAlert"
                color="#f43f5e"
                title="المشكلة"
                text={project.problem}
              />
              <Block
                icon="Lightbulb"
                color={project.accent}
                title="الحل الذي بنيته"
                text={project.solution}
              />

              <div>
                <h4 className="mb-4 flex items-center gap-2 font-display text-base font-bold">
                  <ListChecks size={17} style={{ color: project.accent }} />
                  أبرز الميزات
                </h4>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 rounded-xl bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink-soft ring-1 ring-white/[0.05]"
                    >
                      <Check
                        size={15}
                        className="mt-1 shrink-0"
                        style={{ color: project.accent }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 flex items-center gap-2 font-display text-base font-bold">
                  <Layers size={17} style={{ color: project.accent }} />
                  التقنيات المستخدمة
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-white/[0.05] px-3 py-1.5 font-mono text-xs text-ink-soft ring-1 ring-white/[0.07]"
                      dir="auto"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Block({ icon, color, title, text }) {
  const Icon = getIcon(icon)
  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 font-display text-base font-bold">
        <Icon size={17} style={{ color }} />
        {title}
      </h4>
      <p className="text-sm leading-loose text-ink-muted">{text}</p>
    </div>
  )
}
