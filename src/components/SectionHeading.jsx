export default function SectionHeading({ eyebrow, children }) {
  return (
    <div className="section-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{children}</h2>
      <div className="ornament"><span>✦</span></div>
    </div>
  )
}
