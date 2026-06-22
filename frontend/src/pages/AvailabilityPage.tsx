import { useEffect, useState } from 'react';
import { fetchAvailability } from '../services/api';

interface AvailabilityItem {
  id: number;
  room_type: string;
  beds: number;
  ac_available: boolean;
  price_per_month: string;
}

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailability()
      .then((data) => {
        setAvailability(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load availability.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1>Room Availability</h1>
      <p>Check available PG rooms, AC options, bed count, and monthly pricing.</p>

      {loading && <p>Loading availability...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="roles-table-wrap">
          <table className="roles-table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Beds</th>
                <th>AC</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {availability.map((item) => (
                <tr key={item.id}>
                  <td>{item.room_type}</td>
                  <td>{item.beds}</td>
                  <td>{item.ac_available ? 'Yes' : 'No'}</td>
                  <td>{item.price_per_month}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
