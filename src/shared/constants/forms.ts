import type { FormDefinition } from "../types/form";

export const formDefinitions: FormDefinition[] = [
  {
    id: "service-request",
    title: "Service Request",
    description:
      "Collect a customer's requested service, preferred schedule, location, and project details.",
    path: "/admin/forms/service-request",
    category: "customer",
    availability: "planned",
    businessScope: "all"
  },
  {
    id: "estimate-request",
    title: "Estimate Request",
    description: "Capture the information needed to prepare a new customer estimate.",
    path: "/admin/forms/estimate-request",
    category: "customer",
    availability: "planned",
    businessScope: "all"
  },
  {
    id: "customer-intake",
    title: "Customer Intake",
    description:
      "Create a complete customer profile with contact, billing, and service information.",
    path: "/admin/forms/customer-intake",
    category: "customer",
    availability: "planned",
    businessScope: "all"
  },
  {
    id: "job-completion",
    title: "Job Completion Report",
    description:
      "Record work completed, materials used, issues found, and customer sign-off.",
    path: "/admin/forms/job-completion",
    category: "operations",
    availability: "planned",
    businessScope: "all"
  },
  {
    id: "incident-report",
    title: "Incident Report",
    description:
      "Document property damage, safety incidents, service disruptions, or other operational issues.",
    path: "/admin/forms/incident-report",
    category: "operations",
    availability: "planned",
    businessScope: "all"
  },
  {
    id: "vehicle-inspection",
    title: "Vehicle Inspection",
    description:
      "Complete pre-trip, post-trip, and maintenance inspection records for transport assets.",
    path: "/admin/forms/vehicle-inspection",
    category: "operations",
    availability: "planned",
    businessScope: "transport"
  },
  {
    id: "expense-submission",
    title: "Expense Submission",
    description:
      "Submit an expense with vendor, category, amount, notes, and receipt information.",
    path: "/admin/forms/expense-submission",
    category: "finance",
    availability: "planned",
    businessScope: "all"
  },
  {
    id: "purchase-request",
    title: "Purchase Request",
    description:
      "Request approval for tools, supplies, materials, equipment, or other purchases.",
    path: "/admin/forms/purchase-request",
    category: "finance",
    availability: "planned",
    businessScope: "all"
  },
  {
    id: "employee-onboarding",
    title: "Employee Onboarding",
    description:
      "Collect basic employment information and track onboarding requirements.",
    path: "/admin/forms/employee-onboarding",
    category: "internal",
    availability: "planned",
    businessScope: "all"
  },
  {
    id: "time-off-request",
    title: "Time-Off Request",
    description:
      "Submit and review employee leave requests with dates, reason, and approval status.",
    path: "/admin/forms/time-off-request",
    category: "internal",
    availability: "planned",
    businessScope: "all"
  }
];

export const defaultQuickFormIds = [
  "service-request",
  "expense-submission",
  "job-completion"
];
