import type { Customer } from "../../shared/types/customer";

interface CustomerDetailProps {
  customer?: Customer;
}

function CustomerDetail({ customer }: CustomerDetailProps) {
  if (!customer) {
    return <aside className="customer-detail customer-detail--empty"><h3>Select a customer</h3><p>Choose a record to review contact information, notes, related work, and activity.</p></aside>;
  }

  const address = customer.address
    ? `${customer.address.street}, ${customer.address.city}, ${customer.address.state} ${customer.address.postalCode}`
    : "No address on file";

  return (
    <aside className="customer-detail">
      <div className="customer-detail__header">
        <div><p>{customer.business}</p><h2>{customer.name}</h2>{customer.company ? <span>{customer.company}</span> : null}</div>
        <span className={`customer-status customer-status--${customer.status}`}>{customer.status}</span>
      </div>

      <section><h3>Contact</h3><dl><div><dt>Email</dt><dd>{customer.email ?? "Not provided"}</dd></div><div><dt>Phone</dt><dd>{customer.phone ?? "Not provided"}</dd></div><div><dt>Address</dt><dd>{address}</dd></div></dl></section>
      <section><h3>Record summary</h3><div className="customer-detail__metrics"><div><strong>{customer.jobCount}</strong><span>Jobs</span></div><div><strong>{customer.estimateCount}</strong><span>Estimates</span></div></div></section>
      <section><h3>Notes</h3><p>{customer.notes ?? "No notes have been added."}</p></section>
      <section><h3>Recent activity</h3>{customer.activity.length ? <ul className="customer-activity">{customer.activity.map((item) => <li key={item.id}><strong>{new Date(item.date).toLocaleDateString()}</strong><span>{item.description}</span></li>)}</ul> : <p>No activity recorded.</p>}</section>
    </aside>
  );
}

export default CustomerDetail;