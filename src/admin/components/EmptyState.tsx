import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

function EmptyState({
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="admin-empty-state">
      <h4 className="admin-empty-state__title">{title}</h4>

      <p className="admin-empty-state__description">
        {description}
      </p>

      {action ? (
        <div className="admin-empty-state__action">
          {action}
        </div>
      ) : null}
    </div>
  );
}

export default EmptyState;