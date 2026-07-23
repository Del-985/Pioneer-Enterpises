import type { ChangeEvent } from "react";
import type { CustomerStatus } from "../../shared/types/customer";

interface CustomerFiltersProps {
  search: string;
  status: CustomerStatus | "all";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CustomerStatus | "all") => void;
}

function CustomerFilters({ search, status, onSearchChange, onStatusChange }: CustomerFiltersProps) {
  return (
    <div className="customer-filters">
      <label className="customer-filters__search">
        <span>Search</span>
        <input value={search} onChange={(event: ChangeEvent<HTMLInputElement>) => onSearchChange(event.target.value)} placeholder="Name, company, email, or phone" />
      </label>

      <label>
        <span>Status</span>
        <select value={status} onChange={(event) => onStatusChange(event.target.value as CustomerStatus | "all")}>
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="archived">Archived</option>
        </select>
      </label>
    </div>
  );
}

export default CustomerFilters;
