import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Music2 } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { weddingData } from '../data/weddingData'
import { useCountdown } from '../hooks/useCountdown'

export function WelcomeSection({ copy }) {
  return <section className="paper-section welcome-section" id="welcome">
    <div className="ornate-frame">
      <div className="shlok">{copy.shlok.map(line => <span key={line}>{line}</span>)}</div>
      <SectionHeading eyebrow={copy.eyebrows.invitation}>{copy.welcome}</SectionHeading>
      <p className="invitation-copy">{copy.welcomeText}</p>
      <div className="signature">Neeru &amp; Manikant</div>
    </div>
  </section>
}

export function BlessedSection({ copy }) {
  const [revealed, setRevealed] = useState(false)
  return <section className="blessed-section paper-section">
    <SectionHeading eyebrow={copy.eyebrows.moment}>{copy.blessed}</SectionHeading>
    <motion.button className={`heart-reveal ${revealed ? 'revealed' : ''}`} onClick={() => setRevealed(v => !v)} whileTap={{ scale: 0.94 }} aria-label="Reveal wedding date">
      <Heart size={35} strokeWidth={1.2} fill={revealed ? 'currentColor' : 'none'} />
      <span>{revealed ? weddingData.couple.displayDate : 'N & M'}</span>
    </motion.button>
    <p className="muted">{revealed ? copy.cherish : copy.reveal}</p>
  </section>
}

export function CountdownSection({ copy }) {
  const time = useCountdown(weddingData.couple.weddingDate)
  const values = [time.days, time.hours, time.minutes, time.seconds].map((v, i) => [copy.units[i], v])
  return <section className="countdown-section" lang={copy.lang}>
    <SectionHeading eyebrow={copy.eyebrows.bigDay}>{copy.countdown}</SectionHeading>
    <div className="countdown-grid">
      {values.map(([label, value]) => <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
    </div>
    {time.complete && <p className="muted">The celebration has begun!</p>}
  </section>
}

export function EventsSection({ copy }) {
  return <section className="events-section paper-section">
    <SectionHeading eyebrow={copy.eyebrows.saveDates}>{copy.schedule}</SectionHeading>
    <div className="timeline" lang={copy.lang}>
      {weddingData.events.map((event, index) => {
        const e = event[copy.lang] || event.en
        return <motion.article className="event" key={event.en.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
          <div className="event-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
          <div className="event-content">
            <span className="event-date">{e.date} · {e.day}</span>
            <h3>{e.title}</h3>
            <span className="event-time">{e.time}</span>
            <p>{e.note}</p>
          </div>
        </motion.article>
      })}
    </div>
  </section>
}

export function VenueSection({ copy }) {
  return <section className="venue-section">
    <div className="venue-card">
      <MapPin size={25} strokeWidth={1.3} />
      <SectionHeading eyebrow={copy.eyebrows.welcoming}>{copy.venue}</SectionHeading>
      <h3>{copy.venueName}</h3>
      <p>{copy.venueAddress}</p>
      <a className="map-button" href={weddingData.venue.mapsUrl} target="_blank" rel="noreferrer">{copy.map}</a>
    </div>
  </section>
}

export function FamilySection({ copy }) {
  const f = weddingData.family[copy.lang] || weddingData.family.en
  return <section className="family-section paper-section" lang={copy.lang}>
    <SectionHeading eyebrow={f.eyebrow}>{f.heading}</SectionHeading>
    <div className="family-grid">
      {f.cards.map(card => <article className={`family-card stack${card.wide ? ' wide' : ''}`} key={card.title}>
        <h3>{card.title}</h3>
        <div className="family-divider" aria-hidden="true"><span>❦</span></div>
        {card.quote && <p className="family-quote">{card.quote}</p>}
        <p>{card.lines.map(line => <span className="family-name" key={line}>{line}</span>)}</p>
        {card.phones && <p className="family-phones">
          <span className="family-name">{card.phonesLabel}</span>
          <span className="family-name">{card.phones.map((num, i) => <span key={num}>{i > 0 && <i aria-hidden="true"> · </i>}<a href={`tel:+91${num.replace(/\s/g, '')}`}>{num}</a></span>)}</span>
        </p>}
        <span className="family-rose" aria-hidden="true">❀</span>
      </article>)}
    </div>
    <p className="family-note">{f.note}</p>
  </section>
}

export function Footer({ copy }) {
  return <footer className="footer">
    <div className="footer-flourish">❧</div>
    <p>{copy.closing}</p>
    <h2>{copy.footer}</h2>
    <span>MADE WITH LOVE</span>
  </footer>
}

export function MusicButton({ playing, onToggle }) {
  return <button className={`music-button ${playing ? 'playing' : ''}`} onClick={onToggle} aria-label={playing ? 'Pause music' : 'Play music'}>
    {playing ? <Music2 size={19} /> : <Music2 size={19} />}
    <span>{playing ? 'PAUSE' : 'MUSIC'}</span>
  </button>
}
