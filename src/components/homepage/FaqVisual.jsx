import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Gamepad2 } from '../ui/Icons'

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
    <div
      className="landing-faq-visual landing-faq-visual-enter"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        '--faq-light-x': `${parallax.lightX}%`,
        '--faq-light-y': `${parallax.lightY}%`,
      }}
    >
      <div className="landing-faq-visual-grid" aria-hidden="true" />
      <div
        className="landing-faq-orb"
        style={{
          transform: reducedMotion
            ? 'translate3d(0px, 0px, 0px) rotate(0deg)'
            : `translate3d(${parallax.x}px, ${parallax.y}px, 0px) rotate(${parallax.x * 0.5}deg)`,
          transition: 'transform 220ms ease-out',
        }}
      >
        <span className="landing-faq-orb-core" />
        <span className="landing-faq-orb-ring landing-faq-orb-ring--one" />
        <span className="landing-faq-orb-ring landing-faq-orb-ring--two" />
        <span className="landing-faq-orb-icon"><Gamepad2 size={28} /></span>
      </div>
      <span className="landing-faq-particle landing-faq-particle--one" aria-hidden="true" />
      <span className="landing-faq-particle landing-faq-particle--two" aria-hidden="true" />
      <span className="landing-faq-particle landing-faq-particle--three" aria-hidden="true" />
    </div>
  )
})

FaqVisual.displayName = 'FaqVisual'

export default FaqVisual
