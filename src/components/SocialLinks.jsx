import { useState } from 'react'
import { motion } from 'framer-motion'
import { Facebook, Github, Instagram, Mail, MessageCircle } from './icons'
import { TikTokIcon, XIcon } from './BrandIcons'
import { useI18n } from '../app/providers'
import { socials } from '../data/structure'

const GLYPH = {
  MessageCircle,
  Facebook,
  Instagram,
  Github,
  Mail,
  X: XIcon,
  TikTok: TikTokIcon,
}

/**
 * Row of profile links.
 *
 * Each tile takes its platform's own colour on hover and stays neutral at rest,
 * so seven logos read as one row rather than a sheet of clashing brand colours.
 */
export default function SocialLinks({ size = 'md', className = '' }) {
  const { t } = useI18n()
  const large = size === 'lg'

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {socials.map((s, i) => (
        <li key={s.id}>
          <Tile social={s} label={t.socials[s.id]} large={large} delay={i * 0.05} />
        </li>
      ))}
    </ul>
  )
}

function Tile({ social, label, large, delay }) {
  const [hover, setHover] = useState(false)
  const Glyph = GLYPH[social.icon] ?? Mail
  const external = social.url.startsWith('http')

  return (
    <motion.a
      href={social.url}
      target={external ? '_blank' : undefined}
      // rel="me" declares these as verified identity links for the same
      // person — the mechanism IndieAuth/Mastodon use, and a signal search
      // engines read alongside the sameAs entries in the page's JSON-LD.
      rel={external ? 'me noreferrer noopener' : undefined}
      aria-label={label}
      title={label}
      data-cursor="link"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -3 }}
      animate={{
        borderColor: hover ? social.brand : 'rgb(var(--border))',
        color: hover ? social.brand : 'rgb(var(--text-3))',
        backgroundColor: hover
          ? `color-mix(in srgb, ${social.brand} 12%, transparent)`
          : 'rgb(var(--glass) / var(--glass-alpha))',
      }}
      className={`flex items-center justify-center rounded-xl border ${
        large ? 'h-12 w-12' : 'h-10 w-10'
      }`}
    >
      <Glyph size={large ? 20 : 17} />
    </motion.a>
  )
}
