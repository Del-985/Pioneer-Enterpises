import type { ChangeEvent } from "react";
import { availableBusinesses } from "../../shared/constants/businesses";
import type { BusinessSlug } from "../../shared/types/business";
import type { MetricPeriod } from "../../shared/types/metric";

interface MetricFiltersProps {
  business: BusinessSlug | "all";
  period: MetricPeriod;
  onBusinessChange: (value: BusinessSlug | "all") => void;
  onPeriodChange: (value: MetricPeriod) => void;
}

function MetricFilters({ business, period, onBusinessChange, onPeriodChange }: MetricFiltersProps) {
  return (
    <div className="metric-filters">
      <label>
        <span>Business</span>
        <select value={business} onChange={(event: ChangeEvent<HTMLSelectElement>) => onBusinessChange(event.target.value as BusinessSlug | "all")}>
          <option value="all">All Businesses</option>
          {availableBusinesses.map((item) => (
            <option key={item.id} value={item.slug}>{item.shortName}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Period</span>
        <select value={period} onChange={(event: ChangeEvent<HTMLSelectElement>) => onPeriodChange(event.target.value as MetricPeriod)}>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="ytd">Year to Date</option>
        </select>
      </label>
    </div>
  );
}

export default MetricFilters;
