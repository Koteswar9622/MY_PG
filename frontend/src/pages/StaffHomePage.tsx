import { Link } from 'react-router-dom';

export default function StaffHomePage() {
  return (
    <section>
      <h1>Staff & Technician Dashboard</h1>
      <p className="hero-text">
        Access task assignments, check room readiness, and keep the PG running smoothly for every tenant.
      </p>

      <div className="features-grid">
        <article className="feature-card">
          <h2>Maintenance Tasks</h2>
          <p>View pending requests and update status for room repairs and cleaning assignments.</p>
        </article>
        <article className="feature-card">
          <h2>Support Tickets</h2>
          <p>Respond quickly to tenant needs and coordinate with administration where needed.</p>
        </article>
        <article className="feature-card">
          <h2>Room Checklists</h2>
          <p>Confirm that facilities are ready, AC systems are functioning, and rooms are guest-ready.</p>
        </article>
        <article className="feature-card">
          <h2>Staff Resources</h2>
          <p>Access contact details, shift schedules, and operational guidelines.</p>
        </article>
      </div>

      <div className="home-actions">
        <Link to="/availability" className="action-button">
          Check Rooms
        </Link>
        <Link to="/allocation" className="action-button secondary">
          View Allocation
        </Link>
      </div>
    </section>
  );
}
