import { CallButton } from "./CallButton";

export function StickyMobileCta() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-geek-lime/40 bg-black/95 p-3 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <CallButton className="w-full text-base" label="Tap to call — free quote" />
    </div>
  );
}
