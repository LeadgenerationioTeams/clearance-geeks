import { getAllStaticRoutes } from "@/lib/routes";

process.stdout.write(
  JSON.stringify(getAllStaticRoutes().map((route) => route.path)),
);
