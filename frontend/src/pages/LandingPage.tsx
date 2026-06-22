import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProperties, fetchCities, fetchPropertyTypes } from '../services/api';

interface CityItem {
  id: number;
  name: string;
  slug: string;
}

interface PropertyTypeItem {
  id: number;
  name: string;
  slug: string;
}

interface AvailabilityItem {
  id: number;
  title: string;
  description: string;
  city: string;
  city_slug: string;
  property_type: string;
  type_slug: string;
  price_per_month: string;
  beds: number;
  ac_available: boolean;
  image_url: string;
}

export default function LandingPage() {
  const [cities, setCities] = useState<CityItem[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypeItem[]>([]);
  const [featured, setFeatured] = useState<AvailabilityItem[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCities().then(setCities).catch(() => setCities([]));
    fetchPropertyTypes().then(setPropertyTypes).catch(() => setPropertyTypes([]));
    fetchProperties().then(setFeatured).catch(() => setFeatured([]));
  }, []);

  const heroText = useMemo(
    () =>
      'Find the best PG, service apartment, hotel, or rental near your city with just one search.',
    []
  );

  return (
    <section className="landing-page">
      <div className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">PGO-style Booking</p>
          <h1>Book your PG, hostel or serviced stay in minutes.</h1>
          <p className="hero-text">{heroText}</p>

          <div className="search-panel">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search city, locality, or property type"
            />
            <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
              <option value="">All Categories</option>
              {propertyTypes.map((type) => (
                <option key={type.id} value={type.slug}>
                  {type.name}
                </option>
              ))}
            </select>
            <select value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)}>
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city.id} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </select>
            <Link
              className="action-button"
              to={`/availability?city=${selectedCity}&property_type=${selectedType}&search=${encodeURIComponent(search)}`}
            >
              Search PGs
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
            alt="PG accommodation"
          />
        </div>
      </div>

      <div className="quick-links">
        {cities.slice(0, 6).map((city) => (
          <Link key={city.id} to={`/availability?city=${city.slug}`} className="quick-link-card">
            {city.name}
          </Link>
        ))}
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <h2>Choose from many properties</h2>
          <p>Browse multiple PGs, apartments, and rentals without leaving the app.</p>
        </article>
        <article className="feature-card">
          <h2>Fast booking experience</h2>
          <p>Quick search, transparent prices, and instant room availability.</p>
        </article>
        <article className="feature-card">
          <h2>Safe stays</h2>
          <p>Properties with secure entry, hygiene, and trusted host verification.</p>
        </article>
      </div>

      <div className="featured-properties">
        <h2>Featured stays</h2>
        <div className="gallery-grid">
          {featured.slice(0, 3).map((property) => (
            <article key={property.id} className="gallery-card">
              <img src={property.image_url} alt={property.title} />
              <div className="gallery-card-body">
                <h3>{property.title}</h3>
                <p>{property.description}</p>
                <p className="subtext">
                  {property.city} · {property.property_type} · {property.price_per_month}
                </p>
                <Link className="action-button secondary" to={`/properties/${property.id}`}>
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
