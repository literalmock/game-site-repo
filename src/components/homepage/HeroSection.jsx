import { Sparkles } from '../ui/Icons'
import { Link } from 'react-router-dom'
import HeroAvatarRotator from '../HeroAvatarRotator'
import LiveViewsCounter from './LiveViewsCounter'
import { HERO_AVATAR_IMAGES } from '../../utils/homepageContent'
import './HeroSection.css'

const HeroSection = ({ heroTrackSlides, gamesCount, lowPowerMode }) => (
  <section className="landing-hero">
    <div className="landing-hero-bg" aria-hidden="true">
      <div className="landing-track">
        {heroTrackSlides.map((game, index) => (
          <article className="landing-bg-card" key={`${game.id}-${index}`}>
            <img src={game.thumbnail} alt="" className="landing-bg-image" loading="lazy" decoding="async" fetchPriority="low" />
          </article>
        ))}
      </div>
    </div>

    <div className="landing-overlay" />

    <div className="landing-content-shell">
      <div className="landing-copy-wrap">
        <p className="landing-kicker label-xs text-animate-fade-up">
          <Sparkles size={14} />
          GAMEVERSE GAMING HUB
        </p>

        <h1 className="landing-title heading-xl text-animate-fade-up">
          Discover Worlds.
          <span>Compete Hard.</span>
          Play Everywhere.
        </h1>

        <p className="landing-subtitle text-body heading-paragraph-gap text-animate-fade-up">
          Jump into curated titles, trending drops, and community favorites in one cinematic launcher.
        </p>

        <div className="landing-cta-row">
          <Link to="/games" className="landing-cta-primary">Explore Library</Link>
          <Link to="/signup" className="landing-cta-secondary">Create Free Account</Link>
        </div>

        <ul className="landing-stats">
          <li><strong>{gamesCount}+</strong> Titles</li>
          <li><strong>24/7</strong> Live Updates</li>
          <li><strong>4K</strong> Ready Visuals</li>
        </ul>
      </div>

      <aside className="landing-hero-side" aria-label="Genre spotlight panel">
        <div className="landing-hero-avatar-wrap" aria-hidden="true">
          <HeroAvatarRotator imageUrls={HERO_AVATAR_IMAGES} reducedMotion={lowPowerMode} />
        </div>

        <LiveViewsCounter />
      </aside>
    </div>
  </section>
)

export default HeroSection
