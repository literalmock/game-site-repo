import { useEffect, useRef } from 'react'
import { PixelMorphAnimator } from '../utils/pixelMorphAnimator'
import './HeroAvatarPixelMorph.css'

const HeroAvatarPixelMorph = ({ imageUrls, reducedMotion = false }) => {
	const canvasRef = useRef(null)
	const containerRef = useRef(null)
	const animatorRef = useRef(null)
	const observerRef = useRef(null)
	const startedRef = useRef(false)

	useEffect(() => {
		if (
			reducedMotion
			|| !canvasRef.current
			|| !containerRef.current
			|| !Array.isArray(imageUrls)
			|| imageUrls.length === 0
		) {
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
		animatorRef.current = animator

		observerRef.current = new IntersectionObserver(
			([entry]) => {
				if (!animatorRef.current) return

				if (entry.isIntersecting) {
					animatorRef.current.start().catch(() => {
						// Prevent UI crash if any image fails to preload.
					})
					startedRef.current = true
					return
				}

				if (startedRef.current) {
					animatorRef.current.stop()
				}
			},
			{ threshold: 0.15 },
		)

		observerRef.current.observe(containerRef.current)

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect()
				observerRef.current = null
			}

			if (animatorRef.current) {
				animatorRef.current.stop()
				animatorRef.current = null
			}

			startedRef.current = false
		}
	}, [imageUrls, reducedMotion])

	return (
		<div ref={containerRef} className="hero-avatar-morph" aria-hidden="true">
			<canvas ref={canvasRef} className="hero-avatar-morph-canvas" />
		</div>
	)
}

export default HeroAvatarPixelMorph
