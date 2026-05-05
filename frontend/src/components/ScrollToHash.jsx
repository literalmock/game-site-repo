import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const HASH_SCROLL_RETRIES = 12

const ScrollToHash = () => {
  // const location = useLocation()

  // useEffect(() => {
  //   if (!location.hash) return undefined

  //   const targetId = location.hash.slice(1)
  //   let retryCount = 0
  //   let frameId = null

  //   const scrollToTarget = () => {
  //     const target = document.getElementById(targetId)

  //     if (target) {
  //       target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  //       return
  //     }

  //     if (retryCount >= HASH_SCROLL_RETRIES) {
  //       return
  //     }

  //     retryCount += 1
  //     frameId = window.requestAnimationFrame(scrollToTarget)
  //   }

  //   frameId = window.requestAnimationFrame(scrollToTarget)

  //   return () => {
  //     if (frameId !== null) {
  //       window.cancelAnimationFrame(frameId)
  //     }
  //   }
  // }, [location.hash, location.pathname])

  return null
}

export default ScrollToHash
