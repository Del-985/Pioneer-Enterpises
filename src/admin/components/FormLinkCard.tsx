import { Link } from "react-router-dom";

import type { FormDefinition } from "../../shared/types/form";

interface FormLinkCardProps {
  form: FormDefinition;
}

function FormLinkCard({ form }: FormLinkCardProps) {
  const isAvailable = form.availability === "available";

  return (
    <article
      className={`form-link-card${
        isAvailable ? "" : " form-link-card--planned"
      }`}
    >
      <div className="form-link-card__header">
        <span className="form-link-card__scope">
          {form.businessScope === "all"
            ? "All Businesses"
            : form.businessScope}
        </span>

        <span
          className={`form-link-card__status form-link-card__status--${form.availability}`}
        >
          {isAvailable ? "Available" : "Planned"}
        </span>
      </div>

      <h3 className="form-link-card__title">{form.title}</h3>
      <p className="form-link-card__description">{form.description}</p>

      {isAvailable ? (
        <Link className="form-link-card__link" to={form.path}>
          Open Form
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className="form-link-card__disabled-link">
          Form will be added later
        </span>
      )}
    </article>
  );
}

export default FormLinkCard;
