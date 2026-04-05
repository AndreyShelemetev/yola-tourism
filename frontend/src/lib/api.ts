const API_BASE =
  (typeof window === 'undefined' ? process.env.INTERNAL_API_URL : undefined) ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5100';

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

import type {
  Attraction,
  AttractionDetail,
  Hotel,
  HotelDetail,
  Restaurant,
  RestaurantDetail,
  Event,
  PagedResult,
} from './types';

export async function getAttractions(params?: { category?: string; search?: string; page?: number; pageSize?: number }): Promise<PagedResult<Attraction>> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set('category', params.category);
  if (params?.search) searchParams.set('search', params.search);
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
  const qs = searchParams.toString();
  return fetchApi(`/api/attractions${qs ? `?${qs}` : ''}`);
}

export async function getAttraction(id: number): Promise<AttractionDetail> {
  return fetchApi(`/api/attractions/${id}`);
}

export async function getAttractionCategories(): Promise<string[]> {
  return fetchApi('/api/attractions/categories');
}

export async function getHotels(params?: {
  minStars?: number;
  maxPrice?: number;
  city?: string;
  minRating?: number;
  sort?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PagedResult<Hotel>> {
  const searchParams = new URLSearchParams();
  if (params?.minStars) searchParams.set('minStars', String(params.minStars));
  if (params?.maxPrice) searchParams.set('maxPrice', String(params.maxPrice));
  if (params?.city) searchParams.set('city', params.city);
  if (params?.minRating) searchParams.set('minRating', String(params.minRating));
  if (params?.sort) searchParams.set('sort', params.sort);
  if (params?.search) searchParams.set('search', params.search);
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
  const qs = searchParams.toString();
  return fetchApi(`/api/hotels${qs ? `?${qs}` : ''}`);
}

export async function getHotel(id: number): Promise<HotelDetail> {
  return fetchApi(`/api/hotels/${id}`);
}

export async function getRestaurants(params?: { cuisine?: string; search?: string; page?: number; pageSize?: number }): Promise<PagedResult<Restaurant>> {
  const searchParams = new URLSearchParams();
  if (params?.cuisine) searchParams.set('cuisine', params.cuisine);
  if (params?.search) searchParams.set('search', params.search);
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
  const qs = searchParams.toString();
  return fetchApi(`/api/restaurants${qs ? `?${qs}` : ''}`);
}

export async function getRestaurant(id: number): Promise<RestaurantDetail> {
  return fetchApi(`/api/restaurants/${id}`);
}

export async function getRestaurantCuisines(): Promise<string[]> {
  return fetchApi('/api/restaurants/cuisines');
}

export async function getEvents(params?: {
  category?: string;
  upcoming?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PagedResult<Event>> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set('category', params.category);
  if (params?.upcoming) searchParams.set('upcoming', 'true');
  if (params?.search) searchParams.set('search', params.search);
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
  const qs = searchParams.toString();
  return fetchApi(`/api/events${qs ? `?${qs}` : ''}`);
}

export async function getEvent(id: number): Promise<Event> {
  return fetchApi(`/api/events/${id}`);
}

import type { SearchResult } from './types';
import type { Suggestion } from './types';

export async function searchAll(q: string): Promise<SearchResult> {
  return fetchApi(`/api/search?q=${encodeURIComponent(q)}`);
}

export async function getSuggestions(q: string): Promise<Suggestion[]> {
  const res = await fetch(`/api/suggest?q=${encodeURIComponent(q)}`);
  if (!res.ok) return [];
  return res.json();
}
