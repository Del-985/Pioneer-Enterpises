import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface QuickActionProps {
  title: string;
  description: string;
  path: string;
  icon?: ReactNode;
}

function QuickAction({
  title,
  description,
  path,
  icon
}: QuickActionProps) {
  return (
    <Link className="quick-action" to={path}>
      {icon ? (
        <span className="quick-action__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}

      <span className="quick-action__content">
        <strong className="quick-action__title">{title}</strong>

        <span className="quick-action__description">
          {description}
        </span>
      </span>

      <span className="quick-action__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export default QuickAction;