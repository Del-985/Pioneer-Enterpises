import { Link } from "react-router-dom";

import { ROUTES } from "../../../shared/constants/routes";

const serviceGroups = [
  {
    title: "Lawn Maintenance",
    description:
      "Routine mowing and property upkeep for residential and commercial customers.",
    services: [
      "Weekly, biweekly, and custom schedules",
      "Mowing, edging, and trimming",
      "Blowing and cleanup after service",
      "Seasonal and one-time maintenance"
    ]
  },
  {
    title: "Pressure Washing",
    description:
      "Exterior cleaning for the surfaces customers see and use every day.",
    services: [
      "Driveways and walkways",
      "Home exteriors and siding",
      "Patios, decks, and fences",
      "Commercial entryways and hard surfaces"
    ]
  },
  {
    title: "Landscape Improvements",
    description:
      "Practical upgrades that improve the appearance and usability of a property.",
    services: [
      "Mulch installation and bed restoration",
      "Sod installation and lawn repair",
      "Planting and landscape refreshes",
      "Debris removal and property cleanup"
    ]
  },
  {
    title: "Shrub & Tree Care",
    description:
      "Targeted trimming and cleanup for overgrown or damaged vegetation.",
    services: [
      "Bush and hedge trimming",
      "Small-tree trimming",
      "Storm and fallen-limb cleanup",
      "Tree-removal estimates where appropriate"
    ]
  },
  {
    title: "Seasonal Cleanup",
    description:
      "One-time cleanup services for changing seasons, storms, and neglected areas.",
    services: [
      "Leaf removal",
      "Spring and fall cleanup",
      "Overgrowth reduction",
      "Haul-away and debris disposal"
    ]
  }
];

function Services() {
  return (
    <div className="landscaping-services-page">
      <section className="landscaping-subpage-hero">
        <div className="container landscaping-subpage-hero__layout">
          <div>
            <p className="landscaping-eyebrow">Services</p>
            <h1>Property care built around the work you actually need.</h1>
            <p>
              Choose a recurring service or request a one-time project. We review
              the property, confirm the scope, and provide clear next steps before
              work begins.
            </p>
          </div>

          <div className="landscaping-subpage-hero__actions">
            <Link
              className="landscaping-button landscaping-button--primary"
              to={ROUTES.divisions.landscaping.quote}
            >
              Request a Quote
            </Link>
            <Link
              className="landscaping-button landscaping-button--secondary"
              to={ROUTES.divisions.landscaping.request}
            >
              Request Service
            </Link>
          </div>
        </div>
      </section>

      <section className="landscaping-section">
        <div className="container">
          <div className="landscaping-services-grid">
            {serviceGroups.map((group, index) => (
              <article className="landscaping-services-card" key={group.title}>
                <span className="landscaping-services-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
                <ul>
                  {group.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <div className="landscaping-services-card__actions">
                  <Link to={`${ROUTES.divisions.landscaping.quote}?service=${encodeURIComponent(group.title)}`}>
                    Request Quote
                  </Link>
                  <Link to={ROUTES.divisions.landscaping.request}>
                    Request Service
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landscaping-services-note">
        <div className="container landscaping-services-note__content">
          <div>
            <p className="landscaping-eyebrow">Not Listed?</p>
            <h2>Tell us what the property needs.</h2>
            <p>
              Submit a quote request with a description and photos. We will confirm
              whether the project fits our current service capabilities.
            </p>
          </div>
          <Link
            className="landscaping-button landscaping-button--light"
            to={ROUTES.divisions.landscaping.quote}
          >
            Start Quote Request
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
