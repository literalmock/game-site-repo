import { useEffect, useRef } from 'react'
import { PixelMorphAnimator } from '../utils/pixelMorphAnimator'
import './HeroAvatarPixelMorph.css'

const HeroAvatarPixelMorph = ({ imageUrls }) => {
	const canvasRef = useRef(null)

	useEffect(() => {
		if (!canvasRef.current || !Array.isArray(imageUrls) || imageUrls.length === 0) {
			return undefined
		}

		const animator = new PixelMorphAnimator({
			canvas: canvasRef.current,
			imageUrls,
			durationMs: 1680,
			minIntervalMs: 1200,
			maxIntervalMs: 2000,
			cellSize: 7,
		})

		animator.start().catch(() => {
			// Prevent UI crash if any image fails to preload.
		})

		return () => animator.stop()
	}, [imageUrls])

	return (
		<div className="hero-avatar-morph" aria-hidden="true">
			<canvas ref={canvasRef} className="hero-avatar-morph-canvas" />
		</div>
	)
}

export default HeroAvatarPixelMorph
