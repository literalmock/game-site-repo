import { memo, useEffect, useMemo, useState } from 'react'
import { Eye } from '../ui/Icons'

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
      <span key={liveViews} className="landing-hero-live-value landing-live-value-pop">
        {formattedLiveViews}
      </span>
    </div>
  )
})

LiveViewsCounter.displayName = 'LiveViewsCounter'

export default LiveViewsCounter
