import { memo } from 'react'
import { Gamepad2 } from '../ui/Icons'

const FaqVisual = memo(({ reducedMotion }) => {
  return (
    <div className={`landing-faq-visual landing-faq-visual-enter ${reducedMotion ? 'landing-faq-visual--still' : ''}`}>
      <div className="landing-faq-visual-grid" aria-hidden="true" />
      <div className="landing-faq-orb">
        <span className="landing-faq-orb-core" />
        <span className="landing-faq-orb-icon"><Gamepad2 size={28} /></span>
      </div>
    </div>
  )
})

FaqVisual.displayName = 'FaqVisual'

export default FaqVisual
