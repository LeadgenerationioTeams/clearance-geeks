import Image from "next/image";
import Link from "next/link";

/** Wordmark + mascot cropped from brand/van-sam.png (Sam's Clearance Geeks van). */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <div className="relative h-12 w-44 sm:h-14 sm:w-52">
        <Image
          src="/brand/logo-header.png"
          alt="The Clearance Geeks — Waste Removals"
          fill
          className="object-contain object-left"
          priority
          sizes="(max-width: 640px) 176px, 208px"
        />
      </div>
      <span className="sr-only">The Clearance Geeks — Waste Removals</span>
    </Link>
  );
}
