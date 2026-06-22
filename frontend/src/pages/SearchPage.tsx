import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchPropertyTypes, fetchCities, searchProperties } from '../services/api';

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

interface PropertySummary {
  id: number;
  title: string;
  city: string;
  city_slug: string;
  property_type: string;
  type_slug: string;
  price_per_month: string;
  beds: number;
  ac_available: boolean;
  description: string;
  image_url: string;
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cities, setCities] = useState<CityItem[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypeItem[]>([]);
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const city = searchParams.get('city') ?? '';
  const propertyType = searchParams.get('type') ?? '';
  const search = searchParams.get('search') ?? '';

  useEffect(() => {
    fetchCities().then(setCities).catch(() => setCities([]));
    fetchPropertyTypes().then(setPropertyTypes).catch(() => setPropertyTypes([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    searchProperties({ city, property_type: propertyType, search })
      .then((data) => {
        setProperties(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Could not load properties.');
      })
      .finally(() => setLoading(false));
  }, [city, propertyType, search]);

  const handleFilterChange = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams);
  };

  return (
    <section>
      <div className="search-header">
        <div>
          <h1>Find the best PG stays</h1>
          <p className="hero-text">Filter by city, category, AC, and room type for the right stay.</p>
        </div>
      </div>

      <div className="search-filters">
        <select value={city} onChange={(event) => handleFilterChange('city', event.target.value)}>
          <option value="">All Cities</option>
          {cities.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
        <select value={propertyType} onChange={(event) => handleFilterChange('type', event.target.value)}>
          <option value="">All Categories</option>
          {propertyTypes.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by property or locality"
          defaultValue={search}
          onBlur={(event) => handleFilterChange('search', event.target.value)}
        />
      </div>

      {loading && <p>Loading properties…</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="gallery-grid">
        {!loading && !error && properties.length === 0 && <p>No properties found.</p>}
        {properties.map((property) => (
          <article key={property.id} className="gallery-card">
            <img src={property.image_url} alt={property.title} />
            <div className="gallery-card-body">
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <p className="subtext">
                {property.city} · {property.property_type} · {property.price_per_month}
              </p>
              <Link className="action-button secondary" to={`/properties/${property.id}`}>
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
