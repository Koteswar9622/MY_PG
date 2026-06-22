import { useEffect, useState } from 'react';
import { fetchRoles } from '../services/api';

interface Role {
  id: number;
  name: string;
  description?: string;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchRoles()
      .then((data) => {
        setRoles(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load roles from the backend.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1>Available Roles</h1>
      <p>These roles are fetched from the backend API at <code>/roles</code>.</p>

      {loading && <p>Loading roles...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="roles-table-wrap">
          {roles.length > 0 ? (
            <table className="roles-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.name}</td>
                    <td>{role.description ?? 'No description provided.'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No roles found.</p>
          )}
        </div>
      )}
    </section>
  );
}
