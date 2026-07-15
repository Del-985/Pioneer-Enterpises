import type { ChangeEvent } from "react";

import { availableBusinesses } from "../../shared/constants/businesses";
import type { BusinessSlug } from "../../shared/types/business";

interface CalendarToolbarProps {
  monthLabel: string;
  selectedBusiness: BusinessSlug | "all";
  onBusinessChange: (business: BusinessSlug | "all") => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

function CalendarToolbar({
  monthLabel,
  selectedBusiness,
  onBusinessChange,
  onPreviousMonth,
  onNextMonth,
  onToday
}: CalendarToolbarProps) {
  const handleBusinessChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    onBusinessChange(event.target.value as BusinessSlug | "all");
  };

  return (
    <div className="calendar-toolbar">
      <div className="calendar-toolbar__navigation">
        <button
          className="calendar-toolbar__button"
          type="button"
          onClick={onPreviousMonth}
          aria-label="View previous month"
        >
          ←
        </button>

        <button
          className="calendar-toolbar__today"
          type="button"
          onClick={onToday}
        >
          Today
        </button>

        <button
          className="calendar-toolbar__button"
          type="button"
          onClick={onNextMonth}
          aria-label="View next month"
        >
          →
        </button>

        <h2 className="calendar-toolbar__month">{monthLabel}</h2>
      </div>

      <label className="calendar-toolbar__filter">
        <span>Business</span>

        <select value={selectedBusiness} onChange={handleBusinessChange}>
          <option value="all">All Businesses</option>

          {availableBusinesses.map((business) => (
            <option key={business.id} value={business.slug}>
              {business.shortName}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default CalendarToolbar;
