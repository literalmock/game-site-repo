"use client";

import React, { useRef } from "react";
import { Gamepad2, Rocket, Shield } from "../Icons";
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
        <div
          className="absolute left-1/2 top-1/2 h-[96px] w-[228px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-cyan-100/58 bg-gradient-to-r from-cyan-300/84 via-violet-300/74 to-fuchsia-400/84 shadow-[0_0_24px_rgba(129,140,248,0.36)]"
          style={{ animation: 'skiper64-float-core 2.4s ease-in-out infinite' }}
        />

        <div
          className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(103,232,249,0.86)]"
          style={{ animation: 'skiper64-orb-a 2.2s ease-in-out infinite' }}
        >
          <Gamepad2 size={16} className="text-cyan-950" />
        </div>

        <div
          className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.76)]"
          style={{ animation: 'skiper64-orb-b 2.1s ease-in-out infinite' }}
        >
          <Rocket size={14} className="text-amber-900" />
        </div>

        <div
          className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-fuchsia-100 shadow-[0_0_16px_rgba(217,70,239,0.74)]"
          style={{ animation: 'skiper64-orb-c 2.8s ease-in-out infinite' }}
        >
          <Shield size={14} className="text-fuchsia-900" />
        </div>
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
