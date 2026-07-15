import { NavLink } from "react-router-dom";

import { ROUTES } from "../../../shared/constants/routes";

const navigationItems = [
  { label: "Home", path: ROUTES.divisions.landscaping.root, end: true },
  { label: "Services", path: ROUTES.divisions.landscaping.services },
  { label: "Gallery", path: ROUTES.divisions.landscaping.gallery },
  { label: "Request Service", path: ROUTES.divisions.landscaping.request },
  { label: "Contact", path: ROUTES.divisions.landscaping.contact }
];

function LandscapingNavigation() {
  return (
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
  );
}

export default LandscapingNavigation;
