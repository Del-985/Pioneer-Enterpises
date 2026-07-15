import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../shared/constants/routes";

function LandscapingLogin() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Customer authentication will be connected during the backend phase.");
  };

  return (
    <section className="landscaping-login-page">
      <div className="container landscaping-login-page__layout">
        <div className="landscaping-login-page__intro">
          <p className="landscaping-eyebrow">Customer Account</p>
          <h1>Your landscaping service hub.</h1>
          <p>
            This account area will provide access to requests, estimates,
            appointments, payments, documents, and completed service history.
          </p>
          <ul>
            <li>Review active service requests</li>
            <li>Approve estimates and scheduling</li>
            <li>Track upcoming and completed work</li>
            <li>Access future billing and payment tools</li>
          </ul>
        </div>

        <form className="landscaping-login-card" onSubmit={handleSubmit}>
          <div>
            <p className="landscaping-login-card__eyebrow">Sign In</p>
            <h2>Customer Login</h2>
            <p>Use the email connected to your Pioneer account.</p>
          </div>

          <label>
            <span>Email address</span>
            <input autoComplete="email" name="email" required type="email" />
          </label>

          <label>
            <span>Password</span>
            <input autoComplete="current-password" name="password" required type="password" />
          </label>

          <div className="landscaping-login-card__options">
            <label className="landscaping-login-card__remember">
              <input name="remember" type="checkbox" />
              <span>Remember me</span>
            </label>
            <button type="button">Forgot password?</button>
          </div>

          <button className="landscaping-button landscaping-button--primary" type="submit">
            Sign In
          </button>

          {message ? <p className="landscaping-login-card__message" role="status">{message}</p> : null}

          <p className="landscaping-login-card__footer">
            Need service but do not have an account?{" "}
            <Link to={ROUTES.divisions.landscaping.request}>Start a request</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LandscapingLogin;
