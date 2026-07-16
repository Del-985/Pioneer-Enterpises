import { NavLink } from "react-router-dom";

import { ROUTES } from "../../shared/constants/routes";

const navigationItems = [
  { label: "Overview", path: ROUTES.admin.overview },
  { label: "Calendar", path: ROUTES.admin.calendar },
  { label: "Customers", path: ROUTES.admin.customers },
  { label: "Contacts", path: ROUTES.admin.contacts },
  { label: "Estimates", path: ROUTES.admin.estimates },
  { label: "Jobs", path: ROUTES.admin.jobs },
  { label: "Expenses", path: ROUTES.admin.expenses },
  { label: "Forms", path: ROUTES.admin.forms },
  { label: "History", path: ROUTES.admin.history },
  { label: "Metrics", path: ROUTES.admin.metrics },
  { label: "Notifications", path: ROUTES.admin.notifications },
  { label: "Settings", path: ROUTES.admin.settings }
];

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__brand-mark" aria-hidden="true">P</span>
        <div>
          <p className="admin-sidebar__brand-name">Pioneer</p>
          <p className="admin-sidebar__brand-subtitle">Administration</p>
        </div>
      </div>

      <nav className="admin-sidebar__navigation" aria-label="Admin navigation">
        <ul className="admin-sidebar__list">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "admin-sidebar__link admin-sidebar__link--active"
                    : "admin-sidebar__link"
                }
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="admin-sidebar__footer">
        <NavLink className="admin-sidebar__website-link" to={ROUTES.website.home}>
          Return to Website
        </NavLink>
      </div>
    </aside>
  );
}

export default AdminSidebar;