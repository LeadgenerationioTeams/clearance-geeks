import Image from "next/image";
import Link from "next/link";

/**
 * Brand lockup inspired by brand/van-reference.png
 * TODO: Replace with production artwork at /public/logo-clearance-geeks.svg
 */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex flex-col items-start gap-1 ${className}`}>
      {/* Slot for final vector logo — drop file at public/logo-clearance-geeks.svg */}
      <div className="relative h-14 w-48 sm:h-16 sm:w-56">
        <Image
          src="/logo-clearance-geeks.svg"
          alt="The Clearance Geeks Waste Removals"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
      <span className="sr-only">The Clearance Geeks — Waste Removals</span>
    </Link>
  );
}

export function LogoLockupFallback({ compact }: { compact?: boolean }) {
  return (
    <Link href="/" className="group block select-none">
      <svg
        viewBox="0 0 320 120"
        className={compact ? "h-10 w-auto" : "h-14 w-auto sm:h-16"}
        aria-label="The Clearance Geeks Waste Removals"
      >
        <defs>
          <linearGradient id="splash" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7CFC00" />
            <stop offset="100%" stopColor="#8BE600" />
          </linearGradient>
        </defs>
        <ellipse cx="260" cy="70" rx="90" ry="55" fill="url(#splash)" opacity="0.35" />
        <ellipse cx="40" cy="30" rx="50" ry="30" fill="url(#splash)" opacity="0.25" />
        {/* Mascot peeking */}
        <path
          d="M48 28c8-12 28-14 36-2 6 8 4 18-2 24-6-2-10-6-14-10-4 4-10 8-16 8 2-8 0-16-4-20z"
          fill="#111"
        />
        <circle cx="62" cy="36" r="10" fill="none" stroke="#8BE600" strokeWidth="4" />
        <circle cx="78" cy="36" r="10" fill="none" stroke="#8BE600" strokeWidth="4" />
        <circle cx="62" cy="36" r="3" fill="#fff" />
        <circle cx="78" cy="36" r="3" fill="#fff" />
        <text x="24" y="58" fill="#8BE600" fontSize="14" fontFamily="Impact, Haettenschweiler, sans-serif" transform="skewX(-8)">
          THE
        </text>
        <text x="20" y="82" fill="#fff" stroke="#000" strokeWidth="2" fontSize="28" fontFamily="Impact, Haettenschweiler, sans-serif">
          CLEARANCE
        </text>
        <text x="22" y="108" fill="#8BE600" stroke="#000" strokeWidth="2" fontSize="32" fontFamily="Impact, Haettenschweiler, sans-serif">
          GEEKS
        </text>
        <rect x="18" y="112" width="200" height="18" rx="4" fill="url(#splash)" />
        <text x="26" y="126" fill="#000" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="700">
          WASTE REMOVALS
        </text>
      </svg>
    </Link>
  );
}
