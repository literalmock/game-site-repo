"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";

const Skiper53 = ({ items, className, onItemClick }) => {
  if (!items?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl border border-cyan-300/20 bg-gradient-to-b from-slate-900/70 to-slate-950/85 p-3 shadow-[0_16px_36px_rgba(2,8,22,0.38)]",
        className,
      )}
    >
      <HoverExpand_002 images={items} onItemClick={onItemClick} />
    </div>
  );
};

export { Skiper53 };

const HoverExpand_002 = ({
  images,
  className,
  onItemClick,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeImage, setActiveImage] = useState(1);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    const updateTouchState = () => setIsTouchDevice(mediaQuery.matches)

    updateTouchState()
    mediaQuery.addEventListener('change', updateTouchState)

    return () => mediaQuery.removeEventListener('change', updateTouchState)
  }, [])

  // Reduced animation duration on mobile for snappier feel
  const animationDuration = isTouchDevice ? 0.24 : 0.34
  const collapsedHeight = isTouchDevice ? '4.2rem' : '2.8rem'
  const expandedHeight = isTouchDevice ? '11.5rem' : '15rem'

  const handleCardClick = (image, index) => {
    if (isTouchDevice) {
      // On touch devices: first click expands, second click navigates
      if (lastClickedIndex === index && activeImage === index) {
        // Second click on same card - navigate
        onItemClick?.(image, index);
        setLastClickedIndex(null);
      } else {
        // First click or different card - just expand
        setActiveImage(index);
        setLastClickedIndex(index);
      }
    } else {
      // On desktop: expand on hover, click to navigate
      setActiveImage(index);
      onItemClick?.(image, index);
    }
  };

  return (
    <div className={cn("relative w-full px-1", className)}>
      <div className="w-full">
        <div className={cn("flex w-full flex-col items-center justify-center gap-2", isTouchDevice && "gap-3", "will-change-[height]") }>
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={cn(
                "group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-cyan-300/20",
                isTouchDevice && "shadow-[0_10px_24px_rgba(2,8,22,0.22)]",
              )}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
              }}
              initial={{ maxHeight: collapsedHeight, opacity: prefersReducedMotion ? 1 : 0.9 }}
              animate={{
                maxHeight: activeImage === index ? expandedHeight : collapsedHeight,
                opacity: 1,
              }}
              transition={{ 
                duration: animationDuration, 
                ease: "easeInOut",
                opacity: { duration: 0.2 }
              }}
              onClick={() => handleCardClick(image, index)}
              onHoverStart={() => {
                if (!isTouchDevice) {
                  setActiveImage(index);
                }
              }}
              whileTap={isTouchDevice ? { scale: 0.98 } : undefined}
            >
              <AnimatePresence mode="wait">
                {activeImage === index ? (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute h-full w-full bg-gradient-to-t from-slate-950/58 via-slate-900/20 to-slate-900/18"
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                ) : (
                  <motion.div
                    key="inactive"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 bg-slate-950/65"
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {image.title ? (
                      <p className="text-lg font-bold tracking-wide text-cyan-100 drop-shadow-[0_2px_10px_rgba(3,10,26,0.9)]">
                        {image.title}
                      </p>
                    ) : null}
                    <p className="mt-2 text-base font-semibold text-cyan-200 drop-shadow-[0_2px_10px_rgba(3,10,26,0.9)]">
                      {image.code}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <img
                src={image.src}
                className={cn(
                  "size-full object-cover object-center",
                )}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { HoverExpand_002 };

/**
 * Skiper 53 HoverExpand_002 — React + Framer Motion
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
