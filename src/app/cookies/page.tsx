import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/config/site";
import { CookiePolicyContent } from "@/components/legal/CookiePolicyContent";
import { lvPageClasses } from "@/lib/light-van-page-theme";

export const metadata = buildMetadata({
  title: "Cookie policy",
  description: `How cookies are used on the ${company.legalName} website.`,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cookies" }]} />
      <h1 className={lvPageClasses.h1()}>Cookie policy</h1>
      <CookiePolicyContent />
    </div>
  );
}
