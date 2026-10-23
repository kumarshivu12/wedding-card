import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { weddingData } from '../data/weddingData'

const OPEN_MS = 1900
const toran = Array.from({ length: 11 }, (_, i) => i)
const copyByLang = {
  en: { caption: 'A WEDDING INVITATION', tap: 'TAP TO ENTER', and: '&' },
  hi: { caption: 'विवाह आमंत्रण', tap: 'प्रवेश करने के लिए स्पर्श करें', and: '&' },
}

export default function DwarIntro({ onOpen, language, setLanguage }) {
  const [opening, setOpening] = useState(false)
  const timer = useRef(null)
  const t = copyByLang[language] || copyByLang.en
  const hero = weddingData.hero[language] || weddingData.hero.en
  const { bride, groom } = weddingData.couple

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const open = () => {
    if (opening) return
    setOpening(true)
    timer.current = window.setTimeout(onOpen, OPEN_MS)
  }

  return (
    <motion.section className={`dwar-screen ${opening ? 'is-opening' : ''}`} lang={language} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <div className="language-switch dwar-language">
        <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
        <span>·</span>
        <button className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}>हिंदी</button>
      </div>

      <div className="dwar-light" aria-hidden="true" />

      <div className="dwar-frame">
        <div className="dwar-toran" aria-hidden="true">
          {toran.map(i => <span key={i} className={i % 2 ? 'gold' : 'marigold'} style={{ '--d': `${(i % 4) * 0.35}s` }} />)}
        </div>
        <div className="dwar-doors">
          <div className="dwar-door left" aria-hidden="true"><i className="arch" /><i className="arch lower" /><b className="ring" /></div>
          <div className="dwar-door right" aria-hidden="true"><i className="arch" /><i className="arch lower" /><b className="ring" /></div>
        </div>
      </div>

      <div className="dwar-plaque">
        <div className="dwar-ganesha" role="img" aria-label="Lord Ganesha" style={{ '--ganesha': `url("${weddingData.hero.ganesha}")` }} />
        <span className="dwar-invocation">{hero.invocation}</span>
        <span className="dwar-caption">{t.caption}</span>
        <span className="dwar-names">{bride}<i>{t.and}</i>{groom}</span>
        <span className="dwar-date">{hero.date}</span>
        <motion.button className="dwar-tap" onClick={open} disabled={opening} animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
          {t.tap}
        </motion.button>
      </div>
    </motion.section>
  )
}
