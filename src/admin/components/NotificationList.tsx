import type { AdminNotification } from "../../shared/types/notification";

interface NotificationListProps {
  notifications: AdminNotification[];
  selectedId?: string;
  onSelect: (notification: AdminNotification) => void;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function NotificationList({
  notifications,
  selectedId,
  onSelect
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="notification-empty-state">
        <h3>No notifications found</h3>
        <p>Try changing the current filters.</p>
      </div>
    );
  }

  return (
    <ul className="notification-list">
      {notifications.map((notification) => (
        <li key={notification.id}>
          <button
            type="button"
            className={[
              "notification-list__item",
              !notification.read ? "notification-list__item--unread" : "",
              selectedId === notification.id
                ? "notification-list__item--selected"
                : ""
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSelect(notification)}
          >
            <span
              className={`notification-list__priority notification-list__priority--${notification.priority}`}
            />

            <span className="notification-list__content">
              <span className="notification-list__header">
                <strong>{notification.title}</strong>
                <time>{formatDate(notification.createdAt)}</time>
              </span>

              <span className="notification-list__message">
                {notification.message}
              </span>

              <span className="notification-list__meta">
                <span>{notification.category}</span>
                <span>{notification.business ?? "Enterprise"}</span>
                {!notification.read ? <span>Unread</span> : null}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NotificationList;
