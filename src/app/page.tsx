import { HomeHero } from "@/components/home/HomeHero";
import { HomeTrustBar } from "@/components/home/HomeTrustBar";
import { HomeServicesGrid } from "@/components/home/HomeServicesGrid";
import { HomeJobGallery } from "@/components/home/HomeJobGallery";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeAreas } from "@/components/home/HomeAreas";
import { HomeCtaBand } from "@/components/home/HomeCtaBand";
import { buildMetadata } from "@/lib/seo";
import { company, serviceAreaNames, siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: `Waste removal & house clearance ${siteConfig.serviceAreas.region}`,
  description: company.defaultDescription,
  path: "/",
});

const faq = [
  {
    q: "What areas do you cover?",
    a: `${siteConfig.serviceAreas.region} including ${serviceAreaNames().slice(0, 2).join(", ")} and surrounding boroughs. See our areas page for towns and neighbourhoods.`,
  },
  {
    q: "How do I get a price?",
    a: "Call us or send the quote form with your postcode and a short description. Photos help us size the job.",
  },
  {
    q: "Do you take single items?",
    a: "Yes — sofas, fridges, mattresses and small loads are all fine.",
  },
];

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <HomeTrustBar />
      <HomeServicesGrid />
      <HomeJobGallery />
      <HomeHowItWorks />
      <HomeAreas />

      <section className="section-pad bg-white">
        <div className="site-container max-w-3xl">
          <h2 className="font-display text-3xl text-zinc-900">Common questions</h2>
          <dl className="mt-8 space-y-6">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-zinc-900">{item.q}</dt>
                <dd className="mt-2 text-base text-zinc-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <HomeCtaBand />
    </div>
  );
}
