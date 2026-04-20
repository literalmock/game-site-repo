import './NewsletterSection.css'

const NewsletterSection = () => (
  <section className="landing-newsletter-cta" aria-label="Newsletter signup">
    <div className="landing-newsletter-shell">
      <p className="landing-newsletter-kicker label-xs">Stay In The Loop</p>
      <h2 className="landing-newsletter-title heading-lg heading-hover-accent">Get latest games and weekly launches</h2>
      <p className="landing-newsletter-subtitle text-body heading-paragraph-gap">
        Join the Gameverse newsletter for curated drops, early highlights, and weekly launch alerts.
      </p>

      <div className="landing-newsletter-roll" aria-hidden="true">
        <span className="landing-newsletter-roll-item">Trending Drops</span>
        <span className="landing-newsletter-roll-item">Weekly Launches</span>
        <span className="landing-newsletter-roll-item">Fresh Indie Picks</span>
        <span className="landing-newsletter-roll-item">Editor Curated Lists</span>
      </div>

      <form className="landing-newsletter-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          className="landing-newsletter-input"
          placeholder="Enter your email"
          aria-label="Email for newsletter"
        />
        <button type="submit" className="landing-newsletter-btn">Notify Me</button>
      </form>
    </div>
  </section>
)

export default NewsletterSection
