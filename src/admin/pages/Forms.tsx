import FormLinkCard from "../components/FormLinkCard";
import type { FormCategory, FormDefinition } from "../../shared/types/form";

const forms: FormDefinition[] = [
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
    description:
      "Capture the information needed to prepare a new customer estimate.",
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

const categoryLabels: Record<FormCategory, string> = {
  customer: "Customer Forms",
  operations: "Operations Forms",
  finance: "Financial Forms",
  internal: "Internal Forms"
};

const categoryDescriptions: Record<FormCategory, string> = {
  customer: "Forms used to collect customer, service, and estimate information.",
  operations: "Forms used to document field work, inspections, and incidents.",
  finance: "Forms used for expenses, purchases, and financial approvals.",
  internal: "Forms used for employees, administration, and internal workflows."
};

const categories: FormCategory[] = [
  "customer",
  "operations",
  "finance",
  "internal"
];

function Forms() {
  return (
    <section className="admin-forms-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-page-heading__eyebrow">Resources</p>
          <h2 className="admin-page-heading__title">Forms Library</h2>
          <p className="admin-page-heading__description">
            A central directory for customer-facing and internal forms. Links
            will become active as each form is built.
          </p>
        </div>
      </div>

      <section className="forms-summary">
        <div>
          <strong>{forms.length}</strong>
          <span>Planned Forms</span>
        </div>
        <div>
          <strong>{categories.length}</strong>
          <span>Form Categories</span>
        </div>
        <div>
          <strong>
            {forms.filter((form) => form.availability === "available").length}
          </strong>
          <span>Available Now</span>
        </div>
      </section>

      <div className="forms-sections">
        {categories.map((category) => {
          const categoryForms = forms.filter(
            (form) => form.category === category
          );

          return (
            <section className="forms-section" key={category}>
              <div className="forms-section__heading">
                <div>
                  <p className="forms-section__eyebrow">Form Group</p>
                  <h3>{categoryLabels[category]}</h3>
                  <p>{categoryDescriptions[category]}</p>
                </div>

                <span className="forms-section__count">
                  {categoryForms.length}
                </span>
              </div>

              <div className="forms-grid">
                {categoryForms.map((form) => (
                  <FormLinkCard form={form} key={form.id} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

export default Forms;
