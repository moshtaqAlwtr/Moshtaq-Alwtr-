import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Layers, ListChecks, Star, X, getIcon } from './icons'
import { useI18n } from '../app/providers'
import { projectsMeta } from '../data/structure'
import ProjectVisual from './ProjectVisual'
import { Reveal, Section, SectionHeading } from './ui'

export default function Projects() {
  const { t, isRTL } = useI18n()
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)

  const categories = useMemo(
    () => ['all', ...new Set(projectsMeta.map((p) => p.category))],
    []
  )

  const visible =
    filter === 'all' ? projectsMeta : projectsMeta.filter((p) => p.category === filter)

  const openProject = projectsMeta.find((p) => p.id === openId) ?? null

  return (
    <Section id="projects">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          desc={t.projects.desc}
        />

        {/* ------------------------------------------------------- filters */}
        <Reveal className="mb-9 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                filter === cat ? 'text-brand-contrast' : 'text-text-3 hover:text-text'
              }`}
            >
              {filter === cat && (
                <motion.span
                  layoutId="project-filter"
                  className="brand-fill absolute inset-0 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{t.projects.filters[cat]}</span>
            </button>
          ))}
        </Reveal>

        {/* ---------------------------------------------------------- grid */}
        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                /* The first card of an unfiltered list runs full width as a
                   spotlight; filtered views stay on a plain two-up grid. */
                wide={i === 0 && filter === 'all'}
                onOpen={() => setOpenId(project.id)}
                t={t}
                isRTL={isRTL}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenId(null)} t={t} />
    </Section>
  )
}

function ProjectCard({ project, index, wide, onOpen, t, isRTL }) {
  const Icon = getIcon(project.icon)
  const copy = t.projects.items[project.id]

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onOpen}
      className={`card card-hover edge-glow group cursor-pointer overflow-hidden rounded-2xl ${
        wide ? 'md:col-span-2' : ''
      }`}
    >
      <div className={wide ? 'grid items-stretch md:grid-cols-2' : ''}>
        {/* cover */}
        <div
          className={`relative overflow-hidden p-4 ${wide ? 'md:order-last md:p-6' : ''}`}
          style={{ background: `hsl(${project.hue} 55% 50% / 0.05)` }}
        >
          <ProjectVisual
            variant={project.visual}
            hue={project.hue}
            className={`transition-transform duration-500 group-hover:scale-[1.03] ${
              wide ? 'h-52 md:h-full md:min-h-[240px]' : 'h-40'
            }`}
          />
        </div>

        {/* body */}
        <div className="p-6 sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `hsl(${project.hue} 60% 50% / 0.12)`,
                color: `hsl(${project.hue} 65% 55%)`,
                boxShadow: `inset 0 0 0 1px hsl(${project.hue} 60% 50% / 0.25)`,
              }}
            >
              <Icon size={21} />
            </span>

            <div className="flex flex-wrap items-center justify-end gap-1.5">
              {project.featured && (
                <span className="chip !px-2.5 !py-0.5 !text-[10.5px]">
                  <Star size={10} fill="currentColor" />
                  {t.projects.labels.featured}
                </span>
              )}
              <span className="rounded-full border border-border px-2.5 py-0.5 text-[10.5px] font-medium text-text-3">
                {t.projects.filters[project.category]}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-brand sm:text-xl">
            {copy.title}
          </h3>
          <p className="mt-1 text-[13px] text-text-4">{copy.subtitle}</p>

          <p className="mt-4 text-[14px] leading-[1.85] text-text-3">{copy.summary}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-3"
                dir="ltr"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand">
            {t.projects.labels.details}
            <ArrowUpRight
              size={15}
              className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isRTL ? '-scale-x-100 group-hover:-translate-x-0.5' : ''
              }`}
            />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectModal({ project, onClose, t }) {
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

  const copy = project ? t.projects.items[project.id] : null
  const Icon = project ? getIcon(project.icon) : null

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={copy.title}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-border bg-surface sm:rounded-3xl"
          >
            {/* ------------------------------------------------------ header */}
            <div
              className="relative px-7 pb-7 pt-8 sm:px-9"
              style={{
                background: `linear-gradient(160deg, hsl(${project.hue} 60% 50% / 0.14), transparent 72%)`,
              }}
            >
              <button
                onClick={onClose}
                aria-label={t.ui.close}
                className="icon-btn absolute end-5 top-5 h-9 w-9"
              >
                <X size={17} />
              </button>

              <span
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background: `hsl(${project.hue} 60% 50% / 0.15)`,
                  color: `hsl(${project.hue} 65% 55%)`,
                  boxShadow: `inset 0 0 0 1px hsl(${project.hue} 60% 50% / 0.3)`,
                }}
              >
                <Icon size={24} />
              </span>

              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-4">
                {t.projects.labels.caseStudy}
              </span>
              <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
                {copy.title}
              </h3>
              <p className="mt-1.5 text-sm text-text-3">{copy.subtitle}</p>
            </div>

            <div className="px-7 pb-9 sm:px-9">
              <ProjectVisual
                variant={project.visual}
                hue={project.hue}
                className="mb-8 h-48 sm:h-60"
              />

              <div className="space-y-7">
                <Block
                  iconName="CircleAlert"
                  color="rgb(239 68 68)"
                  title={t.projects.labels.problem}
                  text={copy.problem}
                />
                <Block
                  iconName="Lightbulb"
                  color={`hsl(${project.hue} 65% 55%)`}
                  title={t.projects.labels.solution}
                  text={copy.solution}
                />

                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-[15px] font-bold">
                    <ListChecks size={16} style={{ color: `hsl(${project.hue} 65% 55%)` }} />
                    {t.projects.labels.features}
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {copy.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-[13.5px] text-text-2"
                      >
                        <Check
                          size={14}
                          className="mt-1 shrink-0"
                          style={{ color: `hsl(${project.hue} 65% 55%)` }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-[15px] font-bold">
                    <Layers size={16} style={{ color: `hsl(${project.hue} 65% 55%)` }} />
                    {t.projects.labels.stack}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-text-2"
                        dir="ltr"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Block({ iconName, color, title, text }) {
  const Icon = getIcon(iconName)
  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 text-[15px] font-bold">
        <Icon size={16} style={{ color }} />
        {title}
      </h4>
      <p className="text-[14px] leading-[1.9] text-text-3">{text}</p>
    </div>
  )
}
