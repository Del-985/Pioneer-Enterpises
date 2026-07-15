import type { ContactRecord } from "../../shared/types/contact";

interface ContactTableProps {
  contacts: ContactRecord[];
  selectedContactId?: string;
  onSelectContact: (contactId: string) => void;
}

function ContactTable({
  contacts,
  selectedContactId,
  onSelectContact
}: ContactTableProps) {
  if (contacts.length === 0) {
    return (
      <div className="contacts-empty-state">
        <h3>No contacts found</h3>
        <p>Adjust the filters or add a new operational contact.</p>
      </div>
    );
  }

  return (
    <div className="contact-table-wrapper">
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Category</th>
            <th>Business</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => {
            const isSelected = contact.id === selectedContactId;

            return (
              <tr
                className={isSelected ? "contact-table__row--selected" : ""}
                key={contact.id}
                onClick={() => onSelectContact(contact.id)}
              >
                <td>
                  <button
                    className="contact-table__name-button"
                    type="button"
                    onClick={() => onSelectContact(contact.id)}
                  >
                    <strong>
                      {contact.firstName} {contact.lastName}
                    </strong>
                    <span>{contact.email ?? "No email"}</span>
                  </button>
                </td>
                <td>{contact.company ?? "—"}</td>
                <td className="contact-table__capitalize">{contact.category}</td>
                <td className="contact-table__capitalize">{contact.business}</td>
                <td>{contact.phone ?? "—"}</td>
                <td>
                  <span
                    className={`contact-status contact-status--${contact.status}`}
                  >
                    {contact.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;
