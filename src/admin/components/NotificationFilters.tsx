import type { ChangeEvent } from "react";

import { availableBusinesses } from "../../shared/constants/businesses";
import type { BusinessSlug } from "../../shared/types/business";
import type {
  NotificationCategory,
  NotificationPriority
} from "../../shared/types/notification";

interface NotificationFiltersProps {
  search: string;
  business: BusinessSlug | "all";
  category: NotificationCategory | "all";
  priority: NotificationPriority | "all";
  state: "all" | "unread" | "read" | "archived";
  onSearchChange: (value: string) => void;
  onBusinessChange: (value: BusinessSlug | "all") => void;
  onCategoryChange: (value: NotificationCategory | "all") => void;
  onPriorityChange: (value: NotificationPriority | "all") => void;
  onStateChange: (value: "all" | "unread" | "read" | "archived") => void;
}

function NotificationFilters({
  search,
  business,
  category,
  priority,
  state,
  onSearchChange,
  onBusinessChange,
  onCategoryChange,
  onPriorityChange,
  onStateChange
}: NotificationFiltersProps) {
  return (
    <div className="notification-filters">
      <label className="notification-filters__search">
        <span>Search</span>
        <input
          type="search"
          value={search}
          placeholder="Search notifications"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label>
        <span>Business</span>
        <select
          value={business}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            onBusinessChange(event.target.value as BusinessSlug | "all")
          }
        >
          <option value="all">All Businesses</option>
          {availableBusinesses.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.shortName}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Category</span>
        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(
              event.target.value as NotificationCategory | "all"
            )
          }
        >
          <option value="all">All Categories</option>
          <option value="schedule">Schedule</option>
          <option value="message">Messages</option>
          <option value="expense">Expenses</option>
          <option value="estimate">Estimates</option>
          <option value="customer">Customers</option>
          <option value="system">System</option>
        </select>
      </label>

      <label>
        <span>Priority</span>
        <select
          value={priority}
          onChange={(event) =>
            onPriorityChange(
              event.target.value as NotificationPriority | "all"
            )
          }
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>
      </label>

      <label>
        <span>State</span>
        <select
          value={state}
          onChange={(event) =>
            onStateChange(
              event.target.value as
                | "all"
                | "unread"
                | "read"
                | "archived"
            )
          }
        >
          <option value="all">Active</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="archived">Archived</option>
        </select>
      </label>
    </div>
  );
}

export default NotificationFilters;
