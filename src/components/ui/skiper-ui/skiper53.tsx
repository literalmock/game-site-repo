"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "../../../lib/utils";

type Skiper53Item = {
  src: string;
  alt: string;
  code: string;
  title?: string;
};

type Skiper53Props = {
  items: Skiper53Item[];
  className?: string;
};

const Skiper53 = ({ items, className }: Skiper53Props) => {
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
      <HoverExpand_002 images={items} />
    </div>
  );
};

export { Skiper53 };

const HoverExpand_002 = ({
  images,
  className,
}: {
  images: Skiper53Item[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full px-1", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full flex-col items-center justify-center gap-2">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-cyan-300/20"
              initial={{ height: "2.8rem" }}
              animate={{
                height: activeImage === index ? "15rem" : "2.8rem",
              }}
              transition={{ duration: 0.34, ease: "easeInOut" }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-slate-950/58 via-slate-900/20 to-slate-900/18"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage !== index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/65"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
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
                  "size-full",
                  activeImage === index
                    ? "object-cover object-center"
                    : "object-cover object-center"
                )}
                alt={image.alt}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
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
