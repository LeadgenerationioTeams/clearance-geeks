"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const VAN_SRC = "/brand/van-1400.webp";
const VAN_WIDTH = 1206;
const VAN_HEIGHT = 1010;

export function LightVanDesktopVan({
  copyId,
  alt,
}: {
  copyId: string;
  alt: string;
}) {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const copy = document.getElementById(copyId);
    if (!copy) return;

    const sync = () => setHeight(copy.offsetHeight);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(copy);
    return () => ro.disconnect();
  }, [copyId]);

  return (
    <figure
      className="relative hidden w-full overflow-hidden rounded-2xl bg-[#F7F8F6] lg:block"
      style={{ height: height ?? undefined, minHeight: height ? undefined : "12rem" }}
    >
      <Image
        src={VAN_SRC}
        alt={alt}
        width={VAN_WIDTH}
        height={VAN_HEIGHT}
        priority
        sizes="(min-width: 1024px) 50vw, 0px"
        className="h-full w-full object-contain object-[60%_50%]"
      />
    </figure>
  );
}
