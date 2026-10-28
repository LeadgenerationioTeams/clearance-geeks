import { serviceSlugs } from "./services";
import { areaSlugs, serviceByTownSlugs } from "./areas";
import { neighbourhoods } from "./neighbourhoods";

export interface RouteEntry {
  path: string;
  label: string;
}

export function getAllStaticRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/areas", label: "Areas" },
    { path: "/privacy", label: "Privacy" },
    { path: "/cookies", label: "Cookies" },
    { path: "/terms", label: "Terms" },
  ];

  for (const slug of serviceSlugs) {
    routes.push({
      path: `/services/${slug}`,
      label: `Service: ${slug}`,
    });
  }

  for (const slug of areaSlugs) {
    routes.push({ path: `/areas/${slug}`, label: `Area: ${slug}` });
  }

  for (const n of neighbourhoods) {
    routes.push({
      path: `/areas/${n.areaSlug}/${n.slug}`,
      label: `${n.areaSlug} ${n.name}`,
    });
  }

  for (const areaSlug of serviceByTownSlugs) {
    for (const service of serviceSlugs) {
      routes.push({
        path: `/areas/${areaSlug}/${service}`,
        label: `${areaSlug} ${service}`,
      });
    }
  }

  return routes;
}
