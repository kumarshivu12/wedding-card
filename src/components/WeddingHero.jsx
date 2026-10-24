import { motion } from 'framer-motion'
import { weddingData } from '../data/weddingData'

const petals = Array.from({ length: 24 }, (_, i) => {
  const depth = (i % 4) / 3 // 0 = far, 1 = near
  return {
    id: i,
    left: `${(i * 41 + 7) % 100}%`,
    delay: `${-((i * 1.9) % 16)}s`,
    duration: `${14 - depth * 4 + (i % 3)}s`,
    size: `${14 + depth * 22 + (i % 3) * 3}px`,
    drift: `${(i % 2 ? 1 : -1) * (40 + (i % 5) * 25)}px`,
    sway: `${3 + (i % 4)}s`,
    opacity: 0.55 + depth * 0.4,
    blur: depth < 0.3 ? '1.5px' : '0px',
  }
})

export default function WeddingHero({ copy, language }) {
  const h = weddingData.hero
  const t = h[language] || h.en
  return (
    <section className={`hero hero-${language}`} style={{ '--hero-image': `url("${weddingData.assets.hero}")` }}>
      <div className="hero-shade" />
      <div className="petals" aria-hidden="true">
        {petals.map(p => (
          <span key={p.id} style={{ left: p.left, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration, '--drift': p.drift, '--peak': p.opacity, filter: `blur(${p.blur}) drop-shadow(0 3px 3px #0003)` }}>
            <i style={{ animationDuration: p.sway, animationDelay: p.delay }} />
          </span>
        ))}
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
