import { Link } from "react-router-dom";

import { ROUTES } from "../../shared/constants/routes";

function Productions() {
  return (
    <section className="home-section">
      <div className="container">
        <p className="home-section__eyebrow">Pioneer Division</p>

        <h1 className="home-section__title">Pioneer Productions</h1>

        <p className="home-section__description">
          The Pioneer Productions website is under development. This division
          will eventually include services, portfolios, project requests,
          bookings, scheduling, and client contact tools.
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

export default Productions;
