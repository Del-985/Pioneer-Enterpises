import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles/global.css";
import "./styles/home.css";
import "./styles/admin.css";
import "./styles/calendar.css";
import "./styles/customers.css";
import "./styles/contacts.css";
import "./styles/estimates.css";
import "./styles/jobs.css";
import "./styles/expenses.css";
import "./styles/forms.css";
import "./styles/history.css";
import "./styles/metrics.css";
import "./styles/notifications.css";
import "./styles/settings.css";
import "./styles/placeholders.css";
import "./styles/debug-toolbar.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Unable to start Pioneer Management Group: the root element with id="root" was not found.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);