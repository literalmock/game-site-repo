import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, Eye, Gamepad2, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { games } from '../utils/game'
import { Skiper53 } from '../components/ui/skiper-ui/skiper53'
import HeroAvatarPixelMorph from '../components/HeroAvatarPixelMorph'
import {
  CATEGORY_GENRE_CARDS,
  HERO_AVATAR_IMAGES,
  WHY_CARD_MOTION_BLUEPRINTS,
  WHY_GAMEVERSE_CARDS,
} from '../utils/homepageContent'
import './Homepage.css'
import faqItems from '../utils/faq'
const FEATURED_AUTOPLAY_RESUME_DELAY_MS = 3200

const FAQ_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
}

const FaqAccordionItem = ({ item, isOpen, onToggle }) => (
  <motion.article
    className={`landing-faq-item ${isOpen ? 'landing-faq-item--open' : ''}`}
    variants={FAQ_ITEM_VARIANTS}
  >
    <button
      type="button"
      className="landing-faq-trigger"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="landing-faq-question">{item.question}</span>
      <motion.span
        className="landing-faq-icon"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.24, ease: 'easeInOut' }}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <ChevronDown size={18} />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.div
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={{ maxHeight: 500, opacity: 1 }}
          exit={{ maxHeight: 0, opacity: 0 }}
          transition={{
            maxHeight: { duration: 0.32, ease: "easeInOut" },
            opacity: { duration: 0.24, ease: 'easeOut' },
          }}
          className="landing-faq-answer-wrap overflow-hidden"
          style={{ willChange: 'max-height, opacity' }}
        >
          <motion.p
            className="landing-faq-answer"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.04, ease: 'easeOut' }}
          >
            {item.answer}
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  </motion.article>
)

const LiveViewsCounter = memo(() => {
  const [liveViews, setLiveViews] = useState(() => Math.floor(125000 + Math.random() * 45000))
  const formattedLiveViews = useMemo(() => liveViews.toLocaleString('en-US'), [liveViews])

  useEffect(() => {
    const viewsTicker = window.setInterval(() => {
      setLiveViews((prev) => prev + Math.floor(Math.random() * 64) + 18)
    }, 2400)

    return () => window.clearInterval(viewsTicker)
  }, [])

  return (
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
  )
})

const FaqVisual = memo(({ reducedMotion }) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0, lightX: 50, lightY: 50 })
  const rafRef = useRef(null)
  const nextParallaxRef = useRef(parallax)

  const flushParallax = useCallback(() => {
    rafRef.current = null
    setParallax(nextParallaxRef.current)
  }, [])

  const handleMove = useCallback((event) => {
    if (reducedMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const relativeX = (event.clientX - bounds.left) / bounds.width
    const relativeY = (event.clientY - bounds.top) / bounds.height

    nextParallaxRef.current = {
      x: (relativeX - 0.5) * 18,
      y: (relativeY - 0.5) * 16,
      lightX: Math.round(relativeX * 100),
      lightY: Math.round(relativeY * 100),
    }

    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(flushParallax)
    }
  }, [flushParallax, reducedMotion])

  const handleLeave = useCallback(() => {
    nextParallaxRef.current = { x: 0, y: 0, lightX: 50, lightY: 50 }

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = window.requestAnimationFrame(flushParallax)
  }, [flushParallax])

  useEffect(() => () => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  return (
    <motion.div
      className="landing-faq-visual"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={reducedMotion ? false : { opacity: 0, x: -36 }}
      whileInView={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        '--faq-light-x': `${parallax.lightX}%`,
        '--faq-light-y': `${parallax.lightY}%`,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="landing-faq-visual-grid" aria-hidden="true" />
      <motion.div
        className="landing-faq-orb"
        animate={reducedMotion ? { x: 0, y: 0, rotate: 0 } : { x: parallax.x, y: parallax.y, rotate: parallax.x * 0.5 }}
        transition={{ type: 'spring', stiffness: 60, damping: 16, mass: 0.8 }}
        style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
      >
        <span className="landing-faq-orb-core" />
        <span className="landing-faq-orb-ring landing-faq-orb-ring--one" />
        <span className="landing-faq-orb-ring landing-faq-orb-ring--two" />
        <span className="landing-faq-orb-icon"><Gamepad2 size={28} /></span>
      </motion.div>
      <span className="landing-faq-particle landing-faq-particle--one" aria-hidden="true" />
      <span className="landing-faq-particle landing-faq-particle--two" aria-hidden="true" />
      <span className="landing-faq-particle landing-faq-particle--three" aria-hidden="true" />
    </motion.div>
  )
})

const Homepage = () => {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()
  const [isCompactDevice, setIsCompactDevice] = useState(() => window.matchMedia('(max-width: 899px)').matches)
  const heroSlides = useMemo(() => games.slice(0, 8), [])
  const heroTrackSlides = useMemo(() => {
    const baseSlides = isCompactDevice ? heroSlides.slice(0, 4) : heroSlides
    return [...baseSlides, ...baseSlides]
  }, [heroSlides, isCompactDevice])
  const featuredGames = useMemo(() => games.slice(0, 12), [])
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [carouselDirection, setCarouselDirection] = useState('next')
  const [isCenterHovered, setIsCenterHovered] = useState(false)
  const [isManualControlActive, setIsManualControlActive] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [whyMotionState, setWhyMotionState] = useState('hidden')
  const [isWhyInView, setIsWhyInView] = useState(false)
  const whySectionRef = useRef(null)
  const hasUserScrolledRef = useRef(false)
  const hasWhyEnteredRef = useRef(false)
  const lastScrollYRef = useRef(0)
  const manualResumeTimeoutRef = useRef(null)
  const scrollRafRef = useRef(null)

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

  const categoryGenreCards = CATEGORY_GENRE_CARDS
  const whyGameverseCards = WHY_GAMEVERSE_CARDS
  const whyCardMotionBlueprints = WHY_CARD_MOTION_BLUEPRINTS


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
    const mediaQuery = window.matchMedia('(max-width: 899px)')
    const handleChange = (event) => setIsCompactDevice(event.matches)

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
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
          setWhyMotionState((prev) => (prev === 'in' ? prev : 'in'))
          return
        }

        if (entry.boundingClientRect.top > window.innerHeight * 0.85) {
          setWhyMotionState((prev) => (prev === 'hidden' ? prev : 'hidden'))
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
    const evaluateWhyMotionState = () => {
      const section = whySectionRef.current
      if (!section) return

      hasUserScrolledRef.current = true

      const rect = section.getBoundingClientRect()
      const currentY = window.scrollY
      const isScrollingDown = currentY > lastScrollYRef.current

      let nextState = null

      if (isWhyInView) {
        nextState = 'in'
      } else if (hasWhyEnteredRef.current && isScrollingDown && rect.bottom < window.innerHeight * 0.15) {
        nextState = 'scatter'
      } else if (rect.top > window.innerHeight * 0.85) {
        nextState = 'hidden'
      }

      if (nextState) {
        setWhyMotionState((prev) => (prev === nextState ? prev : nextState))
      }

      lastScrollYRef.current = currentY
    }

    const onScroll = () => {
      if (scrollRafRef.current !== null) return

      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null
        evaluateWhyMotionState()
      })
    }

    evaluateWhyMotionState()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current)
        scrollRafRef.current = null
      }

      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isWhyInView])

  return (
    <>
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
              <li><strong>{games.length}+</strong> Titles</li>
              <li><strong>24/7</strong> Live Updates</li>
              <li><strong>4K</strong> Ready Visuals</li>
            </ul>
          </div>

          <aside className="landing-hero-side" aria-label="Genre spotlight panel">
            <div className="landing-hero-avatar-wrap" aria-hidden="true">
              <HeroAvatarPixelMorph imageUrls={HERO_AVATAR_IMAGES} reducedMotion={shouldReduceMotion} />
            </div>

            <LiveViewsCounter />
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
                    loading={slot === 'center' ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={slot === 'center' ? 'high' : 'low'}
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
            Hover each row to preview a lane, or tap to expand and explore your next session mood.
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
                  animate={shouldReduceMotion ? 'in' : whyMotionState}
                  whileHover={shouldReduceMotion ? undefined : {
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
          <div className="landing-faq-split">
            <FaqVisual reducedMotion={shouldReduceMotion} />

            <div className="landing-faq-content">
              <p className="landing-faq-kicker label-xs">FAQ</p>
              <h2 className="landing-faq-title heading-lg heading-hover-accent">Frequently Asked Questions</h2>
              <p className="landing-faq-subtitle text-body heading-paragraph-gap">Everything you need to know about GamerVerse</p>

              <motion.div
                className="landing-faq-list"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {faqItems.map((item, index) => {
                  const isOpen = openFaqIndex === index

                  return (
                    <FaqAccordionItem
                      key={item.question}
                      item={item}
                      isOpen={isOpen}
                      onToggle={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    />
                  )
                })}
              </motion.div>
            </div>
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
