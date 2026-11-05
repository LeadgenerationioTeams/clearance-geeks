export function SplashBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-geek-lime/25 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-geek-lime/15 blur-3xl" />
      <div className="absolute right-1/4 top-1/2 h-40 w-40 rotate-12 rounded-full bg-geek-lime/20 blur-2xl" />
    </div>
  );
}
