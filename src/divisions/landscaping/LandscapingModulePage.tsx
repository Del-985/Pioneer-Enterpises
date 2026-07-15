import { Link } from "react-router-dom";

import { ROUTES } from "../../shared/constants/routes";

interface LandscapingModulePageProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryPath?: string;
}

function LandscapingModulePage({
  eyebrow,
  title,
  description,
  primaryLabel = "Return Home",
  primaryPath = ROUTES.divisions.landscaping.root
}: LandscapingModulePageProps) {
  return (
    <section className="landscaping-module-page">
      <div className="container landscaping-module-page__content">
        <p className="landscaping-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="landscaping-module-page__actions">
          <Link className="landscaping-button landscaping-button--primary" to={primaryPath}>
            {primaryLabel}
          </Link>
          <Link className="landscaping-button landscaping-button--secondary" to={ROUTES.divisions.landscaping.contact}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LandscapingModulePage;
