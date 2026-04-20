import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { games } from '../utils/game'
import { CATEGORY_GENRE_CARDS, WHY_GAMEVERSE_CARDS } from '../utils/homepageContent'
import faqItems from '../utils/faq'
import HeroSection from '../components/homepage/HeroSection'
import FeaturedSection from '../components/homepage/FeaturedSection'
import CategoriesSection from '../components/homepage/CategoriesSection'
import WhySection from '../components/homepage/WhySection'
import FaqSection from '../components/homepage/FaqSection'
import NewsletterSection from '../components/homepage/NewsletterSection'

const FEATURED_AUTOPLAY_RESUME_DELAY_MS = 3200

const Homepage = () => {
  const navigate = useNavigate()
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)
  const [isCompactDevice, setIsCompactDevice] = useState(() => window.matchMedia('(max-width: 899px)').matches)
  const lowPowerMode = shouldReduceMotion || isCompactDevice

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

  const whySectionRef = useRef(null)
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setShouldReduceMotion(event.matches)

    setShouldReduceMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', onChange)

    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 899px)')
    const handleChange = (event) => setIsCompactDevice(event.matches)

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => () => {
    if (manualResumeTimeoutRef.current) {
      window.clearTimeout(manualResumeTimeoutRef.current)
    }
  }, [])

  const visibleGames = useMemo(() => {
    if (featuredGames.length === 0) return []

    if (isCompactDevice) {
      return [{ game: featuredGames[featuredIndex], slot: 'center' }]
    }

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
  }, [featuredGames, featuredIndex, isCompactDevice])

  const handleDiscoverGenreClick = useCallback((genre) => {
    navigate(`/games?genre=${encodeURIComponent(genre)}`)
  }, [navigate])

  useEffect(() => {
    if (lowPowerMode || isCenterHovered || isManualControlActive) {
      return undefined
    }

    const autoplayId = window.setInterval(() => {
      moveCarousel(1)
    }, 2200)

    return () => window.clearInterval(autoplayId)
  }, [isCenterHovered, isManualControlActive, lowPowerMode, moveCarousel])

  useEffect(() => {
    const section = whySectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.35

        if (inView) {
          setWhyMotionState((prev) => (prev === 'in' ? prev : 'in'))
          return
        }

        // Reset to hidden only when the section is below the viewport.
        // This allows replaying the reveal when user scrolls back down.
        if (entry.boundingClientRect.top > window.innerHeight * 0.92) {
          setWhyMotionState((prev) => (prev === 'hidden' ? prev : 'hidden'))
        }
      },
      {
        threshold: [0, 0.2, 0.35, 0.55],
        rootMargin: '0px 0px -12% 0px',
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <HeroSection heroTrackSlides={heroTrackSlides} gamesCount={games.length} lowPowerMode={lowPowerMode} />

      <FeaturedSection
        moveCarousel={moveCarousel}
        carouselDirection={carouselDirection}
        visibleGames={visibleGames}
        featuredIndex={featuredIndex}
        featuredGamesLength={featuredGames.length}
        setIsCenterHovered={setIsCenterHovered}
        scheduleAutoplayResume={scheduleAutoplayResume}
      />

      <CategoriesSection
        categoryGenreCards={CATEGORY_GENRE_CARDS}
        onDiscoverGenre={handleDiscoverGenreClick}
      />

      <WhySection
        shouldReduceMotion={shouldReduceMotion}
        whyMotionState={whyMotionState}
        whySectionRef={whySectionRef}
        whyGameverseCards={WHY_GAMEVERSE_CARDS}
      />

      <FaqSection
        shouldReduceMotion={shouldReduceMotion}
        faqItems={faqItems}
        openFaqIndex={openFaqIndex}
        setOpenFaqIndex={setOpenFaqIndex}
      />

      <NewsletterSection />
    </>
  )
}

export default Homepage
