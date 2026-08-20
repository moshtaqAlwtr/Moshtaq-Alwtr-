import { useState } from 'react'
import { Mail, MessageCircle, Phone, MapPin, Send, Copy, Check } from 'lucide-react'
import { profile } from '../data/content'
import { Reveal, Section, SectionTitle } from './ui'

export default function Contact() {
  const channels = [
    {
      icon: MessageCircle,
      label: 'واتساب',
      value: profile.phone,
      href: `https://wa.me/${profile.whatsapp}`,
      color: '#25D366',
      note: 'الأسرع للرد',
      ltr: true,
    },
    {
      icon: Mail,
      label: 'البريد الإلكتروني',
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: '#06b6d4',
      copy: profile.email,
      ltr: true,
    },
    {
      icon: Phone,
      label: 'الهاتف',
      value: profile.phone,
      href: `tel:${profile.phone}`,
      color: '#8b5cf6',
      copy: profile.phone,
      ltr: true,
    },
    {
      icon: MapPin,
      label: 'الموقع',
      value: profile.location,
      color: '#f59e0b',
    },
  ]

  return (
    <Section id="contact" tinted>
      <div className="container-x">
        <SectionTitle
          eyebrow="تواصل معي"
          title="عندك فكرة مشروع؟"
          desc="أخبرني بما تحتاجه وسأرد عليك بعرض واضح للمراحل والمدة والتكلفة."
        />

        <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr]">
          {/* ----- Channels ----- */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={0.06 * i}>
                <ChannelCard {...c} />
              </Reveal>
            ))}
          </div>

          {/* ----- CTA panel ----- */}
          <Reveal delay={0.1}>
            <div className="glass ring-glow relative flex h-full flex-col justify-center overflow-hidden rounded-3xl p-8 sm:p-10">
              <div
                className="orb"
                style={{
                  top: '-30%',
                  insetInlineEnd: '-20%',
                  width: '70%',
                  height: '70%',
                  background: 'radial-gradient(circle, rgba(16,185,129,0.25), transparent 65%)',
                }}
              />

              <div className="relative">
                <span className="chip mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {profile.status}
                </span>

                <h3 className="font-display text-2xl font-extrabold leading-snug sm:text-3xl">
                  لنحوّل فكرتك إلى <span className="grad-text">منتج يعمل</span>
                </h3>

                <p className="mt-4 text-[15px] leading-loose text-ink-muted">
                  سواء كنت تحتاج نظاماً إدارياً، أو متجراً إلكترونياً، أو تطبيق جوال —
                  ابدأ برسالة واحدة ونناقش التفاصيل معاً. الاستشارة الأولى مجانية.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${profile.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-grad-primary px-6 py-3.5 font-bold text-page shadow-lg shadow-accent/25 transition-transform hover:scale-105"
                  >
                    <MessageCircle size={18} />
                    ابدأ محادثة واتساب
                  </a>

                  <a
                    href={`mailto:${profile.email}?subject=${encodeURIComponent('استفسار عن مشروع')}`}
                    className="glass glass-hover inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-bold text-ink"
                  >
                    <Send size={17} className="text-accent" />
                    أرسل بريداً
                  </a>
                </div>

                <p className="mt-7 border-t border-white/[0.06] pt-6 text-xs text-ink-dim">
                  عادةً أرد خلال ساعات قليلة — من السبت إلى الخميس.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function ChannelCard({ icon: Icon, label, value, href, color, note, copy, ltr }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(copy)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — the link still works */
    }
  }

  const Wrapper = href ? 'a' : 'div'
  const wrapperProps = href
    ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className="glass glass-hover ring-glow group flex h-full items-center gap-4 rounded-2xl p-5"
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${color}1a`,
          color,
          boxShadow: `inset 0 0 0 1px ${color}33`,
        }}
      >
        <Icon size={21} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-dim">{label}</span>
          {note && (
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
              {note}
            </span>
          )}
        </div>
        <div className="truncate text-sm font-semibold text-ink-soft">
          <bdi dir={ltr ? 'ltr' : 'rtl'}>{value}</bdi>
        </div>
      </div>

      {copy && (
        <button
          onClick={onCopy}
          aria-label={`نسخ ${label}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-ink-dim transition-colors hover:bg-white/[0.1] hover:text-accent"
        >
          {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
        </button>
      )}
    </Wrapper>
  )
}
