export function PlexLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="11" fill="url(#plex-bg)" />
      <rect
        x="0.5"
        y="0.5"
        width="39"
        height="39"
        rx="10.5"
        stroke="white"
        strokeOpacity="0.14"
      />
      {/* Upper swap arrow (right) */}
      <path
        d="M12 15.5h12.5l-3-3"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lower swap arrow (left) */}
      <path
        d="M28 24.5H15.5l3 3"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="plex-bg"
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="oklch(0.58 0.22 270)" />
          <stop offset="1" stopColor="oklch(0.42 0.2 272)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function PlexWordmark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="flex items-center gap-2">
        <PlexLogo className="size-8" />
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Plex<span className="text-primary">Swap</span>
        </span>
      </span>
    </div>
  )
}
