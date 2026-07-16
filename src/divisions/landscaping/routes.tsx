import type { RouteObject } from "react-router-dom";

import Landscaping from "./Landscaping";
import LandscapingLogin from "./LandscapingLogin";
import LandscapingModulePage from "./LandscapingModulePage";
import LandscapingLayout from "./layout/LandscapingLayout";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import QuoteRequest from "./pages/QuoteRequest";
import ServiceRequest from "./pages/ServiceRequest";
import Services from "./pages/Services";
import { ROUTES } from "../../shared/constants/routes";

export const landscapingRoutes: RouteObject[] = [
  {
    path: ROUTES.divisions.landscaping.root,
    element: <LandscapingLayout />,
    children: [
      { index: true, element: <Landscaping /> },
      { path: "services", element: <Services /> },
      { path: "gallery", element: <Gallery /> },
      { path: "quote", element: <QuoteRequest /> },
      { path: "request", element: <ServiceRequest /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <LandscapingLogin /> },
      {
        path: "account",
        element: (
          <LandscapingModulePage
            eyebrow="Customer Account"
            title="Your landscaping account"
            description="Requests, estimates, appointments, payments, and service history will be available here after authentication is connected."
          />
        )
      }
    ]
  }
];
