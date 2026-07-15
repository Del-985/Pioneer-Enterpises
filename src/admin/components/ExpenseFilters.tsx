import type { ChangeEvent } from "react";

import { availableBusinesses } from "../../shared/constants/businesses";
import type { BusinessSlug } from "../../shared/types/business";
import type {
  ExpenseCategory,
  ExpenseStatus
} from "../../shared/types/expense";

interface ExpenseFiltersProps {
  search: string;
  business: BusinessSlug | "all";
  category: ExpenseCategory | "all";
  status: ExpenseStatus | "all";
  onSearchChange: (value: string) => void;
  onBusinessChange: (value: BusinessSlug | "all") => void;
  onCategoryChange: (value: ExpenseCategory | "all") => void;
  onStatusChange: (value: ExpenseStatus | "all") => void;
}

const categories: ExpenseCategory[] = [
  "equipment",
  "fuel",
  "materials",
  "maintenance",
  "insurance",
  "marketing",
  "payroll",
  "utilities",
  "other"
];

const statuses: ExpenseStatus[] = [
  "pending",
  "approved",
  "paid",
  "rejected"
];

function ExpenseFilters({
  search,
  business,
  category,
  status,
  onSearchChange,
  onBusinessChange,
  onCategoryChange,
  onStatusChange
}: ExpenseFiltersProps) {
  return (
    <div className="expense-filters">
      <label className="expense-filters__search">
        <span>Search expenses</span>
        <input
          type="search"
          value={search}
          placeholder="Vendor, description, or reference"
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
            onCategoryChange(event.target.value as ExpenseCategory | "all")
          }
        >
          <option value="all">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Status</span>
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as ExpenseStatus | "all")
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

export default ExpenseFilters;
