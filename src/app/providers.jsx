import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import ar from '../i18n/ar'
import en from '../i18n/en'

const DICTIONARIES = { ar, en }
const THEME_KEY = 'mw-theme'
const LANG_KEY = 'mw-lang'

/* ------------------------------------------------------------------ theme */

const ThemeContext = createContext(null)

function readTheme() {
  if (typeof window === 'undefined') return 'dark'
  // The inline boot script in index.html already resolved this before paint;
  // reading it back keeps React in sync instead of re-deciding.
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'light' || attr === 'dark' ? attr : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#08080c' : '#fcfcfd'
    )
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* private browsing — the theme just won't persist */
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      setTheme,
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}

/* ------------------------------------------------------------------- i18n */

const I18nContext = createContext(null)

function readLang() {
  if (typeof window === 'undefined') return 'ar'
  // Set by the boot script in index.html before first paint.
  const attr = document.documentElement.getAttribute('lang')
  return attr === 'ar' || attr === 'en' ? attr : 'ar'
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(readLang)

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', dir)
    document.title = DICTIONARIES[lang].meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', DICTIONARIES[lang].meta.description)
    try {
      localStorage.setItem(LANG_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const toggleLang = useCallback(() => setLang((l) => (l === 'ar' ? 'en' : 'ar')), [])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t: DICTIONARIES[lang],
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      isRTL: lang === 'ar',
    }),
    [lang, toggleLang]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
