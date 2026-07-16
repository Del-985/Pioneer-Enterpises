import type { RouteObject } from "react-router-dom";

import Landscaping from "./Landscaping";
import LandscapingLogin from "./LandscapingLogin";
import LandscapingModulePage from "./LandscapingModulePage";
import LandscapingLayout from "./layout/LandscapingLayout";
import QuoteRequest from "./pages/QuoteRequest";
import Services from "./pages/Services";
import { ROUTES } from "../../shared/constants/routes";

export const landscapingRoutes: RouteObject[] = [
  {
    path: ROUTES.divisions.landscaping.root,
    element: <LandscapingLayout />,
    children: [
      { index: true, element: <Landscaping /> },
      { path: "services", element: <Services /> },
      {
        path: "gallery",
        element: (
          <LandscapingModulePage
            eyebrow="Gallery"
            title="Completed property work"
            description="Project photos and before-and-after results will be added here."
          />
        )
      },
      { path: "quote", element: <QuoteRequest /> },
      {
        path: "request",
        element: (
          <LandscapingModulePage
            eyebrow="Service Requests"
            title="Request landscaping service"
            description="The customer-facing service request workflow will be built into this module."
          />
        )
      },
      {
        path: "contact",
        element: (
          <LandscapingModulePage
            eyebrow="Contact"
            title="Contact Pioneer Landscaping Services"
            description="Direct contact details and the landscaping contact form will live here."
          />
        )
      },
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
