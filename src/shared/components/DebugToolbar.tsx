import { useState } from "react";

interface DebugLink {
  label: string;
  path: string;
}

interface DebugSection {
  label: string;
  links: DebugLink[];
}

const sections: DebugSection[] = [
  {
    label: "Website",
    links: [
      { label: "Home", path: "/" },
      { label: "Companies", path: "/companies" },
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" }
    ]
  },
  {
    label: "Admin",
    links: [
      { label: "Overview", path: "/admin/overview" },
      { label: "Calendar", path: "/admin/calendar" },
      { label: "Customers", path: "/admin/customers" },
      { label: "Contacts", path: "/admin/contacts" },
      { label: "Estimates", path: "/admin/estimates" },
      { label: "Jobs", path: "/admin/jobs" },
      { label: "Expenses", path: "/admin/expenses" },
      { label: "Forms", path: "/admin/forms" },
      { label: "Documents", path: "/admin/documents" },
      { label: "History", path: "/admin/history" },
      { label: "Metrics", path: "/admin/metrics" },
      { label: "Notifications", path: "/admin/notifications" },
      { label: "Settings", path: "/admin/settings" }
    ]
  },
  {
    label: "Divisions",
    links: [
      { label: "Landscaping", path: "/landscaping" },
      { label: "Transport", path: "/transport" },
      { label: "Productions", path: "/productions" }
    ]
  }
];

function DebugToolbar() {
  const [isOpen, setIsOpen] = useState(true);
  const currentPath = window.location.pathname;

  return (
    <aside
      className={`debug-toolbar${isOpen ? " debug-toolbar--open" : ""}`}
      aria-label="Development navigation"
    >
      <button
        className="debug-toolbar__toggle"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span>DEV NAV</span>
        <span aria-hidden="true">{isOpen ? "×" : "↑"}</span>
      </button>

      {isOpen ? (
        <div className="debug-toolbar__content">
          {sections.map((section) => (
            <section className="debug-toolbar__section" key={section.label}>
              <h2 className="debug-toolbar__heading">{section.label}</h2>
              <nav className="debug-toolbar__links">
                {section.links.map((link) => (
                  <a
                    className={`debug-toolbar__link${
                      currentPath === link.path ? " debug-toolbar__link--active" : ""
                    }`}
                    href={link.path}
                    key={link.path}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </section>
          ))}
        </div>
      ) : null}
    </aside>
  );
}

export default DebugToolbar;