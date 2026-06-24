export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 8 46 Q 8 78 45 78 Q 82 78 82 46"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="3" y1="46" x2="87" y2="46"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 51 44 L 40 22 L 48 22 L 36 4 L 56 26 L 47 26 Z"
        fill="#3A7D44"
      />
    </svg>
  )
}
