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

export default function App() {
  return (
    <>
      <Ambient />
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
    </>
  )
}
