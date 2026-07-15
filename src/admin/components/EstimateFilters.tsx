import type { ChangeEvent } from "react";

import { availableBusinesses } from "../../shared/constants/businesses";
import type { BusinessSlug } from "../../shared/types/business";
import type { EstimateStatus } from "../../shared/types/estimate";

interface EstimateFiltersProps {
  search: string;
  business: BusinessSlug | "all";
  status: EstimateStatus | "all";
  onSearchChange: (value: string) => void;
  onBusinessChange: (value: BusinessSlug | "all") => void;
  onStatusChange: (value: EstimateStatus | "all") => void;
}

const statuses: EstimateStatus[] = [
  "draft",
  "sent",
  "approved",
  "declined",
  "expired"
];

function EstimateFilters({
  search,
  business,
  status,
  onSearchChange,
  onBusinessChange,
  onStatusChange
}: EstimateFiltersProps) {
  return (
    <div className="estimate-filters">
      <label className="estimate-filters__search">
        <span>Search estimates</span>
        <input
          type="search"
          value={search}
          placeholder="Number, customer, or project"
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
        <span>Status</span>
        <select
          value={status}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            onStatusChange(event.target.value as EstimateStatus | "all")
          }
        >
          <option value="all">All Statuses</option>
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default EstimateFilters;
