import { Link } from "react-router-dom";

import { ROUTES } from "../../shared/constants/routes";
import type {
  DashboardWidgetDefinition,
  DashboardWidgetInstance,
  DashboardWidgetSize,
  DashboardWidgetType
} from "../../shared/types/dashboard";

export const dashboardWidgetCatalog: DashboardWidgetDefinition[] = [
  { type: "today-snapshot", title: "Today's Snapshot", description: "Immediate work, requests, messages, expenses, and notices.", defaultSize: "tall" },
  { type: "metrics", title: "Metrics", description: "Condensed financial and operational performance.", defaultSize: "medium" },
  { type: "quick-forms", title: "Quick Forms", description: "Fast access to commonly used forms.", defaultSize: "small" },
  { type: "upcoming-jobs", title: "Upcoming Jobs", description: "The next scheduled jobs across Pioneer businesses.", defaultSize: "medium" },
  { type: "weekly-snapshot", title: "Weekly Snapshot", description: "Jobs, revenue, expenses, estimates, and changes this week.", defaultSize: "medium" },
  { type: "open-estimates", title: "Open Estimates", description: "Draft and sent estimates awaiting action.", defaultSize: "small" },
  { type: "outstanding-expenses", title: "Outstanding Expenses", description: "Pending and high-value expense records.", defaultSize: "small" },
  { type: "notifications", title: "Notifications", description: "Unread and urgent notifications.", defaultSize: "small" },
  { type: "recent-activity", title: "Recent Activity", description: "Recent administrative activity across the system.", defaultSize: "medium" },
  { type: "business-health", title: "Business Health", description: "Status summary for every Pioneer division.", defaultSize: "medium" }
];

const sizeOptions: DashboardWidgetSize[] = ["small", "medium", "large", "tall"];

interface DashboardWidgetProps {
  widget: DashboardWidgetInstance;
  editing: boolean;
  dragging: boolean;
  onDragStart: () => void;
  onDragOver: () => void;
  onDragEnd: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onChangeType: (type: DashboardWidgetType) => void;
  onChangeSize: (size: DashboardWidgetSize) => void;
  onConfigure: () => void;
}

function WidgetBody({ widget }: { widget: DashboardWidgetInstance }) {
  switch (widget.type) {
    case "today-snapshot":
      return (
        <div className="dashboard-widget__snapshot-grid">
          <Link to={ROUTES.admin.jobs}><strong>0</strong><span>Today's Jobs</span></Link>
          <Link to={ROUTES.admin.calendar}><strong>0</strong><span>Schedule Requests</span></Link>
          <Link to={ROUTES.admin.notifications}><strong>0</strong><span>Urgent Messages</span></Link>
          <Link to={ROUTES.admin.expenses}><strong>0</strong><span>Expenses Over $500</span></Link>
          <Link to={ROUTES.admin.notifications}><strong>0</strong><span>Miscellaneous</span></Link>
        </div>
      );
    case "metrics":
      return (
        <div className="dashboard-widget__metric-grid">
          <div><strong>$0</strong><span>Revenue</span></div>
          <div><strong>$0</strong><span>Profit</span></div>
          <div><strong>0</strong><span>Completed Jobs</span></div>
          <div><strong>0%</strong><span>Estimate Conversion</span></div>
        </div>
      );
    case "quick-forms":
      return (
        <div className="dashboard-widget__links">
          <Link to={ROUTES.admin.forms}>Service Request</Link>
          <Link to={ROUTES.admin.forms}>Expense Submission</Link>
          <Link to={ROUTES.admin.forms}>Job Completion</Link>
        </div>
      );
    case "upcoming-jobs":
      return <WidgetEmpty text="Upcoming jobs will appear here once scheduling data is connected." link={ROUTES.admin.jobs} label="Open Jobs" />;
    case "weekly-snapshot":
      return (
        <div className="dashboard-widget__metric-grid">
          <div><strong>0</strong><span>Jobs</span></div>
          <div><strong>$0</strong><span>Revenue</span></div>
          <div><strong>$0</strong><span>Expenses</span></div>
          <div><strong>0</strong><span>Estimates</span></div>
        </div>
      );
    case "open-estimates":
      return <WidgetEmpty text="No open estimates." link={ROUTES.admin.estimates} label="View Estimates" />;
    case "outstanding-expenses":
      return <WidgetEmpty text="No outstanding expenses." link={ROUTES.admin.expenses} label="View Expenses" />;
    case "notifications":
      return <WidgetEmpty text="No unread notifications." link={ROUTES.admin.notifications} label="View Notifications" />;
    case "recent-activity":
      return <WidgetEmpty text="Recent administrative activity will appear here." link={ROUTES.admin.history} label="Open History" />;
    case "business-health":
      return (
        <div className="dashboard-widget__business-list">
          <div><span>Landscaping</span><strong>Active</strong></div>
          <div><span>Transport</span><strong>Coming Soon</strong></div>
          <div><span>Productions</span><strong>Coming Soon</strong></div>
        </div>
      );
  }
}

function WidgetEmpty({ text, link, label }: { text: string; link: string; label: string }) {
  return (
    <div className="dashboard-widget__empty">
      <p>{text}</p>
      <Link to={link}>{label}</Link>
    </div>
  );
}

function DashboardWidget({
  widget,
  editing,
  dragging,
  onDragStart,
  onDragOver,
  onDragEnd,
  onRemove,
  onDuplicate,
  onChangeType,
  onChangeSize,
  onConfigure
}: DashboardWidgetProps) {
  const definition = dashboardWidgetCatalog.find((item) => item.type === widget.type)!;
  const title = widget.settings.title?.trim() || definition.title;

  return (
    <article
      className={`dashboard-widget dashboard-widget--${widget.size}${dragging ? " dashboard-widget--dragging" : ""}`}
      draggable={editing}
      onDragStart={onDragStart}
      onDragOver={(event) => {
        event.preventDefault();
        onDragOver();
      }}
      onDragEnd={onDragEnd}
    >
      <header className="dashboard-widget__header">
        <div>
          <p className="dashboard-widget__scope">
            {widget.settings.business === "all" ? "All businesses" : widget.settings.business}
            {" · "}
            {widget.settings.period}
          </p>
          <h3>{title}</h3>
        </div>

        {editing ? <span className="dashboard-widget__drag-handle" title="Drag to move">⋮⋮</span> : null}
      </header>

      {editing ? (
        <div className="dashboard-widget__editor">
          <label>
            <span>Widget</span>
            <select value={widget.type} onChange={(event) => onChangeType(event.target.value as DashboardWidgetType)}>
              {dashboardWidgetCatalog.map((item) => <option key={item.type} value={item.type}>{item.title}</option>)}
            </select>
          </label>
          <label>
            <span>Size</span>
            <select value={widget.size} onChange={(event) => onChangeSize(event.target.value as DashboardWidgetSize)}>
              {sizeOptions.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
          </label>
          <div className="dashboard-widget__editor-actions">
            <button type="button" onClick={onConfigure}>Configure</button>
            <button type="button" onClick={onDuplicate}>Duplicate</button>
            <button type="button" onClick={onRemove}>Remove</button>
          </div>
        </div>
      ) : null}

      <div className="dashboard-widget__body">
        <WidgetBody widget={widget} />
      </div>
    </article>
  );
}

export default DashboardWidget;
