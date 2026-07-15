import { useMemo, useState } from "react";
import CustomerDetail from "../components/CustomerDetail";
import CustomerFilters from "../components/CustomerFilters";
import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";
import type { BusinessSlug } from "../../shared/types/business";
import type { Customer, CustomerStatus } from "../../shared/types/customer";

const initialCustomers: Customer[] = [
  { id: "customer-1", business: "landscaping", name: "Jordan Miller", email: "jordan@example.com", phone: "(985) 555-0142", status: "active", address: { street: "124 Pine Street", city: "Franklinton", state: "LA", postalCode: "70438" }, notes: "Prefers morning appointments.", jobCount: 3, estimateCount: 1, lastActivityAt: "2026-07-12T10:00:00", activity: [{ id: "activity-1", date: "2026-07-12T10:00:00", description: "Pressure washing job completed" }, { id: "activity-2", date: "2026-07-01T09:00:00", description: "Estimate approved" }] },
  { id: "customer-2", business: "transport", name: "Morgan Supply Co.", company: "Morgan Supply Co.", email: "dispatch@morgansupply.example", phone: "(985) 555-0198", status: "lead", address: { street: "88 Industrial Road", city: "Bogalusa", state: "LA", postalCode: "70427" }, notes: "Interested in recurring regional deliveries.", jobCount: 0, estimateCount: 2, lastActivityAt: "2026-07-14T15:15:00", activity: [{ id: "activity-3", date: "2026-07-14T15:15:00", description: "Delivery request submitted" }] },
  { id: "customer-3", business: "productions", name: "Taylor Reed", email: "taylor@example.com", status: "inactive", jobCount: 1, estimateCount: 1, lastActivityAt: "2026-05-20T12:00:00", activity: [{ id: "activity-4", date: "2026-05-20T12:00:00", description: "Production consultation completed" }] }
];

function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState(initialCustomers[0]?.id);
  const [search, setSearch] = useState("");
  const [business, setBusiness] = useState<BusinessSlug | "all">("all");
  const [status, setStatus] = useState<CustomerStatus | "all">("all");
  const [showForm, setShowForm] = useState(false);

  const visibleCustomers = useMemo(() => customers.filter((customer) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [customer.name, customer.company, customer.email, customer.phone].some((value) => value?.toLowerCase().includes(query));
    return matchesSearch && (business === "all" || customer.business === business) && (status === "all" || customer.status === status);
  }), [customers, search, business, status]);

  const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId);

  const addCustomer = (customer: Customer) => {
    setCustomers((current) => [customer, ...current]);
    setSelectedCustomerId(customer.id);
    setShowForm(false);
  };

  return (
    <section className="admin-customers-page">
      <div className="admin-page-heading"><div><p className="admin-page-heading__eyebrow">Records</p><h2 className="admin-page-heading__title">Customers</h2><p className="admin-page-heading__description">Manage customer contact information, business relationships, notes, jobs, estimates, and recent activity.</p></div><button className="customers-page__add-button" type="button" onClick={() => setShowForm(true)}>Add Customer</button></div>
      <CustomerFilters search={search} business={business} status={status} onSearchChange={setSearch} onBusinessChange={setBusiness} onStatusChange={setStatus} />
      <div className="customers-page__layout"><section className="customers-page__list"><div className="customers-page__list-header"><h2>Customer Directory</h2><span>{visibleCustomers.length} records</span></div><CustomerTable customers={visibleCustomers} selectedCustomerId={selectedCustomerId} onSelectCustomer={(customer) => setSelectedCustomerId(customer.id)} /></section><CustomerDetail customer={selectedCustomer} /></div>
      {showForm ? <CustomerForm onCancel={() => setShowForm(false)} onSubmit={addCustomer} /> : null}
    </section>
  );
}

export default Customers;