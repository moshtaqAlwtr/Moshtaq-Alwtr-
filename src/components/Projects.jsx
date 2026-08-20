import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowUpRight, Check, Layers, ListChecks, Star, X, getIcon } from './icons'
import { useI18n } from '../app/providers'
import { projectsMeta } from '../data/structure'
import ProjectVisual from './ProjectVisual'
import { Reveal, Section, SectionHeading } from './ui'
import { Tilt } from './motion/primitives'

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

  /**
   * Which cards span the full row.
   *
   * The unfiltered list opens with a spotlight card. Whatever follows sits in
   * a two-up grid, so an odd remainder would leave a lone card next to a gap —
   * the final card spans instead, which also bookends the section.
   */
  const isWide = (i) => {
    const spotlight = filter === 'all' && i === 0
    if (spotlight) return true
    const remainder = filter === 'all' ? visible.length - 1 : visible.length
    return i === visible.length - 1 && remainder % 2 === 1
  }

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
              className={`relative rounded-full px-4 py-1.5 text-[14.5px] font-semibold transition-colors ${
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
                wide={isWide(i)}
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

// forwardRef because AnimatePresence mode="popLayout" measures the child's DOM
// node directly; without it the ref lands on nothing and exit animations break.
const ProjectCard = forwardRef(function ProjectCard(
  { project, index, wide, onOpen, t, isRTL },
  ref
) {
  const Icon = getIcon(project.icon)
  const copy = t.projects.items[project.id]

  // A phone has no hover, so the mockup animations would never fire there.
  // Entering the viewport stands in for it.
  const viewRef = useRef(null)
  const inView = useInView(viewRef, { once: true, margin: '-25% 0px -25% 0px' })

  return (
    <motion.article
      ref={ref}
      data-inview={inView ? 'true' : 'false'}
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onOpen}
      className={wide ? 'md:col-span-2' : ''}
      data-cursor="card"
      data-cursor-label={t.projects.labels.caseStudy}
    >
      <Tilt
        className="card card-hover edge-glow group relative h-full cursor-pointer overflow-hidden rounded-2xl"
        max={5}
      >
      <span ref={viewRef} aria-hidden className="absolute inset-x-0 top-1/2 h-px" />
      <div className={wide ? 'grid items-stretch md:grid-cols-2' : ''}>
        {/* cover */}
        <motion.div
          layoutId={`cover-${project.id}`}
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
        </motion.div>

        {/* body */}
        <div className="p-6 sm:p-7">
          {/* Icon shares the title's line so the meta badges stop floating in
              the middle of the card with nothing to align against. */}
          <div className="flex items-start gap-3.5">
            <motion.span
              layoutId={`badge-${project.id}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: `hsl(${project.hue} 60% 50% / 0.12)`,
                color: `hsl(${project.hue} 65% 55%)`,
                boxShadow: `inset 0 0 0 1px hsl(${project.hue} 60% 50% / 0.25)`,
              }}
            >
              <Icon size={21} />
            </motion.span>

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold leading-tight tracking-tight transition-colors group-hover:text-brand sm:text-xl">
                {copy.title}
              </h3>
              <p className="mt-1 text-[14.5px] text-text-4">{copy.subtitle}</p>
            </div>

            {project.featured && (
              <span
                className="shrink-0 pt-1 text-brand"
                title={t.projects.labels.featured}
                aria-label={t.projects.labels.featured}
              >
                <Star size={15} fill="currentColor" />
              </span>
            )}
          </div>

          <p className="mt-4 text-[15.5px] leading-[1.85] text-text-3">{copy.summary}</p>

          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-md bg-brand/10 px-2 py-0.5 text-[12.5px] font-semibold text-brand">
              {t.projects.filters[project.category]}
            </span>
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[12.5px] text-text-3"
                dir="ltr"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-[14.5px] font-bold text-brand">
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
      </Tilt>
    </motion.article>
  )
})

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

              {/* same layoutId as the card badge, so it flies into place */}
              <motion.span
                layoutId={`badge-${project.id}`}
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background: `hsl(${project.hue} 60% 50% / 0.15)`,
                  color: `hsl(${project.hue} 65% 55%)`,
                  boxShadow: `inset 0 0 0 1px hsl(${project.hue} 60% 50% / 0.3)`,
                }}
              >
                <Icon size={24} />
              </motion.span>

              <span className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-text-4">
                {t.projects.labels.caseStudy}
              </span>
              <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
                {copy.title}
              </h3>
              <p className="mt-1.5 text-sm text-text-3">{copy.subtitle}</p>
            </div>

            <div className="px-7 pb-9 sm:px-9">
              <motion.div
                layoutId={`cover-${project.id}`}
                className="mb-8 overflow-hidden rounded-2xl p-3"
                style={{ background: `hsl(${project.hue} 55% 50% / 0.05)` }}
              >
                <ProjectVisual
                  variant={project.visual}
                  hue={project.hue}
                  className="h-48 sm:h-60"
                />
              </motion.div>

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
                  <h4 className="mb-4 flex items-center gap-2 text-[16.5px] font-bold">
                    <ListChecks size={16} style={{ color: `hsl(${project.hue} 65% 55%)` }} />
                    {t.projects.labels.features}
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {copy.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-[15px] text-text-2"
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
                  <h4 className="mb-4 flex items-center gap-2 text-[16.5px] font-bold">
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
      <h4 className="mb-3 flex items-center gap-2 text-[16.5px] font-bold">
        <Icon size={16} style={{ color }} />
        {title}
      </h4>
      <p className="text-[15.5px] leading-[1.9] text-text-3">{text}</p>
    </div>
  )
}
