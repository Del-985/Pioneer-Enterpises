import type { Expense } from "../../shared/types/expense";

interface ExpenseDetailProps {
  expense?: Expense;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  if (!expense) {
    return (
      <aside className="expense-detail expense-detail--empty">
        <h3>Select an expense</h3>
        <p>Choose a record from the table to review its details.</p>
      </aside>
    );
  }

  return (
    <aside className="expense-detail">
      <div className="expense-detail__header">
        <div>
          <p className="expense-detail__eyebrow">Expense Record</p>
          <h2>{expense.vendor}</h2>
          <p>{expense.description}</p>
        </div>

        <strong className="expense-detail__amount">
          {formatCurrency(expense.amount)}
        </strong>
      </div>

      <dl className="expense-detail__grid">
        <div>
          <dt>Business</dt>
          <dd>{expense.business}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{expense.category}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{expense.status}</dd>
        </div>
        <div>
          <dt>Expense date</dt>
          <dd>{formatDate(expense.expenseDate)}</dd>
        </div>
        <div>
          <dt>Payment method</dt>
          <dd>{expense.paymentMethod || "Not recorded"}</dd>
        </div>
        <div>
          <dt>Reference</dt>
          <dd>{expense.referenceNumber || "None"}</dd>
        </div>
      </dl>

      <section className="expense-detail__section">
        <h3>Receipt</h3>
        <p>
          {expense.receiptAttached
            ? "A receipt is attached to this record."
            : "No receipt is attached."}
        </p>
      </section>

      <section className="expense-detail__section">
        <h3>Notes</h3>
        <p>{expense.notes || "No notes have been added."}</p>
      </section>

      <div className="expense-detail__actions">
        <button type="button">Edit Expense</button>
        {expense.status === "pending" ? (
          <button className="expense-detail__approve" type="button">
            Approve
          </button>
        ) : null}
      </div>
    </aside>
  );
}

export default ExpenseDetail;
