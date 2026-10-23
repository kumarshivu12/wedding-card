import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Music2 } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { weddingData } from '../data/weddingData'
import { useCountdown } from '../hooks/useCountdown'

export function WelcomeSection({ copy }) {
  return <section className="paper-section welcome-section" id="welcome">
    <div className="ornate-frame">
      <span className="arabic dark-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
      <SectionHeading eyebrow="AN INVITATION FROM OUR FAMILIES">{copy.welcome}</SectionHeading>
      <p className="invitation-copy">{copy.welcomeText}</p>
      <div className="signature">{weddingData.couple.groom} &amp; {weddingData.couple.bride}</div>
    </div>
  </section>
}

export function BlessedSection({ copy }) {
  const [revealed, setRevealed] = useState(false)
  return <section className="blessed-section paper-section">
    <SectionHeading eyebrow="A MOMENT TO REMEMBER">{copy.blessed}</SectionHeading>
    <motion.button className={`heart-reveal ${revealed ? 'revealed' : ''}`} onClick={() => setRevealed(v => !v)} whileTap={{ scale: 0.94 }} aria-label="Reveal wedding date">
      <Heart size={35} strokeWidth={1.2} fill={revealed ? 'currentColor' : 'none'} />
      <span>{revealed ? weddingData.couple.displayDate : 'S & S'}</span>
    </motion.button>
    <p className="muted">{revealed ? 'A date to cherish forever' : copy.reveal}</p>
  </section>
}

export function CountdownSection({ copy }) {
  const time = useCountdown(weddingData.couple.weddingDate)
  const values = [['DAYS', time.days], ['HOURS', time.hours], ['MINUTES', time.minutes], ['SECONDS', time.seconds]]
  return <section className="countdown-section">
    <SectionHeading eyebrow="THE BIG DAY">{copy.countdown}</SectionHeading>
    <div className="countdown-grid">
      {values.map(([label, value]) => <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
    </div>
    {time.complete && <p className="muted">The celebration has begun!</p>}
  </section>
}

export function EventsSection({ copy }) {
  return <section className="events-section paper-section">
    <SectionHeading eyebrow="SAVE THE DATES">{copy.schedule}</SectionHeading>
    <div className="timeline">
      {weddingData.events.map((event, index) => <motion.article className="event" key={`${event.title}-${index}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
        <div className="event-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
        <div className="event-content">
          <span className="event-date">{event.date} · {event.day}</span>
          <h3>{event.title}</h3>
          <span className="event-time">{event.time}</span>
          <p>{event.note}</p>
        </div>
      </motion.article>)}
    </div>
  </section>
}

export function VenueSection({ copy }) {
  return <section className="venue-section">
    <div className="venue-card">
      <MapPin size={25} strokeWidth={1.3} />
      <SectionHeading eyebrow="WE LOOK FORWARD TO WELCOMING YOU">{copy.venue}</SectionHeading>
      <h3>{weddingData.venue.name}</h3>
      <p>{weddingData.venue.address}</p>
      <a className="map-button" href={weddingData.venue.mapsUrl} target="_blank" rel="noreferrer">{copy.map}</a>
    </div>
  </section>
}

export function FamilySection() {
  return <section className="family-section paper-section">
    <SectionHeading eyebrow="WITH LOVE AND BLESSINGS">Our Family</SectionHeading>
    <div className="family-grid">
      {weddingData.acknowledgements.map(item => <article className={`family-card ${item.inline ? 'inline' : 'stack'}`} key={item.title}>
        <h3>{item.title}</h3>
        <div className="family-divider" aria-hidden="true"><span>❦</span></div>
        <p>{item.names.map((n, i) => <span className="family-name" key={i}>{n}</span>)}</p>
        <span className="family-rose" aria-hidden="true">❀</span>
      </article>)}
    </div>
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
