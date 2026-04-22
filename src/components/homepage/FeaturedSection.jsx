import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from '../ui/Icons'
import './FeaturedSection.css'

const FeaturedSection = ({
  moveCarousel,
  carouselDirection,
  visibleGames,
  featuredIndex,
  featuredGamesLength,
  setIsCenterHovered,
  scheduleAutoplayResume,
}) => (
  <section className="landing-featured" aria-label="Featured games carousel">
    <div className="landing-featured-shell">
      <div className="landing-featured-head">
        <div>
          <p id='featured' className="landing-featured-kicker label-xs">Featured</p>
          <h2 className="landing-featured-title heading-lg heading-hover-accent">Featured Picks</h2>
        </div>
      </div>

      <div className="landing-carousel-stage">
        <button
          type="button"
          className="landing-carousel-btn landing-carousel-btn--left"
          onClick={() => moveCarousel(-1, 'manual')}
          aria-label="Scroll featured games left"
        >
          <ChevronLeft size={18} />
        </button>

        <div className={`landing-carousel landing-carousel--${carouselDirection}`}>
          {visibleGames.map(({ game, slot }) => (
            <Link
              key={`${slot}-${game.id}-${featuredIndex}`}
              to={`/games/${game.id}`}
              target="_blank"
              rel="noreferrer"
              className={`landing-carousel-card landing-carousel-card--${slot} ${slot === 'center' ? 'landing-carousel-card--framed' : 'landing-carousel-card--side'} ${(slot === 'far-left' || slot === 'far-right') ? 'landing-carousel-card--edge' : ''}`}
              onMouseEnter={() => {
                setIsCenterHovered(true)
              }}
              onMouseLeave={() => {
                setIsCenterHovered(false)
                scheduleAutoplayResume()
              }}
            >
              <img
                src={game.thumbnail}
                alt={game.title}
                className="landing-carousel-thumb"
                loading={slot === 'center' ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={slot === 'center' ? 'high' : 'low'}
              />
              <div className="landing-carousel-meta">
                <h3>{game.title}</h3>
                <p>{game.category}</p>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="landing-carousel-btn landing-carousel-btn--right"
          onClick={() => moveCarousel(1, 'manual')}
          aria-label="Scroll featured games right"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="landing-featured-controls" aria-hidden="true">
        <span className="landing-featured-counter">
          {featuredIndex + 1} / {featuredGamesLength}
        </span>
      </div>
    </div>
  </section>
)

export default FeaturedSection
