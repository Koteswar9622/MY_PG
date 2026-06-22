const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

async function apiRequest<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    ...init,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const errorMessage = data?.error || response.statusText || 'API request failed';
    throw new Error(errorMessage);
  }

  return data as T;
}

export async function getServerStatus() {
  return apiRequest<{ message: string }>('/');
}

export async function fetchRoles() {
  return apiRequest<Array<{ id: number; name: string; description?: string }>>('/roles');
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload) {
  return apiRequest<{ message: string; email: string }>('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

export async function loginUser(payload: LoginPayload) {
  return apiRequest<{ message: string; email: string; role?: string }>('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

export async function fetchAvailability() {
  return apiRequest<Array<{ id: number; room_type: string; beds: number; ac_available: boolean; price_per_month: string; description: string }>>('/availability');
}

export async function allocateRoom(payload: { room_id: number; requested_by_role: string }) {
  return apiRequest<{ message: string }>('/allocate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

export async function fetchCities() {
  return apiRequest<Array<{ id: number; name: string; slug: string }>>('/cities');
}

export async function fetchPropertyTypes() {
  return apiRequest<Array<{ id: number; name: string; slug: string }>>('/property-types');
}

export async function fetchProperties(params: { city?: string; property_type?: string; search?: string } = {}) {
  const searchParams = new URLSearchParams();
  if (params.city) searchParams.set('city', params.city);
  if (params.property_type) searchParams.set('property_type', params.property_type);
  if (params.search) searchParams.set('search', params.search);
  const query = searchParams.toString();
  return apiRequest<Array<any>>(`/properties${query ? `?${query}` : ''}`);
}

export async function searchProperties(params: { city?: string; property_type?: string; search?: string }) {
  return fetchProperties(params);
}

export async function fetchPropertyById(propertyId: number) {
  return apiRequest<any>(`/properties/${propertyId}`);
}
