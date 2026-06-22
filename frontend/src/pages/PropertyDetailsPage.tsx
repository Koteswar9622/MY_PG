import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyById } from '../services/api';

interface RoomInfo {
  room_type: string;
  beds: number;
  ac_available: boolean;
  price_per_month: string;
  available: boolean;
}

interface PropertyDetails {
  id: number;
  title: string;
  city: string;
  property_type: string;
  price_per_month: string;
  beds: number;
  ac_available: boolean;
  description: string;
  image_url: string;
  rooms: RoomInfo[];
}

export default function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!propertyId) return;

    setLoading(true);
    setError(null);

    fetchPropertyById(Number(propertyId))
      .then(setProperty)
      .catch((err) => setError(err.message || 'Property not found'))
      .finally(() => setLoading(false));
  }, [propertyId]);

  if (loading) {
    return <p>Loading property details…</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!property) {
    return <p className="error-message">Property not found.</p>;
  }

  return (
    <section>
      <div className="property-detail-hero">
        <img src={property.image_url} alt={property.title} />
        <div className="property-detail-copy">
          <h1>{property.title}</h1>
          <p className="subtext">
            {property.city} · {property.property_type} · {property.price_per_month}
          </p>
          <p>{property.description}</p>
        </div>
      </div>

      <div className="features-grid">
        <article className="feature-card">
          <h2>Beds</h2>
          <p>{property.beds} bed(s)</p>
        </article>
        <article className="feature-card">
          <h2>AC</h2>
          <p>{property.ac_available ? 'Available' : 'Not available'}</p>
        </article>
        <article className="feature-card">
          <h2>Room Options</h2>
          <p>{property.rooms.length} available room type(s)</p>
        </article>
      </div>

      <div className="room-list">
        <h2>Rooms</h2>
        <div className="gallery-grid">
          {property.rooms.map((room) => (
            <article key={room.room_type} className="gallery-card">
              <div className="gallery-card-body">
                <h3>{room.room_type}</h3>
                <p>{room.ac_available ? 'AC room' : 'Non-AC room'}</p>
                <p>Price: {room.price_per_month}</p>
                <p>{room.available ? 'Available now' : 'Not available'}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
