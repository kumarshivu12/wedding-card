import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { weddingData } from '../data/weddingData'

const LEAVE_MS = 2700
const OPEN_MS = 3500
const sparks = Array.from({ length: 16 }, (_, i) => ({ id: i, angle: i * 22.5, dist: 70 + (i % 3) * 28 }))
const dust = Array.from({ length: 22 }, (_, i) => ({
  id: i, left: `${(i * 47) % 100}%`, top: `${(i * 29) % 100}%`,
  size: 2 + (i % 4), delay: `${(i % 7) * -1.3}s`, duration: `${7 + (i % 6)}s`,
}))
const copyByLang = {
  en: { caption: 'A WEDDING INVITATION', kicker: 'THE WEDDING OF', tap: 'TAP TO OPEN', bottom: 'WITH LOVE & BLESSINGS' },
  hi: { caption: 'विवाह आमंत्रण', kicker: 'शुभ विवाह', tap: 'खोलने के लिए स्पर्श करें', bottom: 'प्रेम एवं आशीर्वाद सहित' },
}

export default function EnvelopeIntro({ onOpen, language, setLanguage }) {
  const [opening, setOpening] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const timer = useRef([])
  const t = copyByLang[language] || copyByLang.en
  const hero = weddingData.hero[language] || weddingData.hero.en
  const { bride, groom } = weddingData.couple
  const ganesha = { '--ganesha': `url("${weddingData.hero.ganesha}")` }

  useEffect(() => () => timer.current.forEach(window.clearTimeout), [])

  const open = () => {
    if (opening) return
    setOpening(true)
    setTilt({ x: 0, y: 0 })
    const calm = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    timer.current = [
      window.setTimeout(() => setLeaving(true), calm ? 100 : LEAVE_MS),
      window.setTimeout(onOpen, calm ? 400 : OPEN_MS),
    ]
  }

  const onMove = e => {
    if (opening || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 })
  }

  return (
    <AnimatePresence>
      <motion.section
        className={`envelope-screen ${opening ? 'is-opening' : ''} ${leaving ? 'is-leaving' : ''}`}
        lang={language}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9 }}
        onPointerMove={onMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <div className="envelope-blend" aria-hidden="true" style={{ '--hero-image': `url("${weddingData.assets.hero}")` }} />
        <div className="envelope-dust" aria-hidden="true">
          {dust.map(d => <span key={d.id} style={{ left: d.left, top: d.top, width: d.size, height: d.size, animationDelay: d.delay, animationDuration: d.duration }} />)}
        </div>

        <div className="language-switch">
          <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
          <span>·</span>
          <button className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}>हिंदी</button>
        </div>

        <div className="envelope-stage">
          <div className="envelope-caption">{t.caption}</div>
          <div className="envelope-tilt" style={{ transform: `rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 8}deg)` }}>
            <motion.div className="envelope" initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <div className="envelope-paper-texture" />
              <div className="envelope-lining" />
              <div className="envelope-inner">
                <div className="inner-ganesha" style={ganesha} />
                <span className="inner-invocation">{hero.invocation}</span>
                <span className="inner-kicker">{t.kicker}</span>
                <span className="inner-names">{bride} <i>&amp;</i> {groom}</span>
                <span className="inner-date">{hero.date}</span>
              </div>
              <svg className="envelope-front" viewBox="0 0 452 400" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="ivL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff9ea" /><stop offset="1" stopColor="#ebd8b2" /></linearGradient>
                  <linearGradient id="ivR" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fffaf0" /><stop offset="1" stopColor="#e9d3a8" /></linearGradient>
                  <linearGradient id="ivB" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#e6d0a4" /><stop offset="1" stopColor="#f8ecd2" /></linearGradient>
                </defs>
                <path d="M0 0 L226 226 L0 400 Z" fill="url(#ivL)" stroke="#c9a24f" strokeWidth="1.2" />
                <path d="M452 0 L226 226 L452 400 Z" fill="url(#ivR)" stroke="#c9a24f" strokeWidth="1.2" />
                <path d="M0 400 L226 204 L452 400 Z" fill="url(#ivB)" stroke="#c9a24f" strokeWidth="1.2" />
                <path d="M14 386 L226 216 L438 386" fill="none" stroke="#c9a24f" strokeWidth="1.2" strokeDasharray="0.5 7" strokeLinecap="round" opacity=".9" />
                <path d="M0 0 L226 226 L452 0" fill="none" stroke="#00000012" strokeWidth="6" />
                <text x="226" y="352" textAnchor="middle" fontSize="26" fill="#b98e4a" opacity=".75">❦</text>
              </svg>
              <div className="envelope-flap">
                <div className="flap-face front">
                  <svg viewBox="0 0 452 240" preserveAspectRatio="none" aria-hidden="true">
                    <defs><linearGradient id="flapG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fffaf0" /><stop offset="1" stopColor="#e7d1a6" /></linearGradient></defs>
                    <path d="M0 0 L452 0 L226 240 Z" fill="url(#flapG)" stroke="#c9a24f" strokeWidth="1.6" />
                    <path d="M26 6 L426 6 L226 218 Z" fill="none" stroke="#c9a24f" strokeWidth="1.2" strokeDasharray="0.5 7" strokeLinecap="round" />
                    <path d="M70 6 L382 6 L226 170 Z" fill="none" stroke="#c9a24f55" strokeWidth="1" />
                  </svg>
                </div>
                <div className="flap-face back" />
              </div>
              <div className="seal-burst" aria-hidden="true">
                {sparks.map(sp => <span key={sp.id} style={{ '--a': `${sp.angle}deg`, '--d': `${sp.dist}px` }} />)}
              </div>
              <motion.div className="golden-glow" style={{ x: '-50%', y: '-50%' }} animate={opening ? { opacity: [0, 1, 0.85, 0], scale: [0.2, 1.7, 2.2] } : { opacity: 0 }} transition={{ duration: 1.65 }} />
              <motion.button className="wax-seal" onClick={open} disabled={opening} aria-label="Open wedding invitation" style={{ x: '-50%', y: '-50%' }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                <span className="seal-ganesha" style={ganesha} />
              </motion.button>
            </motion.div>
          </div>
          <motion.button className="tap-open" onClick={open} disabled={opening} animate={{ opacity: opening ? 0 : [0.65, 1, 0.65] }} transition={{ duration: 2, repeat: opening ? 0 : Infinity }}>
            {t.tap}
          </motion.button>
          <div className="envelope-bottom-note">{t.bottom}</div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
