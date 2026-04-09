import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { games } from '../utils/game'
import { Skiper53 } from '../components/ui/skiper-ui/skiper53'
import './LandingPage.css'

const Homepage = () => {
  const heroSlides = useMemo(() => games.slice(0, 8), [])
  const featuredGames = useMemo(() => games.slice(0, 12), [])
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [carouselDirection, setCarouselDirection] = useState('next')
  const [isCenterHovered, setIsCenterHovered] = useState(false)
  const [isManualControlActive, setIsManualControlActive] = useState(false)

  const moveCarousel = useCallback((direction, source = 'auto') => {
    if (source === 'manual') {
      setIsManualControlActive(true)
    }

    setCarouselDirection(direction > 0 ? 'next' : 'prev')
    setFeaturedIndex((prev) => (prev + direction + featuredGames.length) % featuredGames.length)
  }, [featuredGames.length])

  const visibleGames = useMemo(() => {
    if (featuredGames.length === 0) return []

    const prevIndex = (featuredIndex - 1 + featuredGames.length) % featuredGames.length
    const nextIndex = (featuredIndex + 1) % featuredGames.length

    return [
      { game: featuredGames[prevIndex], slot: 'left' },
      { game: featuredGames[featuredIndex], slot: 'center' },
      { game: featuredGames[nextIndex], slot: 'right' },
    ]
  }, [featuredGames, featuredIndex])

  const categoryGenreCards = useMemo(() => {
    const genreMap = {
      Action: 'Combat Focus',
      Shooter: 'High Tempo FPS',
      RPG: 'Open World Journey',
      Adventure: 'Story Rich Quests',
      Platformer: 'Precision Movement',
      Horror: 'Atmospheric Survival',
      Strategy: 'Tactical Thinking',
    }

    const genreImageFiles = [
      'category01.jpg',
      'category02.webp',
      'category03.jpg',
      '05733b4621e4d2512e3bd63d7d385567.jpg',
      '0bdd40f5859584f8f8e7389ff56c2f64.jpg',
      '7be12ecab9933374bc4ca3048c1d2223.jpg',
      'ac1366f33d60eb9f8cffd8667d7b3224.jpg',
      'd42d687c511d6b0365f57b7c477e10ac.jpg',
    ]

    return Object.entries(genreMap).map(([category, genre], index) => ({
      src: `/genres/${genreImageFiles[index % genreImageFiles.length]}`,
      alt: `${category} category artwork`,
      title: category,
      code: genre,
    }))
  }, [])

  useEffect(() => {
    if (isCenterHovered || isManualControlActive) {
      return undefined
    }

    const autoplayId = window.setInterval(() => {
      moveCarousel(1)
    }, 2200)

    return () => window.clearInterval(autoplayId)
  }, [isCenterHovered, isManualControlActive, moveCarousel])

  return (
    <>
      <section className="landing-hero">
        <div className="landing-hero-bg" aria-hidden="true">
          <div className="landing-track">
            {[...heroSlides, ...heroSlides].map((game, index) => (
              <article className="landing-bg-card" key={`${game.id}-${index}`}>
                <img src={game.thumbnail} alt="" className="landing-bg-image" />
              </article>
            ))}
          </div>
        </div>

        <div className="landing-overlay" />

        <div className="landing-content-shell">
          <div className="landing-copy-wrap">
            <p className="landing-kicker">
              <Sparkles size={14} />
              GAMEVERSE GAMING HUB
            </p>

            <h1 className="landing-title">
              Discover Worlds.
              <span>Compete Hard.</span>
              Play Everywhere.
            </h1>

            <p className="landing-subtitle">
              Jump into curated titles, trending drops, and community favorites in one cinematic launcher.
            </p>

            <div className="landing-cta-row">
              <Link to="/games" className="landing-cta-primary">Explore Library</Link>
              <Link to="/signup" className="landing-cta-secondary">Create Free Account</Link>
            </div>

            <ul className="landing-stats">
              <li><strong>{games.length}+</strong> Titles</li>
              <li><strong>24/7</strong> Live Updates</li>
              <li><strong>4K</strong> Ready Visuals</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="landing-featured" aria-label="Featured games carousel">
        <div className="landing-featured-shell">
          <div className="landing-featured-head">
            <div>
              <p className="landing-featured-kicker">Featured Picks</p>
              <h2 className="landing-featured-title">Hero Carousel</h2>
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
              {visibleGames.map(({ game, slot }, index) => (
                <a
                  key={`${slot}-${game.id}-${featuredIndex}`}
                  href={game.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`landing-carousel-card landing-carousel-card--${slot} ${slot === 'center' ? 'landing-carousel-card--framed' : 'landing-carousel-card--side'}`}
                  onMouseEnter={() => {
                    if (slot === 'center') {
                      setIsCenterHovered(true)
                    }
                  }}
                  onMouseLeave={() => {
                    if (slot === 'center') {
                      setIsCenterHovered(false)
                      setIsManualControlActive(false)
                    }
                  }}
                >
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="landing-carousel-thumb"
                  />
                  <div className="landing-carousel-meta">
                    <h3>{game.title}</h3>
                    <p>{game.category}</p>
                  </div>
                </a>
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
              {featuredIndex + 1} / {featuredGames.length}
            </span>
          </div>
        </div>
      </section>

      <section className="landing-categories" aria-label="Categories and genres">
        <div className="landing-categories-shell">
          <p className="landing-categories-kicker">Discover By Style</p>
          <h2 className="landing-categories-title">Categories And Genres</h2>
          <p className="landing-categories-subtitle">
            Hover each row to preview a lane and find your next session mood.
          </p>

          <Skiper53 items={categoryGenreCards} className="landing-categories-skiper" />
        </div>
      </section>
    </>

  )
}

export default Homepage
