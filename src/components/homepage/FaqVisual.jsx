import { memo, useCallback } from 'react'

const FaqVisual = memo(({ reducedMotion }) => {
  const handleMouseMove = useCallback((event) => {
    if (reducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5

    event.currentTarget.style.setProperty('--faq-mouse-x', `${offsetX * 24}px`)
    event.currentTarget.style.setProperty('--faq-mouse-y', `${offsetY * 18}px`)
    event.currentTarget.style.setProperty('--faq-tilt-x', `${offsetY * -6}deg`)
    event.currentTarget.style.setProperty('--faq-tilt-y', `${offsetX * 8}deg`)
  }, [reducedMotion])

  const handleMouseLeave = useCallback((event) => {
    event.currentTarget.style.setProperty('--faq-mouse-x', '0px')
    event.currentTarget.style.setProperty('--faq-mouse-y', '0px')
    event.currentTarget.style.setProperty('--faq-tilt-x', '0deg')
    event.currentTarget.style.setProperty('--faq-tilt-y', '0deg')
  }, [])

  return (
    <div
      className={`landing-faq-visual landing-faq-visual-enter ${reducedMotion ? 'landing-faq-visual--still' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="landing-faq-visual-grid" aria-hidden="true" />
      <div className="landing-faq-left" aria-hidden="true">
        <div className="landing-faq-controller-orb landing-faq-controller-orb--one" />
        <div className="landing-faq-controller-orb landing-faq-controller-orb--two" />
        <div className={`landing-faq-controller-wrap ${reducedMotion ? 'landing-faq-controller-wrap--still' : ''}`}>
          <img
            src="/images/controller.webp"
            alt=""
            className={`landing-faq-controller ${reducedMotion ? 'landing-faq-controller--still' : ''}`}
          />
        </div>
      </div>
    </div>
  )
})

FaqVisual.displayName = 'FaqVisual'

export default FaqVisual
