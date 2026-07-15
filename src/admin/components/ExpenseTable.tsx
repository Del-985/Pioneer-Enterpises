import type { Expense } from "../../shared/types/expense";

interface ExpenseTableProps {
  expenses: Expense[];
  selectedExpenseId?: string;
  onSelectExpense: (expense: Expense) => void;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function ExpenseTable({
  expenses,
  selectedExpenseId,
  onSelectExpense
}: ExpenseTableProps) {
  if (expenses.length === 0) {
    return (
      <div className="expense-empty-state">
        <h3>No matching expenses</h3>
        <p>Adjust the filters or record a new expense.</p>
      </div>
    );
  }

  return (
    <div className="expense-table-wrapper">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Vendor</th>
            <th>Business</th>
            <th>Category</th>
            <th>Status</th>
            <th className="expense-table__amount">Amount</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr
              className={
                selectedExpenseId === expense.id
                  ? "expense-table__row--selected"
                  : ""
              }
              key={expense.id}
              onClick={() => onSelectExpense(expense)}
            >
              <td>{formatDate(expense.expenseDate)}</td>
              <td>
                <strong>{expense.vendor}</strong>
                <span>{expense.description}</span>
              </td>
              <td className="expense-table__capitalize">{expense.business}</td>
              <td className="expense-table__capitalize">{expense.category}</td>
              <td>
                <span className={`expense-status expense-status--${expense.status}`}>
                  {expense.status}
                </span>
              </td>
              <td className="expense-table__amount">
                {formatCurrency(expense.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
