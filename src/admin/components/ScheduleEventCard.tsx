import type { ScheduleEvent } from "../../shared/types/schedule";

interface ScheduleEventCardProps {
  event: ScheduleEvent;
  compact?: boolean;
}

function formatTime(time?: string) {
  if (!time) {
    return "Time pending";
  }

  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
}

function ScheduleEventCard({
  event,
  compact = false
}: ScheduleEventCardProps) {
  return (
    <article
      className={[
        "schedule-event-card",
        `schedule-event-card--${event.business}`,
        compact ? "schedule-event-card--compact" : ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="schedule-event-card__header">
        <span className="schedule-event-card__time">
          {formatTime(event.startTime)}
        </span>

        <span className="schedule-event-card__status">
          {event.status}
        </span>
      </div>

      <h4 className="schedule-event-card__title">{event.title}</h4>

      {!compact && event.customerName ? (
        <p className="schedule-event-card__customer">
          {event.customerName}
        </p>
      ) : null}

      {!compact && event.location ? (
        <p className="schedule-event-card__location">{event.location}</p>
      ) : null}
    </article>
  );
}

export default ScheduleEventCard;
