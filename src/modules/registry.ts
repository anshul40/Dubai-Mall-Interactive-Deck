/**
 * Central registry for composable modules.
 * Wire each entry to a route + data provider as the product grows.
 */
export type ModuleDescriptor = {
  id: string;
  title: string;
  route: string;
  status: "planned" | "beta" | "live";
};

export const moduleRoadmap: ModuleDescriptor[] = [
  {
    id: "events-hub",
    title: "Events module (live)",
    route: "/events",
    status: "live",
  },
  {
    id: "pac",
    title: "PAC venue microsite",
    route: "/venues/performing-arts",
    status: "planned",
  },
  {
    id: "expo",
    title: "Exposition center module",
    route: "/venues/exposition",
    status: "planned",
  },
  {
    id: "sponsorship",
    title: "Sponsorship intelligence",
    route: "/modules/sponsorship",
    status: "planned",
  },
  {
    id: "leasing",
    title: "Leasing paths",
    route: "/modules/leasing",
    status: "planned",
  },
  {
    id: "venues",
    title: "Venue microsites",
    route: "/modules/venues",
    status: "planned",
  },
  {
    id: "analytics",
    title: "Audience analytics",
    route: "/modules/analytics",
    status: "planned",
  },
  {
    id: "partnerships",
    title: "Partnership matrix",
    route: "/modules/partnerships",
    status: "planned",
  },
];
