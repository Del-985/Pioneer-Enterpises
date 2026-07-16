import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "../../../shared/constants/routes";
import AuthLayout from "./AuthLayout";
import PasswordField from "./PasswordField";

function passwordScore(value: string) {
  return [value.length >= 8, /[A-Z]/.test(value), /[a-z]/.test(value), /\d/.test(value), /[^A-Za-z0-9]/.test(value)].filter(Boolean).length;
}

function Register() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const score = useMemo(() => passwordScore(password), [password]);
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Excellent"];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    navigate(ROUTES.divisions.landscaping.verifyEmail);
  };

  return (
    <AuthLayout
      eyebrow="Create Account"
      title="Register for the customer portal"
      description="Create credentials now and connect them to your Pioneer customer record later."
      footer={<p>Already have an account? <Link to={ROUTES.divisions.landscaping.login}>Sign in</Link></p>}
    >
      <form className="landscaping-auth-form" onSubmit={handleSubmit}>
        <div className="landscaping-auth-form__grid">
          <label className="landscaping-auth-field"><span>First name</span><input autoComplete="given-name" required name="firstName" /></label>
          <label className="landscaping-auth-field"><span>Last name</span><input autoComplete="family-name" required name="lastName" /></label>
        </div>
        <label className="landscaping-auth-field"><span>Email address</span><input autoComplete="email" required type="email" name="email" /></label>
        <label className="landscaping-auth-field"><span>Phone number</span><input autoComplete="tel" required type="tel" name="phone" /></label>
        <PasswordField label="Password" name="password" autoComplete="new-password" value={password} onChange={setPassword} />
        <div className="landscaping-password-strength" aria-live="polite">
          <div>{Array.from({ length: 5 }, (_, index) => <span className={index < score ? "is-active" : ""} key={index} />)}</div>
          <small>{labels[score]}</small>
        </div>
        <PasswordField label="Confirm password" name="confirmPassword" autoComplete="new-password" value={confirmPassword} onChange={setConfirmPassword} />
        <p className="landscaping-auth-requirements">Use at least 8 characters. Uppercase, lowercase, numbers, and symbols improve strength.</p>
        <label className="landscaping-auth-check landscaping-auth-check--terms">
          <input required type="checkbox" />
          <span>I agree to the customer portal terms and privacy policy.</span>
        </label>
        {error ? <p className="landscaping-auth-error" role="alert">{error}</p> : null}
        <button className="landscaping-auth-submit" type="submit">Create Account</button>
      </form>
    </AuthLayout>
  );
}

export default Register;
