import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Brain, ChevronDown, ChevronLeft, ChevronRight, Eye, Gamepad2, Gem, MonitorSmartphone, Rocket, Sparkles, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { games } from '../utils/game'
import { Skiper53 } from '../components/ui/skiper-ui/skiper53'
import HeroAvatarPixelMorph from '../components/HeroAvatarPixelMorph'
import './Homepage.css'
import faqItems from '../utils/faq'
const FEATURED_AUTOPLAY_RESUME_DELAY_MS = 3200
const HERO_AVATAR_IMAGES = ['/avatars/charac1.png', '/avatars/charac2.png', '/avatars/charac3.png', '/avatars/charac4.png']

const Homepage = () => {
  const navigate = useNavigate()
  const heroSlides = useMemo(() => games.slice(0, 8), [])
  const featuredGames = useMemo(() => games.slice(0, 12), [])
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [carouselDirection, setCarouselDirection] = useState('next')
  const [isCenterHovered, setIsCenterHovered] = useState(false)
  const [isManualControlActive, setIsManualControlActive] = useState(false)
  const [liveViews, setLiveViews] = useState(() => Math.floor(125000 + Math.random() * 45000))
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [whyMotionState, setWhyMotionState] = useState('hidden')
  const [isWhyInView, setIsWhyInView] = useState(false)
  const whySectionRef = useRef(null)
  const hasUserScrolledRef = useRef(false)
  const hasWhyEnteredRef = useRef(false)
  const lastScrollYRef = useRef(0)
  const manualResumeTimeoutRef = useRef(null)

  const scheduleAutoplayResume = useCallback(() => {
    setIsManualControlActive(true)

    if (manualResumeTimeoutRef.current) {
      window.clearTimeout(manualResumeTimeoutRef.current)
    }

    manualResumeTimeoutRef.current = window.setTimeout(() => {
      setIsManualControlActive(false)
      manualResumeTimeoutRef.current = null
    }, FEATURED_AUTOPLAY_RESUME_DELAY_MS)
  }, [])

  const moveCarousel = useCallback((direction, source = 'auto') => {
    if (source === 'manual') {
      scheduleAutoplayResume()
    }

    setCarouselDirection(direction > 0 ? 'next' : 'prev')
    setFeaturedIndex((prev) => (prev + direction + featuredGames.length) % featuredGames.length)
  }, [featuredGames.length, scheduleAutoplayResume])

  useEffect(() => () => {
    if (manualResumeTimeoutRef.current) {
      window.clearTimeout(manualResumeTimeoutRef.current)
    }
  }, [])

  const visibleGames = useMemo(() => {
    if (featuredGames.length === 0) return []

    const farLeftIndex = (featuredIndex - 2 + featuredGames.length) % featuredGames.length
    const prevIndex = (featuredIndex - 1 + featuredGames.length) % featuredGames.length
    const nextIndex = (featuredIndex + 1) % featuredGames.length
    const farRightIndex = (featuredIndex + 2) % featuredGames.length

    return [
      { game: featuredGames[farLeftIndex], slot: 'far-left' },
      { game: featuredGames[prevIndex], slot: 'left' },
      { game: featuredGames[featuredIndex], slot: 'center' },
      { game: featuredGames[nextIndex], slot: 'right' },
      { game: featuredGames[farRightIndex], slot: 'far-right' },
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

  const whyGameverseCards = useMemo(() => ([
    {
      icon: Zap,
      title: 'Instant Play',
      points: [
        'No downloads required',
        'Play directly in browser',
        'Fast loading optimized games',
      ],
    },
    {
      icon: Gamepad2,
      title: 'Curated Game Library',
      points: [
        'Only high-quality games',
        'No spam or low-quality clutter',
        'Handpicked experience',
      ],
    },
    {
      icon: Brain,
      title: 'Smart Recommendations',
      points: [
        'Personalized games by user interest',
        'You may also like suggestions',
        'Context-aware discovery',
      ],
    },
    {
      icon: MonitorSmartphone,
      title: 'Cross Platform',
      points: [
        'Works on mobile and tablet',
        'Perfect on desktop screens',
        'Same experience everywhere',
      ],
    },
    {
      icon: Gem,
      title: 'Clean UI Experience',
      points: [
        'No distractions',
        'Smooth animations',
        'Gamer-first design',
      ],
    },
    {
      icon: Rocket,
      title: 'Fast Performance',
      points: [
        'Optimized assets',
        'Lightweight UI',
        'Smooth gameplay',
      ],
    },
  ]), [])

  const whyCardMotionBlueprints = useMemo(() => ([
    { hidden: { x: -130, y: 0 }, scatter: { x: -190, y: -96, rotate: -14 } },
    { hidden: { x: 130, y: 0 }, scatter: { x: 178, y: -118, rotate: 12 } },
    { hidden: { x: 0, y: 104 }, scatter: { x: -148, y: 136, rotate: -10 } },
    { hidden: { x: 0, y: -104 }, scatter: { x: 172, y: 122, rotate: 14 } },
    { hidden: { x: -96, y: 42 }, scatter: { x: -34, y: 178, rotate: -9 } },
    { hidden: { x: 96, y: 42 }, scatter: { x: 142, y: 154, rotate: 11 } },
  ]), [])


  const formattedLiveViews = useMemo(() => liveViews.toLocaleString('en-US'), [liveViews])


  const handleDiscoverGenreClick = useCallback((genre) => {
    navigate(`/games?genre=${encodeURIComponent(genre)}`)
  }, [navigate])

  useEffect(() => {
    if (isCenterHovered || isManualControlActive) {
      return undefined
    }

    const autoplayId = window.setInterval(() => {
      moveCarousel(1)
    }, 2200)

    return () => window.clearInterval(autoplayId)
  }, [isCenterHovered, isManualControlActive, moveCarousel])

  useEffect(() => {
    const viewsTicker = window.setInterval(() => {
      setLiveViews((prev) => prev + Math.floor(Math.random() * 64) + 18)
    }, 1400)

    return () => window.clearInterval(viewsTicker)
  }, [])

  useEffect(() => {
    const section = whySectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.2
        setIsWhyInView(inView)

        if (!hasUserScrolledRef.current) {
          return
        }

        if (inView) {
          hasWhyEnteredRef.current = true
          setWhyMotionState('in')
          return
        }

        if (entry.boundingClientRect.top > window.innerHeight * 0.85) {
          setWhyMotionState('hidden')
        }
      },
      {
        threshold: [0, 0.2, 0.45],
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const section = whySectionRef.current
      if (!section) return

      hasUserScrolledRef.current = true

      const rect = section.getBoundingClientRect()
      const currentY = window.scrollY
      const isScrollingDown = currentY > lastScrollYRef.current

      if (isWhyInView) {
        setWhyMotionState('in')
      } else if (hasWhyEnteredRef.current && isScrollingDown && rect.bottom < window.innerHeight * 0.15) {
        setWhyMotionState('scatter')
      } else if (rect.top > window.innerHeight * 0.85) {
        setWhyMotionState('hidden')
      }

      lastScrollYRef.current = currentY
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isWhyInView])

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
              <li><strong>{games.length}+</strong> Titles</li>
              <li><strong>24/7</strong> Live Updates</li>
              <li><strong>4K</strong> Ready Visuals</li>
            </ul>
          </div>

          <aside className="landing-hero-side" aria-label="Genre spotlight panel">
            <div className="landing-hero-avatar-wrap" aria-hidden="true">
              <HeroAvatarPixelMorph imageUrls={HERO_AVATAR_IMAGES} />
            </div>

            <div className="landing-hero-live-counter" aria-label="Live views counter">
              <span className="landing-hero-live-label">
                <Eye size={14} />
                Live Views
              </span>
              <motion.span
                key={liveViews}
                initial={{ opacity: 0.35, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="landing-hero-live-value"
              >
                {formattedLiveViews}
              </motion.span>
            </div>
          </aside>
        </div>
      </section>

      <section className="landing-featured" aria-label="Featured games carousel">
        <div className="landing-featured-shell">
          <div className="landing-featured-head">
            <div>
              <p className="landing-featured-kicker label-xs">Featured</p>
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
                <a
                  key={`${slot}-${game.id}-${featuredIndex}`}
                  href={game.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`landing-carousel-card landing-carousel-card--${slot} ${slot === 'center' ? 'landing-carousel-card--framed' : 'landing-carousel-card--side'} ${(slot === 'far-left' || slot === 'far-right') ? 'landing-carousel-card--edge' : ''}`}
                  onMouseEnter={() => {
                    if (slot === 'center') {
                      setIsCenterHovered(true)
                    }
                  }}
                  onMouseLeave={() => {
                    if (slot === 'center') {
                      setIsCenterHovered(false)
                      scheduleAutoplayResume()
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
          <p className="landing-categories-kicker label-xs">Discover By Style</p>
          <h2 className="landing-categories-title heading-lg heading-hover-accent">Categories And Genres</h2>
          <p className="landing-categories-subtitle text-body heading-paragraph-gap">
            Hover each row to preview a lane and find your next session mood.
          </p>

          <Skiper53
            items={categoryGenreCards}
            className="landing-categories-skiper"
            onItemClick={(item) => handleDiscoverGenreClick(item.title ?? item.code)}
          />
        </div>
      </section>

      <section
        ref={whySectionRef}
        className="landing-why"
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
              const motionBlueprint = whyCardMotionBlueprints[index % whyCardMotionBlueprints.length]
              const cardVariants = {
                hidden: {
                  opacity: 0,
                  x: motionBlueprint.hidden.x,
                  y: motionBlueprint.hidden.y,
                  rotate: 0,
                  scale: 1.08,
                  filter: 'blur(4px)',
                },
                in: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.82,
                    ease: [0.22, 0.67, 0.2, 1],
                    delay: index * 0.09,
                  },
                },
                scatter: {
                  opacity: 0,
                  x: motionBlueprint.scatter.x,
                  y: motionBlueprint.scatter.y,
                  rotate: motionBlueprint.scatter.rotate,
                  scale: 1.14,
                  filter: 'blur(5px)',
                  transition: {
                    duration: 0.62,
                    ease: [0.4, 0, 0.2, 1],
                    delay: index * 0.035,
                  },
                },
              }

              return (
                <motion.div
                  key={item.title}
                  className="landing-why-card"
                  variants={cardVariants}
                  initial="hidden"
                  animate={whyMotionState}
                  whileHover={{
                    scale: 1.035,
                    borderColor: 'rgba(126, 230, 255, 0.82)',
                    boxShadow: '0 0 0 1px rgba(129, 232, 255, 0.34), 0 20px 34px rgba(2, 10, 25, 0.5)',
                  }}
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
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      <section className="landing-faq" aria-label="Frequently asked questions">
        <div className="landing-faq-shell">
          <p className="landing-faq-kicker label-xs">FAQ</p>
          <h2 className="landing-faq-title heading-lg heading-hover-accent">Frequently Asked Questions</h2>
          <p className="landing-faq-subtitle text-body heading-paragraph-gap">Everything you need to know about GamerVerse</p>

          <div className="landing-faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index

              return (
                <motion.article
                  key={item.question}
                  className={`landing-faq-item ${isOpen ? 'landing-faq-item--open' : ''}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.48, ease: 'easeOut', delay: index * 0.08 }}
                >
                  <button
                    type="button"
                    className="landing-faq-trigger"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="landing-faq-question">{item.question}</span>
                    <motion.span
                      className="landing-faq-icon"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: 'easeInOut' }}
                        className="landing-faq-answer-wrap"
                      >
                        <p className="landing-faq-answer">{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>
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

    </>

  )
}

export default Homepage
