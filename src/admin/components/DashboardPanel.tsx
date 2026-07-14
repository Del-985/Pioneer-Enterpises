import type { ReactNode } from "react";

interface DashboardPanelProps {
  title: string;
  eyebrow?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

function DashboardPanel({
  title,
  eyebrow,
  description,
  action,
  children,
  className = ""
}: DashboardPanelProps) {
  const panelClassName = [
    "dashboard-panel",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={panelClassName}>
      <div className="dashboard-panel__header">
        <div>
          {eyebrow ? (
            <p className="dashboard-panel__eyebrow">{eyebrow}</p>
          ) : null}

          <h3 className="dashboard-panel__title">{title}</h3>

          {description ? (
            <p className="dashboard-panel__description">
              {description}
            </p>
          ) : null}
        </div>

        {action ? (
          <div className="dashboard-panel__action">{action}</div>
        ) : null}
      </div>

      <div className="dashboard-panel__content">
        {children}
      </div>
    </section>
  );
}

export default DashboardPanel;