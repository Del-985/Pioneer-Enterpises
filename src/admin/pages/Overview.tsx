const overviewMetrics = [
  {
    label: "New Requests",
    value: "0",
    description: "Awaiting review across all businesses"
  },
  {
    label: "Upcoming Jobs",
    value: "0",
    description: "Scheduled work in the next seven days"
  },
  {
    label: "Open Estimates",
    value: "0",
    description: "Draft, sent, or awaiting approval"
  },
  {
    label: "Outstanding Expenses",
    value: "$0.00",
    description: "Recorded expenses requiring review"
  }
];

const recentActivity = [
  {
    id: "empty",
    title: "No recent activity",
    description:
      "New requests, schedule changes, estimates, and administrative actions will appear here."
  }
];

function Overview() {
  return (
    <section className="admin-overview">
      <div className="admin-page-heading">
        <div>
          <p className="admin-page-heading__eyebrow">Dashboard</p>

          <h2 className="admin-page-heading__title">
            Business overview
          </h2>

          <p className="admin-page-heading__description">
            Review activity, scheduling, requests, and performance across all
            Pioneer businesses.
          </p>
        </div>
      </div>

      <div className="admin-metrics-grid">
        {overviewMetrics.map((metric) => (
          <article className="admin-metric-card" key={metric.label}>
            <p className="admin-metric-card__label">{metric.label}</p>

            <strong className="admin-metric-card__value">
              {metric.value}
            </strong>

            <p className="admin-metric-card__description">
              {metric.description}
            </p>
          </article>
        ))}
      </div>

      <div className="admin-overview__grid">
        <section className="admin-panel">
          <div className="admin-panel__header">
            <div>
              <p className="admin-panel__eyebrow">Operations</p>
              <h3 className="admin-panel__title">Upcoming schedule</h3>
            </div>

            <button className="admin-panel__action" type="button">
              View Calendar
            </button>
          </div>

          <div className="admin-empty-state">
            <h4 className="admin-empty-state__title">
              No upcoming schedule entries
            </h4>

            <p className="admin-empty-state__description">
              Approved jobs, appointments, deliveries, and production bookings
              will appear here.
            </p>
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel__header">
            <div>
              <p className="admin-panel__eyebrow">Requests</p>
              <h3 className="admin-panel__title">Recent submissions</h3>
            </div>

            <button className="admin-panel__action" type="button">
              View Requests
            </button>
          </div>

          <div className="admin-empty-state">
            <h4 className="admin-empty-state__title">
              No requests awaiting review
            </h4>

            <p className="admin-empty-state__description">
              Quote, job, transportation, and production requests will appear
              here after customers submit them.
            </p>
          </div>
        </section>
      </div>

      <section className="admin-panel">
        <div className="admin-panel__header">
          <div>
            <p className="admin-panel__eyebrow">System</p>
            <h3 className="admin-panel__title">Recent activity</h3>
          </div>
        </div>

        <ul className="admin-activity-list">
          {recentActivity.map((activity) => (
            <li className="admin-activity-list__item" key={activity.id}>
              <div>
                <h4 className="admin-activity-list__title">
                  {activity.title}
                </h4>

                <p className="admin-activity-list__description">
                  {activity.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default Overview;
