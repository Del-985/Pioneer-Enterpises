import type { ChangeEvent } from "react";

import { availableBusinesses } from "../../shared/constants/businesses";
import type { BusinessSlug } from "../../shared/types/business";
import type {
  ContactCategory,
  ContactStatus
} from "../../shared/types/contact";

interface ContactFiltersProps {
  search: string;
  business: BusinessSlug | "shared" | "all";
  category: ContactCategory | "all";
  status: ContactStatus | "all";
  onSearchChange: (value: string) => void;
  onBusinessChange: (value: BusinessSlug | "shared" | "all") => void;
  onCategoryChange: (value: ContactCategory | "all") => void;
  onStatusChange: (value: ContactStatus | "all") => void;
}

function ContactFilters({
  search,
  business,
  category,
  status,
  onSearchChange,
  onBusinessChange,
  onCategoryChange,
  onStatusChange
}: ContactFiltersProps) {
  return (
    <div className="contact-filters">
      <label className="contact-filters__search">
        <span>Search contacts</span>
        <input
          type="search"
          value={search}
          placeholder="Name, company, email, or phone"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label>
        <span>Business</span>
        <select
          value={business}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            onBusinessChange(
              event.target.value as BusinessSlug | "shared" | "all"
            )
          }
        >
          <option value="all">All businesses</option>
          <option value="shared">Shared / Corporate</option>
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
            onCategoryChange(event.target.value as ContactCategory | "all")
          }
        >
          <option value="all">All categories</option>
          <option value="vendor">Vendor</option>
          <option value="employee">Employee</option>
          <option value="contractor">Contractor</option>
          <option value="partner">Partner</option>
          <option value="government">Government</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        <span>Status</span>
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as ContactStatus | "all")
          }
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
    </div>
  );
}

export default ContactFilters;
