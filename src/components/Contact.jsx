import { useState } from 'react'
import { Check, Copy, Mail, MapPin, MessageCircle, Phone, Send } from './icons'
import { useI18n } from '../app/providers'
import { contact } from '../data/structure'
import { Reveal, Section, SectionHeading } from './ui'

export default function Contact() {
  const { t } = useI18n()

  const channels = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      value: contact.phone,
      href: `https://wa.me/${contact.whatsapp}`,
      hue: 142,
      note: t.contact.fastest,
      copy: contact.phone,
      ltr: true,
    },
    {
      id: 'email',
      icon: Mail,
      value: contact.email,
      href: `mailto:${contact.email}`,
      hue: 200,
      copy: contact.email,
      ltr: true,
    },
    {
      id: 'phone',
      icon: Phone,
      value: contact.phone,
      href: `tel:${contact.phone}`,
      hue: 22,
      copy: contact.phone,
      ltr: true,
    },
    {
      id: 'location',
      icon: MapPin,
      value: t.profile.location,
      hue: 42,
    },
  ]

  return (
    <Section id="contact" tinted>
      <div className="container-x">
        <SectionHeading
          index="06"
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          desc={t.contact.desc}
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map((channel, i) => (
              <Reveal key={channel.id} delay={0.05 * i}>
                <ChannelCard channel={channel} t={t} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="card edge-glow relative flex h-full flex-col justify-center overflow-hidden rounded-3xl p-8 sm:p-10">
              <div
                className="orb"
                style={{
                  top: '-35%',
                  insetInlineEnd: '-20%',
                  width: '75%',
                  height: '75%',
                  background:
                    'radial-gradient(circle, rgb(var(--brand) / 0.22), transparent 65%)',
                }}
                aria-hidden
              />

              <div className="relative">
                <span className="chip mb-6">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                  {t.profile.status}
                </span>

                <h3 className="text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">
                  {t.contact.panel.title}{' '}
                  <span className="brand-text">{t.contact.panel.titleAccent}</span>
                </h3>

                <p className="mt-4 text-[16.5px] leading-[1.9] text-text-3">
                  {t.contact.panel.desc}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <MessageCircle size={17} />
                    {t.contact.panel.whatsappCta}
                  </a>

                  <a
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(
                      t.contact.panel.emailSubject
                    )}`}
                    className="btn-ghost"
                  >
                    <Send size={16} className="text-brand" />
                    {t.contact.panel.emailCta}
                  </a>
                </div>

                <p className="mt-7 border-t border-border pt-6 text-xs text-text-4">
                  {t.contact.panel.note}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function ChannelCard({ channel, t }) {
  const { icon: Icon, value, href, hue, note, copy, ltr, id } = channel
  const [copied, setCopied] = useState(false)

  const onCopy = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(copy)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — the link itself still works */
    }
  }

  const Wrapper = href ? 'a' : 'div'
  const wrapperProps = href
    ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className="card card-hover edge-glow group flex h-full items-center gap-3.5 rounded-2xl p-4"
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `hsl(${hue} 60% 50% / 0.12)`,
          color: `hsl(${hue} 65% 50%)`,
          boxShadow: `inset 0 0 0 1px hsl(${hue} 60% 50% / 0.25)`,
        }}
      >
        <Icon size={19} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] text-text-4">{t.contact.channels[id]}</span>
          {note && (
            <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[11px] font-semibold text-brand">
              {note}
            </span>
          )}
        </div>
        {/* <bdi> keeps Latin values reading left-to-right while still sitting at
            the start of the line in RTL. */}
        <div className="truncate text-[15px] font-semibold text-text-2">
          <bdi dir={ltr ? 'ltr' : 'rtl'}>{value}</bdi>
        </div>
      </div>

      {copy && (
        <button
          onClick={onCopy}
          aria-label={`${t.ui.copy} — ${t.contact.channels[id]}`}
          className="icon-btn h-8 w-8 shrink-0"
        >
          {copied ? <Check size={14} className="text-brand" /> : <Copy size={14} />}
        </button>
      )}
    </Wrapper>
  )
}
