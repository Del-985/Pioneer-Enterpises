import type { MetricTrendPoint } from "../../shared/types/metric";

interface MetricTrendChartProps {
  title: string;
  description: string;
  points: MetricTrendPoint[];
  valuePrefix?: string;
}

function MetricTrendChart({ title, description, points, valuePrefix = "" }: MetricTrendChartProps) {
  const maxValue = Math.max(...points.map((point) => point.value), 1);

  return (
    <section className="metric-chart">
      <div className="metric-chart__header">
        <div>
          <p className="metric-chart__eyebrow">Trend</p>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <div className="metric-chart__plot" role="img" aria-label={`${title} bar chart`}>
        {points.map((point) => (
          <div className="metric-chart__column" key={point.label}>
            <span className="metric-chart__value">{valuePrefix}{point.value.toLocaleString()}</span>
            <div className="metric-chart__track">
              <span className="metric-chart__bar" style={{ height: `${Math.max((point.value / maxValue) * 100, 4)}%` }} />
            </div>
            <span className="metric-chart__label">{point.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MetricTrendChart;
