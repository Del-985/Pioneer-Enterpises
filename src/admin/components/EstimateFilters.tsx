import type { EstimateStatus } from "../../shared/types/estimate";

interface EstimateFiltersProps {
  search: string;
  status: EstimateStatus | "all";
  onSearchChange: (value: string) => void;
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
  status,
  onSearchChange,
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
        <span>Status</span>
        <select
          value={status}
          onChange={(event) =>
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
