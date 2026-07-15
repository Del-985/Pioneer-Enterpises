import { useMemo, useState } from "react";

import EstimateDetail from "../components/EstimateDetail";
import EstimateFilters from "../components/EstimateFilters";
import EstimateForm from "../components/EstimateForm";
import EstimateTable from "../components/EstimateTable";
import type { BusinessSlug } from "../../shared/types/business";
import {
  calculateEstimateTotals,
  type Estimate,
  type EstimateStatus
} from "../../shared/types/estimate";

const seedEstimates: Estimate[] = [
  {
    id: "estimate-1",
    estimateNumber: "EST-1001",
    business: "landscaping",
    customerName: "Sample Homeowner",
    customerEmail: "customer@example.com",
    title: "Property cleanup and pressure washing",
    status: "sent",
    issuedDate: "2026-07-12",
    expirationDate: "2026-08-11",
    discount: 50,
    taxRate: 0,
    notes: "Estimate includes labor, disposal, and standard cleaning supplies.",
    lineItems: [
      { id: "item-1", description: "Driveway pressure washing", quantity: 1, unitPrice: 325 },
      { id: "item-2", description: "Yard cleanup labor", quantity: 6, unitPrice: 55 },
      { id: "item-3", description: "Debris disposal", quantity: 1, unitPrice: 125 }
    ]
  },
  {
    id: "estimate-2",
    estimateNumber: "EST-1002",
    business: "transport",
    customerName: "Sample Commercial Client",
    title: "Regional equipment delivery",
    status: "approved",
    issuedDate: "2026-07-10",
    expirationDate: "2026-07-31",
    discount: 0,
    taxRate: 0,
    lineItems: [
      { id: "item-4", description: "Equipment transport", quantity: 1, unitPrice: 780 },
      { id: "item-5", description: "Loading assistance", quantity: 2, unitPrice: 85 }
    ]
  },
  {
    id: "estimate-3",
    estimateNumber: "EST-1003",
    business: "productions",
    customerName: "Sample Organization",
    title: "Event media package",
    status: "draft",
    issuedDate: "2026-07-15",
    expirationDate: "2026-08-14",
    discount: 100,
    taxRate: 0,
    lineItems: [
      { id: "item-6", description: "Event coverage", quantity: 1, unitPrice: 1200 },
      { id: "item-7", description: "Edited highlight video", quantity: 1, unitPrice: 650 }
    ]
  }
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function Estimates() {
  const [estimates, setEstimates] = useState(seedEstimates);
  const [selectedId, setSelectedId] = useState(seedEstimates[0]?.id);
  const [search, setSearch] = useState("");
  const [business, setBusiness] = useState<BusinessSlug | "all">("all");
  const [status, setStatus] = useState<EstimateStatus | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [editingEstimate, setEditingEstimate] = useState<Estimate | undefined>();

  const filteredEstimates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return estimates.filter((estimate) => {
      const matchesSearch =
        !query ||
        estimate.estimateNumber.toLowerCase().includes(query) ||
        estimate.customerName.toLowerCase().includes(query) ||
        estimate.title.toLowerCase().includes(query);
      const matchesBusiness = business === "all" || estimate.business === business;
      const matchesStatus = status === "all" || estimate.status === status;

      return matchesSearch && matchesBusiness && matchesStatus;
    });
  }, [estimates, search, business, status]);

  const selectedEstimate = estimates.find((estimate) => estimate.id === selectedId);
  const totalPipeline = estimates.reduce(
    (sum, estimate) => sum + calculateEstimateTotals(estimate).total,
    0
  );
  const approvedValue = estimates
    .filter((estimate) => estimate.status === "approved")
    .reduce((sum, estimate) => sum + calculateEstimateTotals(estimate).total, 0);

  const saveEstimate = (estimate: Estimate) => {
    setEstimates((current) => {
      const exists = current.some((item) => item.id === estimate.id);
      return exists
        ? current.map((item) => (item.id === estimate.id ? estimate : item))
        : [estimate, ...current];
    });
    setSelectedId(estimate.id);
    setShowForm(false);
    setEditingEstimate(undefined);
  };

  const updateSelectedStatus = (nextStatus: EstimateStatus) => {
    if (!selectedEstimate) return;
    saveEstimate({ ...selectedEstimate, status: nextStatus });
  };

  return (
    <section className="admin-estimates-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-page-heading__eyebrow">Sales</p>
          <h2 className="admin-page-heading__title">Estimates</h2>
          <p className="admin-page-heading__description">
            Create, review, send, and approve customer estimates across every Pioneer business.
          </p>
        </div>
        <button
          className="estimates-page__create-button"
          type="button"
          onClick={() => {
            setEditingEstimate(undefined);
            setShowForm(true);
          }}
        >
          New Estimate
        </button>
      </div>

      <div className="estimate-summary-grid">
        <article><span>Total Estimates</span><strong>{estimates.length}</strong></article>
        <article><span>Open Pipeline</span><strong>{formatCurrency(totalPipeline)}</strong></article>
        <article><span>Approved Value</span><strong>{formatCurrency(approvedValue)}</strong></article>
        <article><span>Awaiting Response</span><strong>{estimates.filter((item) => item.status === "sent").length}</strong></article>
      </div>

      <EstimateFilters
        search={search}
        business={business}
        status={status}
        onSearchChange={setSearch}
        onBusinessChange={setBusiness}
        onStatusChange={setStatus}
      />

      <div className="estimates-page__layout">
        <section className="estimates-page__list">
          <EstimateTable
            estimates={filteredEstimates}
            selectedEstimateId={selectedId}
            onSelectEstimate={(estimate) => setSelectedId(estimate.id)}
          />
        </section>

        <EstimateDetail
          estimate={selectedEstimate}
          onStatusChange={updateSelectedStatus}
          onEdit={() => {
            setEditingEstimate(selectedEstimate);
            setShowForm(true);
          }}
        />
      </div>

      {showForm ? (
        <div className="estimate-modal" role="dialog" aria-modal="true" aria-label="Estimate form">
          <div className="estimate-modal__backdrop" onClick={() => setShowForm(false)} />
          <div className="estimate-modal__content">
            <EstimateForm
              estimate={editingEstimate}
              onSubmit={saveEstimate}
              onCancel={() => {
                setShowForm(false);
                setEditingEstimate(undefined);
              }}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Estimates;
