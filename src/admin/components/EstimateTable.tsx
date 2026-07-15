import {
  calculateEstimateTotals,
  type Estimate
} from "../../shared/types/estimate";

interface EstimateTableProps {
  estimates: Estimate[];
  selectedEstimateId?: string;
  onSelectEstimate: (estimate: Estimate) => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function EstimateTable({
  estimates,
  selectedEstimateId,
  onSelectEstimate
}: EstimateTableProps) {
  if (estimates.length === 0) {
    return (
      <div className="estimate-empty-state">
        <h3>No estimates found</h3>
        <p>Adjust the filters or create a new estimate.</p>
      </div>
    );
  }

  return (
    <div className="estimate-table-wrapper">
      <table className="estimate-table">
        <thead>
          <tr>
            <th>Estimate</th>
            <th>Customer</th>
            <th>Issued</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {estimates.map((estimate) => {
            const total = calculateEstimateTotals(estimate).total;

            return (
              <tr
                key={estimate.id}
                className={
                  estimate.id === selectedEstimateId
                    ? "estimate-table__row estimate-table__row--selected"
                    : "estimate-table__row"
                }
                onClick={() => onSelectEstimate(estimate)}
              >
                <td>
                  <button type="button" className="estimate-table__select">
                    <strong>{estimate.estimateNumber}</strong>
                    <span>{estimate.title}</span>
                  </button>
                </td>
                <td>{estimate.customerName}</td>
                <td>{formatDate(estimate.issuedDate)}</td>
                <td>
                  <span
                    className={`estimate-status estimate-status--${estimate.status}`}
                  >
                    {estimate.status}
                  </span>
                </td>
                <td className="estimate-table__amount">
                  {formatCurrency(total)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EstimateTable;
