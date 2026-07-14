import type {
  BusinessDefinition,
  BusinessSlug
} from "../types/business";

export const businesses: BusinessDefinition[] = [
  {
    id: "pioneer-landscaping",
    slug: "landscaping",
    name: "Pioneer Pressure Washing & Landscaping",
    shortName: "Pioneer Landscaping",
    description:
      "Exterior cleaning, landscaping, property maintenance, and related services for residential and commercial customers.",
    route: "/landscaping",
    status: "active",
    enabledModules: [
      "scheduling",
      "customers",
      "contacts",
      "estimates",
      "expenses",
      "documents",
      "history",
      "metrics",
      "notifications",
      "search"
    ],
    theme: {
      primaryColor: "#1f4d3a",
      secondaryColor: "#17382b",
      accentColor: "#c9a227"
    },
    logoPath: "/images/businesses/landscaping-logo.svg"
  },
  {
    id: "pioneer-transport",
    slug: "transport",
    name: "Pioneer Transport",
    shortName: "Pioneer Transport",
    description:
      "Transportation and logistics services built around dependable scheduling, careful handling, and clear communication.",
    route: "/transport",
    status: "coming-soon",
    enabledModules: [
      "scheduling",
      "customers",
      "contacts",
      "estimates",
      "expenses",
      "documents",
      "history",
      "metrics",
      "notifications",
      "search"
    ],
    theme: {
      primaryColor: "#26384a",
      secondaryColor: "#192632",
      accentColor: "#c9a227"
    },
    logoPath: "/images/businesses/transport-logo.svg"
  },
  {
    id: "pioneer-productions",
    slug: "productions",
    name: "Pioneer Productions",
    shortName: "Pioneer Productions",
    description:
      "Creative production services for businesses, organizations, events, and individual clients.",
    route: "/productions",
    status: "coming-soon",
    enabledModules: [
      "scheduling",
      "customers",
      "contacts",
      "estimates",
      "expenses",
      "documents",
      "history",
      "metrics",
      "notifications",
      "search"
    ],
    theme: {
      primaryColor: "#3d2f4f",
      secondaryColor: "#281f34",
      accentColor: "#c9a227"
    },
    logoPath: "/images/businesses/productions-logo.svg"
  }
];

export const getBusinessBySlug = (
  slug: BusinessSlug
): BusinessDefinition | undefined => {
  return businesses.find((business) => business.slug === slug);
};

export const activeBusinesses = businesses.filter(
  (business) => business.status === "active"
);

export const availableBusinesses = businesses.filter(
  (business) => business.status !== "inactive"
);
