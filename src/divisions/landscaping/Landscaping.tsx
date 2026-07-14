import { Link } from "react-router-dom";

import { ROUTES } from "../../shared/constants/routes";

function Landscaping() {
  return (
    <section className="home-section">
      <div className="container">
        <p className="home-section__eyebrow">Pioneer Division</p>

        <h1 className="home-section__title">
          Pioneer Pressure Washing & Landscaping
        </h1>

        <p className="home-section__description">
          The rebuilt property-services website is under development. This
          division will eventually include services, quote requests, job
          requests, scheduling, galleries, and customer contact tools.
        </p>

        <div className="home-hero__actions">
          <Link
            className="button button--primary"
            to={ROUTES.website.contact}
          >
            Contact Pioneer
          </Link>

          <Link
            className="button button--secondary"
            to={ROUTES.website.companies}
          >
            View All Companies
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Landscaping;
