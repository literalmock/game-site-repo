import { Brain, Gamepad2, Gem, MonitorSmartphone, Rocket, Zap } from '../components/ui/Icons'

export const HERO_AVATAR_IMAGES = [
  '/avatars/charac1.webp',
  '/avatars/charac2.webp',
  '/avatars/charac3.webp',
  '/avatars/charac4.webp',
]

const genreMap = {
  Action: 'Combat Focus',
  Shooter: 'High Tempo FPS',
  RPG: 'Open World Journey',
  Adventure: 'Story Rich Quests',
  Platformer: 'Precision Movement',
  Horror: 'Atmospheric Survival',
  Strategy: 'Tactical Thinking',
}

const genreImageFiles = [
  'category01.webp',
  'category02.webp',
  'category03.webp',
  '05733b4621e4d2512e3bd63d7d385567.webp',
  '0bdd40f5859584f8f8e7389ff56c2f64.webp',
  '7be12ecab9933374bc4ca3048c1d2223.webp',
  'ac1366f33d60eb9f8cffd8667d7b3224.webp',
  'd42d687c511d6b0365f57b7c477e10ac.webp',
]

export const CATEGORY_GENRE_CARDS = Object.entries(genreMap).map(([category, genre], index) => ({
  src: `/genres/${genreImageFiles[index % genreImageFiles.length]}`,
  alt: `${category} category artwork`,
  title: category,
  code: genre,
}))

export const WHY_GAMEVERSE_CARDS = [
  {
    icon: Zap,
    title: 'Instant Play',
    points: [
      'No downloads required',
      'Play directly in browser',
      'Fast loading optimized games',
    ],
  },
  {
    icon: Gamepad2,
    title: 'Curated Game Library',
    points: [
      'Only high-quality games',
      'No spam or low-quality clutter',
      'Handpicked experience',
    ],
  },
  {
    icon: Brain,
    title: 'Smart Recommendations',
    points: [
      'Personalized games by user interest',
      'You may also like suggestions',
      'Context-aware discovery',
    ],
  },
  {
    icon: MonitorSmartphone,
    title: 'Cross Platform',
    points: [
      'Works on mobile and tablet',
      'Perfect on desktop screens',
      'Same experience everywhere',
    ],
  },
  {
    icon: Gem,
    title: 'Clean UI Experience',
    points: [
      'No distractions',
      'Smooth animations',
      'Gamer-first design',
    ],
  },
  {
    icon: Rocket,
    title: 'Fast Performance',
    points: [
      'Optimized assets',
      'Lightweight UI',
      'Smooth gameplay',
    ],
  },
]

export const WHY_CARD_MOTION_BLUEPRINTS = [
  { hidden: { x: -130, y: 0 }, scatter: { x: -190, y: -96, rotate: -14 } },
  { hidden: { x: 130, y: 0 }, scatter: { x: 178, y: -118, rotate: 12 } },
  { hidden: { x: 0, y: 104 }, scatter: { x: -148, y: 136, rotate: -10 } },
  { hidden: { x: 0, y: -104 }, scatter: { x: 172, y: 122, rotate: 14 } },
  { hidden: { x: -96, y: 42 }, scatter: { x: -34, y: 178, rotate: -9 } },
  { hidden: { x: 96, y: 42 }, scatter: { x: 142, y: 154, rotate: 11 } },
]