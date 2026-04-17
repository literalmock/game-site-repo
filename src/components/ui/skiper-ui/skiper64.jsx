"use client";

import { motion } from "framer-motion";
import { Gamepad2, Rocket, Shield } from "lucide-react";
import React, { useRef } from "react";
import { cn } from "../../../lib/utils";

const Skiper64 = ({ className }) => {
  const playgroundRef = useRef(null);

  return (
    <div
      className={cn(
        "relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-cyan-200/28 bg-gradient-to-b from-[#102640]/90 via-[#1a1b45]/92 to-[#0f1023]/96 p-4 shadow-[0_18px_42px_rgba(4,6,18,0.56)]",
        className,
      )}
    >
      <SkiperGooeyFilterProvider />

      <div
        ref={playgroundRef}
        className="relative h-[210px] w-full overflow-hidden rounded-2xl"
        style={{
          filter: "url(#SkiperGooeyFilter)",
        }}
      >
        <motion.div
          drag
          dragConstraints={playgroundRef}
          dragElastic={0.16}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 6, scale: 0.98 }}
          animate={{ y: [6, 0, 6], scale: [0.98, 1, 0.98] }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          className="absolute left-1/2 top-1/2 h-[96px] w-[228px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-cyan-100/58 bg-gradient-to-r from-cyan-300/84 via-violet-300/74 to-fuchsia-400/84 shadow-[0_0_24px_rgba(129,140,248,0.36)]"
        />

        <motion.div
          drag
          dragConstraints={playgroundRef}
          dragElastic={0.28}
          whileTap={{ scale: 0.92 }}
          initial={{ x: -86, y: -24 }}
          animate={{
            x: [-86, 86, -86],
            y: [-24, -56, -24],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(103,232,249,0.86)]"
        >
          <Gamepad2 size={16} className="text-cyan-950" />
        </motion.div>

        <motion.div
          drag
          dragConstraints={playgroundRef}
          dragElastic={0.28}
          whileTap={{ scale: 0.92 }}
          initial={{ x: 54, y: 56 }}
          animate={{ x: [54, 18, 54], y: [56, 34, 56] }}
          transition={{ duration: 2.1, ease: "easeInOut", repeat: Infinity }}
          className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.76)]"
        >
          <Rocket size={14} className="text-amber-900" />
        </motion.div>

        <motion.div
          drag
          dragConstraints={playgroundRef}
          dragElastic={0.24}
          whileTap={{ scale: 0.92 }}
          initial={{ x: 0, y: -68 }}
          animate={{ x: [0, 14, 0], y: [-68, -78, -68] }}
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
          className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-fuchsia-100 shadow-[0_0_16px_rgba(217,70,239,0.74)]"
        >
          <Shield size={14} className="text-fuchsia-900" />
        </motion.div>
      </div>
    </div>
  );
};

export { Skiper64, SkiperGooeyFilterProvider };

const SkiperGooeyFilterProvider = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0"
      version="1.1"
    >
      <defs>
        <filter id="SkiperGooeyFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4.4" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
            result="SkiperGooeyFilter"
          />
          <feBlend in="SourceGraphic" in2="SkiperGooeyFilter" />
        </filter>
      </defs>
    </svg>
  );
};

// Component keeps the original gooey filter and supports playful drag interactions.
