import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageImage } from "@/components/PageImage";
import { images } from "@/lib/media";

export const metadata = buildMetadata({
  title: "Cookie policy",
  description: "How cookies are used on The Clearance Geeks website.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cookies" }]} />
      <h1 className="mt-4 font-display text-4xl text-geek-lime">Cookies</h1>
      <PageImage image={images.brandedSplash} className="mt-6 max-w-md" />
      <p className="mt-6 text-zinc-400">
        We store a single local preference when you accept or decline optional
        cookies. No analytics scripts are installed in this build. Update this
        page when tags are added.
      </p>
    </div>
  );
}
