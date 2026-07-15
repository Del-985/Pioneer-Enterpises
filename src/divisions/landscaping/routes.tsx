import type { RouteObject } from "react-router-dom";

import Landscaping from "./Landscaping";
import LandscapingLogin from "./LandscapingLogin";
import LandscapingModulePage from "./LandscapingModulePage";
import LandscapingLayout from "./layout/LandscapingLayout";
import { ROUTES } from "../../shared/constants/routes";

export const landscapingRoutes: RouteObject[] = [
  {
    path: ROUTES.divisions.landscaping.root,
    element: <LandscapingLayout />,
    children: [
      { index: true, element: <Landscaping /> },
      {
        path: "services",
        element: (
          <LandscapingModulePage
            eyebrow="Services"
            title="Landscaping and property services"
            description="Detailed service packages, recurring maintenance options, and specialty work will live here."
            primaryLabel="Request Service"
            primaryPath={ROUTES.divisions.landscaping.request}
          />
        )
      },
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
      {
        path: "quote",
        element: (
          <LandscapingModulePage
            eyebrow="Estimates"
            title="Request an estimate"
            description="The customer estimate-request workflow will be built into this module."
          />
        )
      },
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
