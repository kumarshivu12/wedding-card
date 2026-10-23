import { motion } from 'framer-motion'
import { weddingData } from '../data/weddingData'

const petals = Array.from({ length: 28 }, (_, i) => ({
  id: i, left: `${(i * 37) % 100}%`, delay: `${(i % 9) * -1.7}s`,
  duration: `${9 + (i % 8)}s`, size: `${9 + (i % 5) * 3}px`,
}))

export default function WeddingHero({ copy }) {
  return (
    <section className="hero" style={{ '--hero-image': `url("${weddingData.assets.hero}")` }}>
      <div className="hero-shade" />
      <div className="petals" aria-hidden="true">
        {petals.map(p => <span key={p.id} style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: p.size }} />)}
      </div>
      <motion.div className="hero-content" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}>
        <span className="arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
        <span className="hero-kicker">TOGETHER WITH THEIR FAMILIES</span>
        <h1>{weddingData.couple.groom}<span>&amp;</span>{weddingData.couple.bride}</h1>
        <div className="hero-rule"><i /> <span>❧</span> <i /></div>
        <p>{weddingData.couple.subtitle}</p>
        <strong>{weddingData.couple.displayDate}</strong>
      </motion.div>
      <a className="scroll-cue" href="#welcome"><span />{copy.scroll}</a>
    </section>
  )
}
