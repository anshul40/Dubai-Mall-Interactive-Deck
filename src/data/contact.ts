/**
 * Replace with real destinations (mailto, Calendly, HubSpot form, etc.).
 * Keep subjects pre-filled so inbound is routed correctly on a shared screen-share call.
 */
export type NextStepAction = {
  id: "action-leasing" | "action-sponsor" | "action-events";
  pillar: string;
  headline: string;
  body: string;
  ctaLabel: string;
  /** Primary conversion — typically mailto with subject */
  href: string;
};

export const nextStepActions: NextStepAction[] = [
  {
    id: "action-leasing",
    pillar: "Retail leasing",
    headline: "Flagship, luxury, mid-tier, pop-up",
    body: "Request availability, GLA ranges, co-tenancy adjacencies, and deal velocity benchmarks — tuned for tenant counsel and design teams.",
    ctaLabel: "Email leasing",
    href: "mailto:leasing@thedubaimall.example?subject=The%20Dubai%20Mall%20%E2%80%94%20Leasing%20inquiry",
  },
  {
    id: "action-sponsor",
    pillar: "Sponsorship & partnerships",
    headline: "Naming, arenas, districts, and digital overlays",
    body: "Sponsor narratives that behave like media — not signage. Share your KPIs; we’ll mirror packages to broadcast, on-site, and owned channels.",
    ctaLabel: "Email partnerships",
    href: "mailto:partnerships@thedubaimall.example?subject=The%20Dubai%20Mall%20%E2%80%94%20Sponsorship%20%2F%20brand%20partnership",
  },
  {
    id: "action-events",
    pillar: "Event bookings",
    headline: "Concerts, launches, corporate seasons, activations",
    body: "Hold production-ready dates across arena, expo, and specialty venues — with load-in specs and broadcast paths already documented.",
    ctaLabel: "Email events",
    href: "mailto:events@thedubaimall.example?subject=The%20Dubai%20Mall%20%E2%80%94%20Event%20booking%20%2F%20hold%20request",
  },
];
