import { NavLink, Outlet } from "react-router-dom";

import { ROUTES } from "../../shared/constants/routes";

const navigationItems = [
  { label: "Home", path: ROUTES.divisions.landscaping.root, end: true },
  { label: "Services", path: ROUTES.divisions.landscaping.services },
  { label: "Gallery", path: ROUTES.divisions.landscaping.gallery },
  { label: "Request Service", path: ROUTES.divisions.landscaping.request },
  { label: "Contact", path: ROUTES.divisions.landscaping.contact }
];

function LandscapingLayout() {
  return (
    <div className="landscaping-app">
      <header className="landscaping-app__header">
        <div className="container landscaping-app__header-inner">
          <NavLink className="landscaping-app__brand" to={ROUTES.divisions.landscaping.root}>
            <span className="landscaping-app__brand-mark" aria-hidden="true">P</span>
            <span>
              <strong>Pioneer Landscaping Services</strong>
              <small>Property care built around dependable service</small>
            </span>
          </NavLink>

          <nav className="landscaping-app__nav" aria-label="Landscaping navigation">
            {navigationItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "landscaping-app__nav-link landscaping-app__nav-link--active"
                    : "landscaping-app__nav-link"
                }
                end={item.end}
                key={item.path}
                to={item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <NavLink className="landscaping-app__account" to={ROUTES.divisions.landscaping.login}>
            Customer Login
          </NavLink>
        </div>
      </header>

      <main className="landscaping-app__main">
        <Outlet />
      </main>

      <footer className="landscaping-app__footer">
        <div className="container landscaping-app__footer-inner">
          <div>
            <strong>Pioneer Landscaping Services</strong>
            <p>Residential and commercial property services.</p>
          </div>
          <div className="landscaping-app__footer-links">
            <NavLink to={ROUTES.divisions.landscaping.request}>Request Service</NavLink>
            <NavLink to={ROUTES.divisions.landscaping.contact}>Contact</NavLink>
            <NavLink to={ROUTES.website.home}>Pioneer Enterprises</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandscapingLayout;
