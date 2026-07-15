import { Link } from "react-router-dom";

import type { AdminNotification } from "../../shared/types/notification";

interface NotificationDetailProps {
  notification?: AdminNotification;
  onToggleRead: (id: string) => void;
  onArchive: (id: string) => void;
}

function NotificationDetail({
  notification,
  onToggleRead,
  onArchive
}: NotificationDetailProps) {
  if (!notification) {
    return (
      <div className="notification-detail notification-detail--empty">
        <h3>Select a notification</h3>
        <p>Choose a notification to review its full details.</p>
      </div>
    );
  }

  return (
    <article className="notification-detail">
      <div className="notification-detail__header">
        <div>
          <p className="notification-detail__eyebrow">
            {notification.category} · {notification.priority}
          </p>
          <h2>{notification.title}</h2>
        </div>

        <span
          className={`notification-detail__priority notification-detail__priority--${notification.priority}`}
        >
          {notification.priority}
        </span>
      </div>

      <dl className="notification-detail__meta">
        <div>
          <dt>Business</dt>
          <dd>{notification.business ?? "Pioneer Enterprises"}</dd>
        </div>
        <div>
          <dt>Received</dt>
          <dd>{new Date(notification.createdAt).toLocaleString()}</dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{notification.sourceName ?? "System"}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{notification.read ? "Read" : "Unread"}</dd>
        </div>
      </dl>

      <div className="notification-detail__message">
        <p>{notification.message}</p>
      </div>

      <div className="notification-detail__actions">
        {notification.actionPath && notification.actionLabel ? (
          <Link
            className="notification-detail__primary-action"
            to={notification.actionPath}
          >
            {notification.actionLabel}
          </Link>
        ) : null}

        <button type="button" onClick={() => onToggleRead(notification.id)}>
          Mark as {notification.read ? "Unread" : "Read"}
        </button>

        <button
          type="button"
          className="notification-detail__archive"
          onClick={() => onArchive(notification.id)}
        >
          {notification.archived ? "Restore" : "Archive"}
        </button>
      </div>
    </article>
  );
}

export default NotificationDetail;
