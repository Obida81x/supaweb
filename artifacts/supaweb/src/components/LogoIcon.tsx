interface LogoIconProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 32, className = "" }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="url(#logo-bg)" />
      <rect width="40" height="40" rx="10" fill="url(#logo-glow)" opacity="0.4" />
      <path
        d="M23.5 6L13 22H20.5L17 34L29 17H21L23.5 6Z"
        fill="url(#logo-bolt)"
        stroke="url(#logo-bolt-stroke)"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2d1b69" />
          <stop offset="1" stopColor="#1e1254" />
        </linearGradient>
        <radialGradient id="logo-glow" cx="50%" cy="40%" r="60%" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" stopOpacity="0.5" />
          <stop offset="1" stopColor="#4f46e5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="logo-bolt" x1="13" y1="6" x2="29" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c4b5fd" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient id="logo-bolt-stroke" x1="13" y1="6" x2="29" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ddd6fe" stopOpacity="0.6" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <svg
      width="140"
      height="36"
      viewBox="0 0 140 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icon mark */}
      <rect width="36" height="36" rx="9" fill="url(#full-bg)" />
      <rect width="36" height="36" rx="9" fill="url(#full-glow)" opacity="0.4" />
      <path
        d="M21 4L11 20H18L15 32L27 15H19.5L21 4Z"
        fill="url(#full-bolt)"
        strokeLinejoin="round"
      />
      {/* Wordmark */}
      <text x="46" y="14" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="13" fill="#e4e4e7">Supa</text>
      <text x="82" y="14" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="13" fill="url(#text-grad)">Web</text>
      <defs>
        <linearGradient id="full-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2d1b69" />
          <stop offset="1" stopColor="#1e1254" />
        </linearGradient>
        <radialGradient id="full-glow" cx="50%" cy="40%" r="60%" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" stopOpacity="0.6" />
          <stop offset="1" stopColor="#4f46e5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="full-bolt" x1="11" y1="4" x2="27" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c4b5fd" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient id="text-grad" x1="82" y1="0" x2="115" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#818cf8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
