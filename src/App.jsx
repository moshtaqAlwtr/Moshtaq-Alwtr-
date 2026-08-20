import { I18nProvider, ThemeProvider, useI18n } from './app/providers'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { FloatingActions, ScrollProgress } from './components/FloatingUI'
import { Ambient } from './components/ui'
import CursorFX from './components/motion/CursorFX'

function Site() {
  const { lang } = useI18n()

  return (
    // Remounting on language change resets the typewriter and reveal states
    // instead of leaving half-animated nodes from the previous locale.
    <div key={lang}>
      <Ambient />
      <CursorFX />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Process />
        <Contact />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Site />
      </I18nProvider>
    </ThemeProvider>
  )
}
