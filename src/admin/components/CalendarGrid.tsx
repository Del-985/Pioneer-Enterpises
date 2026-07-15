import ScheduleEventCard from "./ScheduleEventCard";
import type { ScheduleEvent } from "../../shared/types/schedule";

interface CalendarDay {
  key: string;
  date: Date;
  dateString: string;
  isCurrentMonth: boolean;
  isToday: boolean;
}

interface CalendarGridProps {
  days: CalendarDay[];
  events: ScheduleEvent[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function CalendarGrid({
  days,
  events,
  selectedDate,
  onSelectDate
}: CalendarGridProps) {
  return (
    <div className="calendar-grid-wrapper">
      <div className="calendar-grid__weekdays" aria-hidden="true">
        {weekDays.map((day) => (
          <div className="calendar-grid__weekday" key={day}>
            <span className="calendar-grid__weekday-long">{day}</span>
            <span className="calendar-grid__weekday-short">
              {day.slice(0, 3)}
            </span>
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day) => {
          const dayEvents = events.filter(
            (event) => event.date === day.dateString
          );

          const isSelected = selectedDate === day.dateString;

          return (
            <button
              className={[
                "calendar-day",
                !day.isCurrentMonth
                  ? "calendar-day--outside-month"
                  : "",
                day.isToday ? "calendar-day--today" : "",
                isSelected ? "calendar-day--selected" : ""
              ]
                .filter(Boolean)
                .join(" ")}
              key={day.key}
              type="button"
              onClick={() => onSelectDate(day.dateString)}
              aria-pressed={isSelected}
              aria-label={`Select ${day.date.toLocaleDateString()}`}
            >
              <span className="calendar-day__number">
                {day.date.getDate()}
              </span>

              <span className="calendar-day__events">
                {dayEvents.slice(0, 3).map((event) => (
                  <ScheduleEventCard
                    key={event.id}
                    event={event}
                    compact
                  />
                ))}

                {dayEvents.length > 3 ? (
                  <span className="calendar-day__more">
                    +{dayEvents.length - 3} more
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;
