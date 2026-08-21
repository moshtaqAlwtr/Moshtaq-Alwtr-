/**
 * Brand glyphs lucide does not ship.
 *
 * Drawn as filled paths on a 24x24 grid so they sit at the same optical weight
 * as the stroked lucide icons beside them.
 */

export function XIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-5.9l-4.62-6.04L5.94 21H2.92l7.05-8.06L2.5 3h6.05l4.18 5.52L17.53 3Zm-1.06 16.2h1.67L7.6 4.71H5.81l10.66 14.49Z" />
    </svg>
  )
}

export function TikTokIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-.63-5.1V9.66a5.66 5.66 0 0 0 .63 11.28 5.66 5.66 0 0 0 5.66-5.66V9.01a7.35 7.35 0 0 0 4.29 1.38V7.3a4.29 4.29 0 0 1-3.21-1.48Z" />
    </svg>
  )
}
