import { Link } from 'react-router-dom';

export default function TenantHomePage() {
  return (
    <section>
      <h1>Tenant Dashboard</h1>
      <p className="hero-text">
        Welcome back to your PG space. Check your room details, allocation status, and tenant support information.
      </p>

      <div className="features-grid">
        <article className="feature-card">
          <h2>My Booking</h2>
          <p>Review your reserved room, monthly price, and move-in details.</p>
        </article>
        <article className="feature-card">
          <h2>Available Services</h2>
          <p>Request housekeeping, maintenance, or support through the tenant dashboard.</p>
        </article>
        <article className="feature-card">
          <h2>Payment Info</h2>
          <p>Track monthly rent details and stay informed about your payment schedule.</p>
        </article>
        <article className="feature-card">
          <h2>Community Updates</h2>
          <p>Get notified about events, facility hours, and important PG announcements.</p>
        </article>
      </div>

      <div className="home-actions">
        <Link to="/availability" className="action-button">
          View Available Rooms
        </Link>
        <Link to="/allocation" className="action-button secondary">
          Check Allocation
        </Link>
      </div>
    </section>
  );
}
