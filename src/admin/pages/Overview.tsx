import { useEffect, useMemo, useState } from "react";

import DashboardWidget, {
  dashboardWidgetCatalog
} from "../components/DashboardWidget";
import DashboardWidgetSettings from "../components/DashboardWidgetSettings";
import type {
  DashboardWidgetInstance,
  DashboardWidgetSize,
  DashboardWidgetType
} from "../../shared/types/dashboard";

const STORAGE_KEY = "pioneer-admin-dashboard-layout-v1";

const defaultSettings = {
  business: "all" as const,
  period: "week" as const,
  limit: 5
};

const defaultWidgets: DashboardWidgetInstance[] = [
  {
    instanceId: "today-snapshot",
    type: "today-snapshot",
    size: "tall",
    settings: { ...defaultSettings, period: "today" }
  },
  {
    instanceId: "metrics",
    type: "metrics",
    size: "medium",
    settings: { ...defaultSettings }
  },
  {
    instanceId: "quick-forms",
    type: "quick-forms",
    size: "small",
    settings: { ...defaultSettings, period: "today" }
  },
  {
    instanceId: "upcoming-jobs",
    type: "upcoming-jobs",
    size: "medium",
    settings: { ...defaultSettings }
  },
  {
    instanceId: "weekly-snapshot",
    type: "weekly-snapshot",
    size: "medium",
    settings: { ...defaultSettings }
  }
];

function createInstance(type: DashboardWidgetType): DashboardWidgetInstance {
  const definition = dashboardWidgetCatalog.find((item) => item.type === type)!;

  return {
    instanceId: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    size: definition.defaultSize,
    settings: { ...defaultSettings }
  };
}

function loadWidgets(): DashboardWidgetInstance[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultWidgets;

    const parsed = JSON.parse(saved) as DashboardWidgetInstance[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultWidgets;
  } catch {
    return defaultWidgets;
  }
}

function Overview() {
  const [widgets, setWidgets] = useState<DashboardWidgetInstance[]>(loadWidgets);
  const [editing, setEditing] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [catalogOpen, setCatalogOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
  }, [widgets]);

  const selectedWidget = useMemo(
    () => widgets.find((widget) => widget.instanceId === selectedWidgetId) ?? null,
    [selectedWidgetId, widgets]
  );

  const updateWidget = (instanceId: string, updater: (widget: DashboardWidgetInstance) => DashboardWidgetInstance) => {
    setWidgets((current) => current.map((widget) => widget.instanceId === instanceId ? updater(widget) : widget));
  };

  const moveDraggedWidget = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;

    setWidgets((current) => {
      const sourceIndex = current.findIndex((widget) => widget.instanceId === draggedId);
      const targetIndex = current.findIndex((widget) => widget.instanceId === targetId);
      if (sourceIndex < 0 || targetIndex < 0) return current;

      const next = [...current];
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  };

  const resetDashboard = () => {
    if (!window.confirm("Reset the dashboard to the default layout?")) return;
    setWidgets(defaultWidgets);
    setSelectedWidgetId(null);
  };

  return (
    <section className="custom-dashboard">
      <div className="custom-dashboard__heading">
        <div>
          <p className="admin-page-heading__eyebrow">Dashboard</p>
          <h2 className="admin-page-heading__title">Operations at a glance</h2>
          <p className="admin-page-heading__description">
            Arrange, resize, replace, duplicate, and configure the widgets that matter most to you.
          </p>
        </div>

        <div className="custom-dashboard__actions">
          {editing ? (
            <>
              <button type="button" className="custom-dashboard__button" onClick={() => setCatalogOpen((open) => !open)}>
                Add Widget
              </button>
              <button type="button" className="custom-dashboard__button" onClick={resetDashboard}>
                Reset
              </button>
            </>
          ) : null}

          <button
            type="button"
            className="custom-dashboard__button custom-dashboard__button--primary"
            onClick={() => {
              setEditing((current) => !current);
              setCatalogOpen(false);
            }}
          >
            {editing ? "Finish Customizing" : "Customize Dashboard"}
          </button>
        </div>
      </div>

      {editing && catalogOpen ? (
        <section className="dashboard-catalog">
          <div className="dashboard-catalog__heading">
            <div>
              <p>Widget Library</p>
              <h3>Add another dashboard widget</h3>
            </div>
            <button type="button" onClick={() => setCatalogOpen(false)}>×</button>
          </div>

          <div className="dashboard-catalog__grid">
            {dashboardWidgetCatalog.map((definition) => (
              <button
                type="button"
                className="dashboard-catalog__item"
                key={definition.type}
                onClick={() => setWidgets((current) => [...current, createInstance(definition.type)])}
              >
                <strong>{definition.title}</strong>
                <span>{definition.description}</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {editing ? (
        <div className="custom-dashboard__notice">
          Drag widgets to reorder them. Use each widget's controls to replace, resize, duplicate, remove, or configure it.
        </div>
      ) : null}

      <div className="custom-dashboard__grid">
        {widgets.map((widget) => (
          <DashboardWidget
            key={widget.instanceId}
            widget={widget}
            editing={editing}
            dragging={draggedId === widget.instanceId}
            onDragStart={() => setDraggedId(widget.instanceId)}
            onDragOver={() => moveDraggedWidget(widget.instanceId)}
            onDragEnd={() => setDraggedId(null)}
            onRemove={() => setWidgets((current) => current.filter((item) => item.instanceId !== widget.instanceId))}
            onDuplicate={() => setWidgets((current) => {
              const index = current.findIndex((item) => item.instanceId === widget.instanceId);
              const duplicate = {
                ...widget,
                instanceId: `${widget.type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                settings: { ...widget.settings }
              };
              const next = [...current];
              next.splice(index + 1, 0, duplicate);
              return next;
            })}
            onChangeType={(type: DashboardWidgetType) => updateWidget(widget.instanceId, (current) => ({ ...current, type }))}
            onChangeSize={(size: DashboardWidgetSize) => updateWidget(widget.instanceId, (current) => ({ ...current, size }))}
            onConfigure={() => setSelectedWidgetId(widget.instanceId)}
          />
        ))}
      </div>

      {widgets.length === 0 ? (
        <div className="custom-dashboard__empty">
          <h3>Your dashboard is empty</h3>
          <p>Turn on customization and add widgets from the library.</p>
          <button type="button" onClick={() => {
            setEditing(true);
            setCatalogOpen(true);
          }}>
            Add Widgets
          </button>
        </div>
      ) : null}

      {selectedWidget ? (
        <DashboardWidgetSettings
          widget={selectedWidget}
          onChange={(nextWidget) => updateWidget(selectedWidget.instanceId, () => nextWidget)}
          onClose={() => setSelectedWidgetId(null)}
        />
      ) : null}
    </section>
  );
}

export default Overview;
