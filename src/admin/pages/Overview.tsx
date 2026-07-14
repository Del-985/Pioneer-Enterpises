import { Link } from "react-router-dom";

import DashboardPanel from "../components/DashboardPanel";
import EmptyState from "../components/EmptyState";
import QuickAction from "../components/QuickAction";
import SnapshotItem from "../components/SnapshotItem";
import { ROUTES } from "../../shared/constants/routes";

const snapshotItems = [
  {
    label: "Today's Jobs",
    value: 0,
    description: "Scheduled work for today",
    path: ROUTES.admin.calendar,
    tone: "default" as const
  },
  {
    label: "Schedule Requests",
    value: 0,
    description: "Requests awaiting review",
    path: ROUTES.admin.calendar,
    tone: "warning" as const
  },
  {
    label: "Urgent Messages",
    value: 0,
    description: "Messages marked urgent",
    path: ROUTES.admin.notifications,
    tone: "urgent" as const
  },
  {
    label: "Expenses Over $500",
    value: 0,
    description: "Large expenses requiring attention",
    path: ROUTES.admin.expenses,
    tone: "financial" as const
  },
  {
    label: "Miscellaneous",
    value: 0,
    description: "Other notices and reminders",
    path: ROUTES.admin.notifications,
    tone: "information" as const
  }
];

const businessHealth = [
  {
    name: "Pioneer Landscaping",
    status: "Inactive",
    summary: "No current operational activity"
  },
  {
    name: "Pioneer Transport",
    status: "Coming Soon",
    summary: "Operations have not started"
  },
  {
    name: "Pioneer Productions",
    status: "Coming Soon",
    summary: "Operations have not started"
  }
];

function Overview() {
  return (
    <section className="admin-overview">
      <div className="admin-page-heading">
        <div>
          <p className="admin-page-heading__eyebrow">
            Dashboard
          </p>

          <h2 className="admin-page-heading__title">
            Today&apos;s command center
          </h2>

          <p className="admin-page-heading__description">
            Review the work, requests, messages, expenses, and notices that
            require attention today.
          </p>
        </div>
      </div>

      <section className="today-snapshot">
        <div className="today-snapshot__header">
          <div>
            <p className="today-snapshot__eyebrow">
              Immediate Attention
            </p>

            <h3 className="today-snapshot__title">
              Today&apos;s Snapshot
            </h3>

            <p className="today-snapshot__description">
              The most important operational information across every Pioneer
              business.
            </p>
          </div>
        </div>

        <div className="today-snapshot__grid">
          {snapshotItems.map((item) => (
            <SnapshotItem
              key={item.label}
              label={item.label}
              value={item.value}
              description={item.description}
              path={item.path}
              tone={item.tone}
            />
          ))}
        </div>
      </section>

      <DashboardPanel
        eyebrow="Operations"
        title="Today's Schedule"
        description="Jobs, appointments, deliveries, and production bookings scheduled for today."
        action={
          <Link
            className="dashboard-panel__link"
            to={ROUTES.admin.calendar}
          >
            Open Calendar
          </Link>
        }
      >
        <EmptyState
          title="Nothing scheduled today"
          description="Approved jobs and appointments will appear here when scheduling begins."
        />
      </DashboardPanel>

      <div className="admin-overview__grid">
        <DashboardPanel
          eyebrow="Portfolio"
          title="Business Health"
          description="A quick operational summary for each Pioneer business."
        >
          <ul className="business-health-list">
            {businessHealth.map((business) => (
              <li
                className="business-health-list__item"
                key={business.name}
              >
                <div>
                  <h4 className="business-health-list__name">
                    {business.name}
                  </h4>

                  <p className="business-health-list__summary">
                    {business.summary}
                  </p>
                </div>

                <span className="business-health-list__status">
                  {business.status}
                </span>
              </li>
            ))}
          </ul>
        </DashboardPanel>

        <DashboardPanel
          eyebrow="Actions"
          title="Quick Actions"
          description="Open the most common administrative workflows."
        >
          <div className="quick-actions-list">
            <QuickAction
              title="View Calendar"
              description="Review schedules and pending requests"
              path={ROUTES.admin.calendar}
            />

            <QuickAction
              title="Open Customers"
              description="Review customer records and history"
              path={ROUTES.admin.customers}
            />

            <QuickAction
              title="Create Estimate"
              description="Start a new customer estimate"
              path={ROUTES.admin.estimates}
            />

            <QuickAction
              title="Record Expense"
              description="Add a new business expense"
              path={ROUTES.admin.expenses}
            />
          </div>
        </DashboardPanel>
      </div>

      <DashboardPanel
        eyebrow="System"
        title="Recent Activity"
        description="Recent requests, approvals, schedule changes, and administrative actions."
      >
        <EmptyState
          title="No recent activity"
          description="Activity will appear here as the Pioneer ERP begins processing real business records."
        />
      </DashboardPanel>
    </section>
  );
}

export default Overview;