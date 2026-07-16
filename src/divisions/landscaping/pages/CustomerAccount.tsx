import { Link } from "react-router-dom";

import { ROUTES } from "../../../shared/constants/routes";

const accountStats = [
  { label: "Open Quotes", value: "2", detail: "1 awaiting review" },
  { label: "Upcoming Services", value: "1", detail: "Next visit in 4 days" },
  { label: "Active Requests", value: "1", detail: "Currently being reviewed" },
  { label: "Outstanding Balance", value: "$0", detail: "No payment due" }
];

const upcomingServices = [
  {
    id: "job-1004",
    service: "Lawn & Property Maintenance",
    date: "July 22, 2026",
    window: "8:00 AM – 12:00 PM",
    status: "Scheduled"
  }
];

const recentQuotes = [
  {
    id: "EST-2041",
    service: "Pressure Washing",
    amount: "$425.00",
    status: "Ready to Review"
  },
  {
    id: "EST-2038",
    service: "Mulch Installation",
    amount: "$780.00",
    status: "Draft"
  }
];

const recentActivity = [
  "Quote EST-2041 was prepared for review.",
  "Your lawn maintenance visit was scheduled.",
  "Service request SR-1182 was received."
];

function CustomerAccount() {
  return (
    <section className="landscaping-account-page">
      <div className="container landscaping-account-page__shell">
        <header className="landscaping-account-hero">
          <div>
            <p className="landscaping-eyebrow">Customer Account</p>
            <h1>Welcome back, Jordan.</h1>
            <p>
              Review requests, quotes, scheduled work, account activity, and
              future billing tools from one place.
            </p>
          </div>

          <div className="landscaping-account-hero__actions">
            <Link
              className="landscaping-button landscaping-button--primary"
              to={ROUTES.divisions.landscaping.request}
            >
              Request Service
            </Link>
            <Link
              className="landscaping-button landscaping-button--secondary"
              to={ROUTES.divisions.landscaping.quote}
            >
              Request Quote
            </Link>
          </div>
        </header>

        <section className="landscaping-account-stats" aria-label="Account summary">
          {accountStats.map((stat) => (
            <article key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.detail}</small>
            </article>
          ))}
        </section>

        <div className="landscaping-account-grid">
          <section className="landscaping-account-panel landscaping-account-panel--wide">
            <div className="landscaping-account-panel__heading">
              <div>
                <p>Schedule</p>
                <h2>Upcoming Service</h2>
              </div>
              <Link to={ROUTES.divisions.landscaping.request}>Manage Requests</Link>
            </div>

            {upcomingServices.map((service) => (
              <article className="landscaping-account-service" key={service.id}>
                <div>
                  <span className="landscaping-account-badge landscaping-account-badge--scheduled">
                    {service.status}
                  </span>
                  <h3>{service.service}</h3>
                  <p>{service.date}</p>
                  <small>{service.window}</small>
                </div>
                <button type="button">View Details</button>
              </article>
            ))}
          </section>

          <section className="landscaping-account-panel">
            <div className="landscaping-account-panel__heading">
              <div>
                <p>Account</p>
                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="landscaping-account-actions">
              <Link to={ROUTES.divisions.landscaping.request}>New Service Request</Link>
              <Link to={ROUTES.divisions.landscaping.quote}>Request an Estimate</Link>
              <Link to={ROUTES.divisions.landscaping.contact}>Send a Message</Link>
              <button type="button">Update Profile</button>
            </div>
          </section>

          <section className="landscaping-account-panel landscaping-account-panel--wide">
            <div className="landscaping-account-panel__heading">
              <div>
                <p>Sales</p>
                <h2>Recent Quotes</h2>
              </div>
              <Link to={ROUTES.divisions.landscaping.quote}>Request Another Quote</Link>
            </div>

            <div className="landscaping-account-table" role="table" aria-label="Recent quotes">
              <div className="landscaping-account-table__row landscaping-account-table__row--head" role="row">
                <span role="columnheader">Estimate</span>
                <span role="columnheader">Service</span>
                <span role="columnheader">Amount</span>
                <span role="columnheader">Status</span>
              </div>
              {recentQuotes.map((quote) => (
                <button className="landscaping-account-table__row" key={quote.id} type="button" role="row">
                  <strong role="cell">{quote.id}</strong>
                  <span role="cell">{quote.service}</span>
                  <span role="cell">{quote.amount}</span>
                  <span role="cell" className="landscaping-account-badge">{quote.status}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="landscaping-account-panel">
            <div className="landscaping-account-panel__heading">
              <div>
                <p>Updates</p>
                <h2>Recent Activity</h2>
              </div>
            </div>

            <ul className="landscaping-account-activity">
              {recentActivity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="landscaping-account-panel landscaping-account-panel--full">
            <div className="landscaping-account-panel__heading">
              <div>
                <p>Future Modules</p>
                <h2>Account Tools</h2>
              </div>
            </div>

            <div className="landscaping-account-modules">
              <article>
                <strong>Invoices & Payments</strong>
                <span>View balances, invoices, receipts, and future payment options.</span>
                <small>Backend phase</small>
              </article>
              <article>
                <strong>Messages</strong>
                <span>Keep service conversations tied to requests and jobs.</span>
                <small>Backend phase</small>
              </article>
              <article>
                <strong>Service History</strong>
                <span>Review completed work, recurring visits, and prior estimates.</span>
                <small>Backend phase</small>
              </article>
              <article>
                <strong>Profile & Preferences</strong>
                <span>Manage addresses, contact methods, and account settings.</span>
                <small>Backend phase</small>
              </article>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default CustomerAccount;
