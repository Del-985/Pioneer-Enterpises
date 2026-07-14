import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SnapshotItemProps {
  label: string;
  value: string | number;
  description: string;
  path: string;
  tone?: "default" | "warning" | "urgent" | "financial" | "information";
  icon?: ReactNode;
}

function SnapshotItem({
  label,
  value,
  description,
  path,
  tone = "default",
  icon
}: SnapshotItemProps) {
  return (
    <Link
      className={`snapshot-item snapshot-item--${tone}`}
      to={path}
    >
      <div className="snapshot-item__header">
        {icon ? (
          <span className="snapshot-item__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}

        <span className="snapshot-item__label">{label}</span>
      </div>

      <strong className="snapshot-item__value">{value}</strong>

      <span className="snapshot-item__description">
        {description}
      </span>
    </Link>
  );
}

export default SnapshotItem;