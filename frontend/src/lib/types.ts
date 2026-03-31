export interface Attraction {
  id: number;
  name: string;
  shortDescription: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  category: string;
  rating: number;
  isFree: boolean;
}

export interface AttractionDetail extends Attraction {
  description: string;
  workingHours: string;
}

export interface Hotel {
  id: number;
  name: string;
  shortDescription: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  stars: number;
  rating: number;
  priceFrom: number;
  hasWifi: boolean;
  hasParking: boolean;
}

export interface HotelDetail extends Hotel {
  description: string;
  latitude: number;
  longitude: number;
  phone: string;
  website: string;
  hasPool: boolean;
  hasRestaurant: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  shortDescription: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  hasDelivery: boolean;
}

export interface RestaurantDetail extends Restaurant {
  description: string;
  latitude: number;
  longitude: number;
  phone: string;
  workingHours: string;
}

export interface Event {
  id: number;
  title: string;
  shortDescription: string;
  location: string;
  address: string;
  startDate: string;
  endDate: string | null;
  imageUrl: string;
  category: string;
  isFree: boolean;
  price: number | null;
}

export interface SearchResult {
  attractions: Attraction[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  events: Event[];
}

export interface Suggestion {
  id: string;
  entityId: number;
  type: 'attraction' | 'hotel' | 'restaurant' | 'event';
  title: string;
  subtitle: string;
  address: string;
  imageUrl: string;
  rating: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
