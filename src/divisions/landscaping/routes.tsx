import type { RouteObject } from "react-router-dom";

import Landscaping from "./Landscaping";
import LandscapingLogin from "./LandscapingLogin";
import LandscapingLayout from "./layout/LandscapingLayout";
import Contact from "./pages/Contact";
import CustomerAccount from "./pages/CustomerAccount";
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
      { path: "account", element: <CustomerAccount /> }
    ]
  }
];
