import { motion } from 'framer-motion'
import { weddingData } from '../data/weddingData'

const petals = Array.from({ length: 28 }, (_, i) => ({
  id: i, left: `${(i * 37) % 100}%`, delay: `${(i % 9) * -1.7}s`,
  duration: `${9 + (i % 8)}s`, size: `${9 + (i % 5) * 3}px`,
}))

export default function WeddingHero({ copy, language }) {
  const h = weddingData.hero
  const t = h[language] || h.en
  return (
    <section className={`hero hero-${language}`} style={{ '--hero-image': `url("${weddingData.assets.hero}")` }}>
      <div className="hero-shade" />
      <div className="petals" aria-hidden="true">
        {petals.map(p => <span key={p.id} style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: p.size }} />)}
      </div>
      <motion.div className="hero-content" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}>
        <div className="hero-ganesha" role="img" aria-label="Lord Ganesha" style={{ '--ganesha': `url("${h.ganesha}")` }} />
        <span className="hero-invocation">{t.invocation}</span>
        <div className="hero-person">
          <h1>{t.bride.title} {t.bride.name}</h1>
          <p>{t.bride.parents}</p>
        </div>
        <div className="hero-rule"><i /> <span>{t.with}</span> <i /></div>
        <div className="hero-person">
          <h1>{t.groom.title} {t.groom.name}</h1>
          <p>{t.groom.parents}</p>
        </div>
        <strong>{t.date}</strong>
      </motion.div>
      <a className="scroll-cue" href="#welcome"><span />{copy.scroll}</a>
    </section>
  )
}
