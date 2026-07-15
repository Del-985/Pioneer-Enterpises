import type { ChangeEvent } from "react";
import { availableBusinesses } from "../../shared/constants/businesses";
import type { BusinessSlug } from "../../shared/types/business";
import type { CustomerStatus } from "../../shared/types/customer";

interface CustomerFiltersProps {
  search: string;
  business: BusinessSlug | "all";
  status: CustomerStatus | "all";
  onSearchChange: (value: string) => void;
  onBusinessChange: (value: BusinessSlug | "all") => void;
  onStatusChange: (value: CustomerStatus | "all") => void;
}

function CustomerFilters({ search, business, status, onSearchChange, onBusinessChange, onStatusChange }: CustomerFiltersProps) {
  return (
    <div className="customer-filters">
      <label className="customer-filters__search">
        <span>Search</span>
        <input value={search} onChange={(event: ChangeEvent<HTMLInputElement>) => onSearchChange(event.target.value)} placeholder="Name, company, email, or phone" />
      </label>

      <label>
        <span>Business</span>
        <select value={business} onChange={(event) => onBusinessChange(event.target.value as BusinessSlug | "all")}>
          <option value="all">All Businesses</option>
          {availableBusinesses.map((item) => <option key={item.id} value={item.slug}>{item.shortName}</option>)}
        </select>
      </label>

      <label>
        <span>Status</span>
        <select value={status} onChange={(event) => onStatusChange(event.target.value as CustomerStatus | "all")}>
          <option value="all">All Statuses</option>
          <option value="lead">Lead</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
    </div>
  );
}

export default CustomerFilters;