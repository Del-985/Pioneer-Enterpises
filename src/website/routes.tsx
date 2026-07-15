import type { RouteObject } from "react-router-dom";

import Layout from "./layout/Layout";
import About from "./pages/About";
import Companies from "./pages/Companies";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Landscaping from "../divisions/landscaping/Landscaping";
import LandscapingLayout from "../divisions/landscaping/LandscapingLayout";
import LandscapingLogin from "../divisions/landscaping/LandscapingLogin";
import LandscapingModulePage from "../divisions/landscaping/LandscapingModulePage";
import Productions from "../divisions/productions/Productions";
import Transport from "../divisions/transport/Transport";

export const websiteRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "companies", element: <Companies /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {
        path: "landscaping",
        element: <LandscapingLayout />,
        children: [
          { index: true, element: <Landscaping /> },
          {
            path: "services",
            element: (
              <LandscapingModulePage
                eyebrow="Services"
                title="Landscaping services are being organized here."
                description="This module will hold complete service descriptions, service-area details, and clear paths into requests and estimates."
                primaryLabel="Request Service"
                primaryPath="/landscaping/request"
              />
            )
          },
          {
            path: "gallery",
            element: (
              <LandscapingModulePage
                eyebrow="Project Gallery"
                title="Completed work will be shown here."
                description="The gallery will support before-and-after projects, service categories, and customer-facing proof of completed work."
              />
            )
          },
          {
            path: "quote",
            element: (
              <LandscapingModulePage
                eyebrow="Estimate Request"
                title="Estimate requests are coming next."
                description="This route is reserved for the landscaping estimate workflow and will connect directly to the customer and admin systems later."
              />
            )
          },
          {
            path: "request",
            element: (
              <LandscapingModulePage
                eyebrow="Service Request"
                title="The landscaping request form will live here."
                description="This customer-facing module will collect the property, service, scheduling, and contact information needed to start work."
              />
            )
          },
          {
            path: "contact",
            element: (
              <LandscapingModulePage
                eyebrow="Contact"
                title="Contact Pioneer Landscaping Services."
                description="Phone, email, service-area, and operating-hour information will be finalized here before launch."
              />
            )
          },
          { path: "login", element: <LandscapingLogin /> },
          {
            path: "account",
            element: (
              <LandscapingModulePage
                eyebrow="Customer Account"
                title="Your landscaping account dashboard will live here."
                description="Authenticated customers will eventually manage requests, estimates, schedules, payments, and service history from this route."
                primaryLabel="Customer Login"
                primaryPath="/landscaping/login"
              />
            )
          }
        ]
      },
      { path: "transport", element: <Transport /> },
      { path: "productions", element: <Productions /> }
    ]
  }
];
