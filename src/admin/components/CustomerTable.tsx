import type { Customer } from "../../shared/types/customer";

interface CustomerTableProps {
  customers: Customer[];
  selectedCustomerId?: string;
  onSelectCustomer: (customer: Customer) => void;
}

function CustomerTable({ customers, selectedCustomerId, onSelectCustomer }: CustomerTableProps) {
  if (customers.length === 0) {
    return <div className="customers-empty"><h3>No customers found</h3><p>Adjust the filters or add a new customer.</p></div>;
  }

  return (
    <div className="customer-table-wrapper">
      <table className="customer-table">
        <thead><tr><th>Customer</th><th>Business</th><th>Status</th><th>Jobs</th><th>Estimates</th><th>Last activity</th></tr></thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className={selectedCustomerId === customer.id ? "customer-table__row--selected" : ""} onClick={() => onSelectCustomer(customer)}>
              <td><strong>{customer.name}</strong><span>{customer.company ?? customer.email ?? "No secondary detail"}</span></td>
              <td className="customer-table__business">{customer.business}</td>
              <td><span className={`customer-status customer-status--${customer.status}`}>{customer.status}</span></td>
              <td>{customer.jobCount}</td><td>{customer.estimateCount}</td>
              <td>{customer.lastActivityAt ? new Date(customer.lastActivityAt).toLocaleDateString() : "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;