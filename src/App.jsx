import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EnvelopeIntro from './components/EnvelopeIntro'
import WeddingHero from './components/WeddingHero'
import { BlessedSection, CountdownSection, EventsSection, FamilySection, Footer, MusicButton, VenueSection, WelcomeSection } from './components/InvitationSections'
import { weddingData } from './data/weddingData'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [language, setLanguage] = useState('en')
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const copy = weddingData.copy[language]

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        await audio.play()
        setPlaying(true)
      }
    } catch {
      setPlaying(false)
    }
  }

  const openInvitation = () => {
    setOpened(true)
    if (audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
    window.setTimeout(() => document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' }), 350)
  }

  return (
    <>
      <audio ref={audioRef} src={weddingData.assets.music} loop preload="none" onEnded={() => setPlaying(false)} />
      <AnimatePresence mode="wait">
        {!opened ? (
          <EnvelopeIntro key="envelope" onOpen={openInvitation} language={language} setLanguage={setLanguage} />
        ) : (
          <motion.main id="invitation" key="invitation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="language-switch page-language">
              <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button><span>·</span>
              <button className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}>हिंदी</button>
            </div>
            <WeddingHero copy={copy} />
            <WelcomeSection copy={copy} />
            <BlessedSection copy={copy} />
            <CountdownSection copy={copy} />
            <EventsSection copy={copy} />
            <VenueSection copy={copy} />
            <FamilySection />
            <Footer copy={copy} />
            <MusicButton playing={playing} onToggle={toggleMusic} />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
