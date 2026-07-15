import { Link } from "react-router-dom";

import type { HistoryRecord } from "../../shared/types/history";

interface HistoryDetailProps {
  record?: HistoryRecord;
}

function HistoryDetail({ record }: HistoryDetailProps) {
  if (!record) {
    return (
      <aside className="history-detail history-detail--empty">
        <h3>No activity selected</h3>
        <p>Select a history entry to review its full details.</p>
      </aside>
    );
  }

  const formattedDate = new Date(record.timestamp).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });

  return (
    <aside className="history-detail">
      <div className="history-detail__header">
        <div>
          <p className="history-detail__eyebrow">Activity Detail</p>
          <h2>{record.title}</h2>
        </div>
        <span className={`history-badge history-badge--${record.severity}`}>
          {record.severity}
        </span>
      </div>

      <p className="history-detail__description">{record.description}</p>

      <dl className="history-detail__facts">
        <div><dt>Date</dt><dd>{formattedDate}</dd></div>
        <div><dt>Actor</dt><dd>{record.actor}</dd></div>
        <div><dt>Business</dt><dd>{record.business}</dd></div>
        <div><dt>Category</dt><dd>{record.category}</dd></div>
      </dl>

      {record.metadata ? (
        <section className="history-detail__metadata">
          <h3>Record information</h3>
          <dl>
            {Object.entries(record.metadata).map(([key, value]) => (
              <div key={key}><dt>{key}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </section>
      ) : null}

      {record.relatedPath && record.relatedLabel ? (
        <Link className="history-detail__link" to={record.relatedPath}>
          Open {record.relatedLabel} →
        </Link>
      ) : null}
    </aside>
  );
}

export default HistoryDetail;
