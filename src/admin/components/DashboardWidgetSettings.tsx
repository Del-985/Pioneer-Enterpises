import type { ChangeEvent } from "react";

import type { DashboardWidgetInstance } from "../../shared/types/dashboard";

interface DashboardWidgetSettingsProps {
  widget: DashboardWidgetInstance;
  onChange: (widget: DashboardWidgetInstance) => void;
  onClose: () => void;
}

function DashboardWidgetSettings({ widget, onChange, onClose }: DashboardWidgetSettingsProps) {
  const updateSetting = <K extends keyof DashboardWidgetInstance["settings"]>(
    key: K,
    value: DashboardWidgetInstance["settings"][K]
  ) => {
    onChange({
      ...widget,
      settings: {
        ...widget.settings,
        [key]: value
      }
    });
  };

  const handleLimit = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    updateSetting("limit", Number.isFinite(nextValue) ? Math.max(1, Math.min(20, nextValue)) : 5);
  };

  return (
    <div className="dashboard-settings-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="dashboard-settings-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-widget-settings-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dashboard-settings-dialog__header">
          <div>
            <p>Widget Settings</p>
            <h2 id="dashboard-widget-settings-title">Configure dashboard widget</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close widget settings">×</button>
        </div>

        <div className="dashboard-settings-dialog__fields">
          <label>
            <span>Custom title</span>
            <input
              type="text"
              value={widget.settings.title ?? ""}
              placeholder="Use default title"
              onChange={(event) => updateSetting("title", event.target.value)}
            />
          </label>

          <label>
            <span>Business scope</span>
            <select
              value={widget.settings.business}
              onChange={(event) => updateSetting("business", event.target.value as DashboardWidgetInstance["settings"]["business"])}
            >
              <option value="all">All businesses</option>
              <option value="landscaping">Landscaping</option>
              <option value="transport">Transport</option>
              <option value="productions">Productions</option>
            </select>
          </label>

          <label>
            <span>Time period</span>
            <select
              value={widget.settings.period}
              onChange={(event) => updateSetting("period", event.target.value as DashboardWidgetInstance["settings"]["period"])}
            >
              <option value="today">Today</option>
              <option value="week">This week</option>
              <option value="month">This month</option>
            </select>
          </label>

          <label>
            <span>Maximum items</span>
            <input type="number" min="1" max="20" value={widget.settings.limit} onChange={handleLimit} />
          </label>
        </div>

        <div className="dashboard-settings-dialog__footer">
          <button type="button" onClick={onClose}>Done</button>
        </div>
      </section>
    </div>
  );
}

export default DashboardWidgetSettings;
