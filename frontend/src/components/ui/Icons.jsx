import React from 'react'

const IconBase = ({ size = 16, className, fill = 'none', children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
)

export const ChevronDown = (props) => <IconBase {...props}><path d="m6 9 6 6 6-6" /></IconBase>
export const ChevronLeft = (props) => <IconBase {...props}><path d="m15 18-6-6 6-6" /></IconBase>
export const ChevronRight = (props) => <IconBase {...props}><path d="m9 18 6-6-6-6" /></IconBase>
export const Eye = (props) => <IconBase {...props}><path d="M2.1 12a11.5 11.5 0 0 1 19.8 0 11.5 11.5 0 0 1-19.8 0" /><circle cx="12" cy="12" r="3" /></IconBase>
export const Gamepad2 = (props) => <IconBase {...props}><line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" /><rect x="2" y="6" width="20" height="12" rx="2" /></IconBase>
export const Sparkles = (props) => <IconBase {...props}><path d="M12 3l1.6 3.4L17 8l-3.4 1.6L12 13l-1.6-3.4L7 8l3.4-1.6L12 3z" /><path d="M5 15l.8 1.7L7.5 18l-1.7.8L5 20.5l-.8-1.7L2.5 18l1.7-.8L5 15z" /><path d="M19 14l1 2.2 2.2 1-2.2 1L19 20.5l-1-2.2-2.2-1 2.2-1L19 14z" /></IconBase>
export const MessageSquare = (props) => <IconBase {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></IconBase>
export const ThumbsUp = (props) => <IconBase {...props}><path d="M7 10v12" /><path d="M15 5.9 14 10h5a2 2 0 0 1 2 2l-1 7a2 2 0 0 1-2 2H7V10l5-7a2 2 0 0 1 3 2.9z" /></IconBase>
export const Send = (props) => <IconBase {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></IconBase>
export const Brain = (props) => <IconBase {...props}><path d="M9.5 3a3.5 3.5 0 0 0-3.4 4.4A3.5 3.5 0 0 0 4 13.8a3.5 3.5 0 0 0 2.1 6.4" /><path d="M14.5 3a3.5 3.5 0 0 1 3.4 4.4 3.5 3.5 0 0 1 2.1 6.4 3.5 3.5 0 0 1-2.1 6.4" /><path d="M9 8h6" /><path d="M8 12h8" /><path d="M9 16h6" /></IconBase>
export const Gem = (props) => <IconBase {...props}><path d="M6 3h12l3 5-9 13L3 8z" /><path d="M3 8h18" /><path d="m8 3 4 18 4-18" /></IconBase>
export const MonitorSmartphone = (props) => <IconBase {...props}><rect x="2" y="4" width="14" height="10" rx="2" /><path d="M8 20h2" /><rect x="18" y="7" width="4" height="10" rx="1" /></IconBase>
export const Rocket = (props) => <IconBase {...props}><path d="M4.5 19.5 9 15l6-6a8 8 0 0 0 2-7 8 8 0 0 0-7 2l-6 6-4.5 4.5z" /><path d="m9 15 0 6" /><path d="m15 9 6 0" /></IconBase>
export const Zap = (props) => <IconBase {...props}><path d="M13 2 3 14h7l-1 8 10-12h-7z" /></IconBase>
export const Play = ({ fill = 'none', ...props }) => <IconBase fill={fill} {...props}><path d="M8 5v14l11-7z" /></IconBase>
export const Star = ({ fill = 'none', ...props }) => <IconBase fill={fill} {...props}><path d="m12 2 3.1 6.3 7 1-5 4.9 1.2 6.8L12 17.7 5.7 21l1.2-6.8-5-4.9 7-1z" /></IconBase>
export const Tag = (props) => <IconBase {...props}><path d="M20 12 12 20 4 12V4h8z" /><circle cx="9" cy="9" r="1" /></IconBase>
export const Menu = (props) => <IconBase {...props}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></IconBase>
export const X = (props) => <IconBase {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></IconBase>
export const House = (props) => <IconBase {...props}><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /></IconBase>
export const Trophy = (props) => <IconBase {...props}><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v6a5 5 0 0 1-10 0z" /><path d="M5 6H3a2 2 0 0 0 2 2" /><path d="M19 6h2a2 2 0 0 1-2 2" /></IconBase>
export const LogIn = (props) => <IconBase {...props}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /></IconBase>
export const Search = (props) => <IconBase {...props}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></IconBase>
export const Maximize2 = (props) => <IconBase {...props}><path d="M15 3h6v6" /><path d="m9 21H3v-6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /></IconBase>
export const Volume2 = (props) => <IconBase {...props}><polygon points="11 5 6 9 3 9 3 15 6 15 11 19 11 5" /><path d="M15 9a5 5 0 0 1 0 6" /><path d="M18.5 6.5a9 9 0 0 1 0 11" /></IconBase>
export const VolumeX = (props) => <IconBase {...props}><polygon points="11 5 6 9 3 9 3 15 6 15 11 19 11 5" /><path d="m16 9 5 6" /><path d="m21 9-5 6" /></IconBase>
export const Shield = (props) => <IconBase {...props}><path d="M12 3 5 6v6c0 5 3.5 9 7 9s7-4 7-9V6z" /></IconBase>

export const BrandX = ({ size = 16, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M18.9 3h2.9l-6.4 7.3L23 21h-6l-4.7-6.2L6.8 21H3.9l6.8-7.8L1 3h6.2l4.2 5.6L18.9 3zm-1 16.2h1.6L6.1 4.7H4.4l13.5 14.5z" />
  </svg>
)

export const Instagram = (props) => (
  <IconBase {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
  </IconBase>
)

export const YouTube = (props) => (
  <IconBase {...props}>
    <rect x="3" y="6" width="18" height="12" rx="4" />
    <path d="m10 9 6 3-6 3z" />
  </IconBase>
)
