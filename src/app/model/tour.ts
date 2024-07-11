type TourLocation = {
  type: 'Point';
  coordinates: number[];
  address: string;
  description: string;
};

export interface Tour {
  _id: string;
  name: string;
  slug?: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage?: number;
  ratingQuantity?: number;
  price: number;
  priceDiscount?: number;
  summary?: string;
  description: string;
  imageCover: string;
  images?: string[];
  createdAt?: number;
  startDates?: number[];
  secretTour?: Boolean;
  startLocation: Location;
  locations?: TourLocation;
  guides?: string[];
  startTime?: number;
}

export interface ApiResponse {
  status: 'success' | 'fail';
  results?: number;
  data: Tour[];
}

export function sortByDuration(tour1: Tour, tour2: Tour): number {
  return tour1.duration - tour2.duration;
}
