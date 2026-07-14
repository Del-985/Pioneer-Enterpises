import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navigationItems = [
  {
    label: "Home",
    path: "/",
    end: true
  },
  {
    label: "Companies",
    path: "/companies",
    end: false
  },
  {
    label: "About",
    path: "/about",
    end: false
  },
  {
    label: "Contact",
    path: "/contact",
    end: false
  }
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeMenuOnEscape);

    return () => {
      window.removeEventListener("keydown", closeMenuOnEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((currentState) => !currentState);
  };

  return (
    <nav className="site-navigation" aria-label="Primary navigation">
      <button
        className="site-navigation__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={toggleMenu}
      >
        <span className="site-navigation__toggle-line" />
        <span className="site-navigation__toggle-line" />
        <span className="site-navigation__toggle-line" />
      </button>

      <div
        id="primary-navigation-menu"
        className={
          isOpen
            ? "site-navigation__menu site-navigation__menu--open"
            : "site-navigation__menu"
        }
      >
        <ul className="site-navigation__list">
          {navigationItems.map((item) => (
            <li className="site-navigation__item" key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "site-navigation__link site-navigation__link--active"
                    : "site-navigation__link"
                }
                to={item.path}
                end={item.end}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          className="button button--primary site-navigation__cta"
          to="/contact"
        >
          Work With Pioneer
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
