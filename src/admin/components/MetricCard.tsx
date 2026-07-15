import type { MetricValue } from "../../shared/types/metric";

interface MetricCardProps {
  metric: MetricValue;
}

function MetricCard({ metric }: MetricCardProps) {
  const changeLabel = `${metric.change > 0 ? "+" : ""}${metric.change}%`;

  return (
    <article className="metric-card">
      <div className="metric-card__header">
        <span className="metric-card__label">{metric.label}</span>
        <span className={`metric-card__change metric-card__change--${metric.trend}`}>{changeLabel}</span>
      </div>
      <strong className="metric-card__value">{metric.formattedValue}</strong>
      <p className="metric-card__description">{metric.description}</p>
    </article>
  );
}

export default MetricCard;
