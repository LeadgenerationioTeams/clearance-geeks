import { BrandLogo } from "./BrandLogo";

export function LogoLockup({ className = "" }: { className?: string }) {
  return <BrandLogo variant="header" className={className} />;
}
