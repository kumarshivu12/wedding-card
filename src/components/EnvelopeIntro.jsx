import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { weddingData } from '../data/weddingData'

export default function EnvelopeIntro({ onOpen, language, setLanguage }) {
  const [opening, setOpening] = useState(false)
  const [sealError, setSealError] = useState(false)

  const open = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(onOpen, 2450)
  }

  return (
    <AnimatePresence>
      <motion.section
        className="envelope-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.8 }}
      >
        <div className="language-switch">
          <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
          <span>·</span>
          <button className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}>हिंदी</button>
        </div>

        <div className="envelope-stage">
          <div className="envelope-caption">A WEDDING INVITATION</div>
          <motion.div className={`envelope ${opening ? 'is-opening' : ''}`} initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <div className="envelope-paper-texture" />
            <div className="envelope-inner">
              <span className="inner-kicker">THE WEDDING OF</span>
              <span className="inner-names">{weddingData.couple.groom} <i>&</i> {weddingData.couple.bride}</span>
              <span className="inner-date">{weddingData.couple.displayDate}</span>
            </div>
            <div className="envelope-body" />
            <motion.div className="envelope-flap" animate={opening ? { rotateX: -180 } : { rotateX: 0 }} transition={{ duration: 1.15, ease: [0.7, 0, 0.2, 1] }} />
            <motion.div className="golden-glow" style={{ x: '-50%', y: '-50%' }} animate={opening ? { opacity: [0, 1, 0.85, 0], scale: [0.2, 1.7, 2.2] } : { opacity: 0 }} transition={{ duration: 1.65 }} />
            <motion.button className="wax-seal" onClick={open} disabled={opening} aria-label="Open wedding invitation" style={{ x: '-50%', y: '-50%' }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              {weddingData.assets.seal && !sealError ?<img src={weddingData.assets.seal} alt="" onError={() => setSealError(true)} /> : null}
              {sealError || !weddingData.assets.seal ? <span>S &amp; S</span> : null}
            </motion.button>
          </motion.div>
          <motion.button className="tap-open" onClick={open} disabled={opening} animate={{ opacity: opening ? 0 : [0.65, 1, 0.65] }} transition={{ duration: 2, repeat: opening ? 0 : Infinity }}>
            {language === 'hi' ? 'खोलने के लिए स्पर्श करें' : 'TAP TO OPEN'}
          </motion.button>
          <div className="envelope-bottom-note">WITH LOVE & BLESSINGS</div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
