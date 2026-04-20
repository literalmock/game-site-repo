import './WhySection.css'

const WhySection = ({ shouldReduceMotion, whyMotionState, whySectionRef, whyGameverseCards }) => (
  <section
    ref={whySectionRef}
    className={`landing-why landing-why--${shouldReduceMotion ? 'in' : whyMotionState}`}
    aria-label="Why Gameverse benefits"
  >
    <div className="landing-why-shell">
      <p className="landing-why-kicker">Why GamerVerse?</p>
      <h2 className="landing-why-title heading-lg heading-hover-accent">Because gaming isn&apos;t just play - it&apos;s an experience.</h2>
      <p className="landing-why-subtitle text-body heading-paragraph-gap">
        Discover a platform built for speed, quality, and consistency across every device.
      </p>

      <div className="landing-why-grid">
        {whyGameverseCards.map((item, index) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="landing-why-card"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="landing-why-icon-wrap">
                <Icon size={18} />
              </div>
              <h3 className="landing-why-card-title">{item.title}</h3>
              <ul className="landing-why-card-list">
                {item.points.map((point) => (
                  <li key={point} className="landing-why-card-desc">{point}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

export default WhySection
