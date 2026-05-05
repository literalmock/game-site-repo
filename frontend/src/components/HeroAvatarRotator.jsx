import { useEffect, useMemo, useState } from 'react'
import './HeroAvatarRotator.css'

const AVATAR_SWAP_INTERVAL_MS = 2600

const HeroAvatarRotator = ({ imageUrls, reducedMotion = false }) => {
	const safeImageUrls = useMemo(
		() => (Array.isArray(imageUrls) ? imageUrls.filter(Boolean) : []),
		[imageUrls],
	)
	const [activeIndex, setActiveIndex] = useState(0)
	const fallbackImage = safeImageUrls.length > 0 ? safeImageUrls[0] : ''

	useEffect(() => {
		if (reducedMotion || safeImageUrls.length <= 1) {
			setActiveIndex(0)
			return undefined
		}

		const intervalId = window.setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % safeImageUrls.length)
		}, AVATAR_SWAP_INTERVAL_MS)

		return () => window.clearInterval(intervalId)
	}, [reducedMotion, safeImageUrls])

	const activeImage = safeImageUrls[activeIndex] || fallbackImage

	return (
		<div className="hero-avatar-rotator" aria-hidden="true">
			<img
				key={activeImage}
				src={activeImage}
				alt=""
				className="hero-avatar-rotator-image"
				loading="eager"
				decoding="async"
			/>
		</div>
	)
}

export default HeroAvatarRotator