import { Link } from 'react-router-dom';

export default function CommonHomePage() {
  return (
    <section>
      <h1>Welcome to MY-PG</h1>
      <p className="hero-text">
        Discover the most comfortable PG living experience before you sign in. Explore room availability, learn about our facilities, and register in seconds.
      </p>

      <div className="features-grid">
        <article className="feature-card">
          <h2>Smart Booking</h2>
          <p>Check room availability, compare prices, and reserve the best PG room instantly.</p>
        </article>
        <article className="feature-card">
          <h2>Trusted Security</h2>
          <p>Enjoy a safe environment with CCTV coverage, secure entry, and friendly staff.</p>
        </article>
        <article className="feature-card">
          <h2>Premium Amenities</h2>
          <p>Stay in modern rooms with AC, internet, housekeeping, and comfortable common spaces.</p>
        </article>
        <article className="feature-card">
          <h2>Easy Registration</h2>
          <p>Create your account quickly and then access dedicated dashboards for every role.</p>
        </article>
      </div>

      <div className="home-actions">
        <Link to="/register" className="action-button">
          Register Now
        </Link>
        <Link to="/login" className="action-button secondary">
          Login
        </Link>
      </div>
    </section>
  );
}
