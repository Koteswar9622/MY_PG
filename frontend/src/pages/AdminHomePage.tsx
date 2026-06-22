import { Link } from 'react-router-dom';

export default function AdminHomePage() {
  return (
    <section>
      <h1>Admin Dashboard</h1>
      <p className="hero-text">
        Manage users, monitor PG operations, and review room allocation performance from one central dashboard.
      </p>

      <div className="features-grid">
        <article className="feature-card">
          <h2>User Management</h2>
          <p>Assign roles, approve staff, and review tenant account activity.</p>
        </article>
        <article className="feature-card">
          <h2>Room Oversight</h2>
          <p>View room availability, monitor occupancy, and manage maintenance requests.</p>
        </article>
        <article className="feature-card">
          <h2>Reports & Metrics</h2>
          <p>Stay up to date with booking trends, room utilization, and financial performance.</p>
        </article>
        <article className="feature-card">
          <h2>Staff Coordination</h2>
          <p>Track technician assignments and coordinate housekeeping or facility support.</p>
        </article>
      </div>

      <div className="home-actions">
        <Link to="/roles" className="action-button">
          Manage Roles
        </Link>
        <Link to="/availability" className="action-button secondary">
          View Availability
        </Link>
      </div>
    </section>
  );
}
