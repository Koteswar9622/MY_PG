import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { allocateRoom, fetchAvailability } from '../services/api';

interface AvailabilityItem {
  id: number;
  room_type: string;
  beds: number;
  ac_available: boolean;
  price_per_month: string;
  description: string;
}

export default function AllocationPage() {
  const { user } = useAuth();
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailability()
      .then((data) => {
        setAvailability(data);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load availability.');
      });
  }, []);

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  async function handleAllocate() {
    if (!isAdmin) {
      setError('Only admins can allocate rooms.');
      setMessage(null);
      return;
    }

    if (selectedId === null) {
      setError('Please select a room to allocate.');
      setMessage(null);
      return;
    }

    setError(null);
    setMessage(null);

    try {
      const result = await allocateRoom({ room_id: selectedId, requested_by_role: user.role ?? 'tenant' });
      setMessage(result.message || 'Room allocated successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Allocation failed');
    }
  }

  return (
    <section>
      <h1>Room Allocation</h1>
      <p>Select a room type for tenants. Allocation is restricted to admins only.</p>

      {user ? (
        <p>Logged in as: <strong>{user.email}</strong> ({user.role})</p>
      ) : (
        <p className="error-message">Please log in as an admin to allocate rooms.</p>
      )}

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <div className="roles-table-wrap">
        <table className="roles-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Room Type</th>
              <th>Beds</th>
              <th>AC</th>
              <th>Price</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {availability.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="radio"
                    name="room"
                    checked={selectedId === item.id}
                    onChange={() => setSelectedId(item.id)}
                    disabled={!isAdmin}
                  />
                </td>
                <td>{item.room_type}</td>
                <td>{item.beds}</td>
                <td>{item.ac_available ? 'AC' : 'Non-AC'}</td>
                <td>{item.price_per_month}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleAllocate} disabled={!isAdmin}>
        Allocate Room
      </button>
    </section>
  );
}
