import type { ContactRecord } from "../../shared/types/contact";

interface ContactDetailProps {
  contact?: ContactRecord;
}

function ContactDetail({ contact }: ContactDetailProps) {
  if (!contact) {
    return (
      <aside className="contact-detail contact-detail--empty">
        <h3>Select a contact</h3>
        <p>Choose a record from the directory to review its details.</p>
      </aside>
    );
  }

  const address = [
    contact.address,
    [contact.city, contact.state, contact.postalCode].filter(Boolean).join(", ")
  ].filter(Boolean);

  return (
    <aside className="contact-detail">
      <div className="contact-detail__header">
        <div>
          <p className="contact-detail__eyebrow">{contact.category}</p>
          <h2>
            {contact.firstName} {contact.lastName}
          </h2>
          <p>{contact.title ?? contact.company ?? "Operational contact"}</p>
        </div>

        <span className={`contact-status contact-status--${contact.status}`}>
          {contact.status}
        </span>
      </div>

      <div className="contact-detail__actions">
        {contact.phone ? <a href={`tel:${contact.phone}`}>Call</a> : null}
        {contact.email ? <a href={`mailto:${contact.email}`}>Email</a> : null}
        <button type="button">Edit</button>
      </div>

      <dl className="contact-detail__list">
        <div>
          <dt>Company</dt>
          <dd>{contact.company ?? "Not provided"}</dd>
        </div>
        <div>
          <dt>Business</dt>
          <dd>{contact.business}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{contact.email ?? "Not provided"}</dd>
        </div>
        <div>
          <dt>Primary phone</dt>
          <dd>{contact.phone ?? "Not provided"}</dd>
        </div>
        <div>
          <dt>Secondary phone</dt>
          <dd>{contact.secondaryPhone ?? "Not provided"}</dd>
        </div>
        <div>
          <dt>Address</dt>
          <dd>{address.length > 0 ? address.join(" · ") : "Not provided"}</dd>
        </div>
      </dl>

      <section className="contact-detail__notes">
        <h3>Notes</h3>
        <p>{contact.notes ?? "No notes have been added."}</p>
      </section>
    </aside>
  );
}

export default ContactDetail;
