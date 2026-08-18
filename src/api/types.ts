export interface RestaurantDto {
  id: string;
  name: string;
}

export interface BeerMasterDto {
  id: string;
  name: string;
}

export interface CreateRatingPayload {
  restaurant_id: string;
  beer_master_id?: string | null;
  beer_master_name?: string | null;
  customer_name: string;
  customer_email: string;
  rating: number;
  comment?: string | null;
}

export interface RatingExistsParams {
  restaurant_id: string;
  customer_email: string;
}

export interface RatingDto {
  id: string;
  restaurant_id: string;
  beer_master_id: string | null;
  beer_master_name: string | null;
  customer_name: string;
  customer_email: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface DashboardTotalsDto {
  total_ratings: number;
  average_rating: number;
  restaurants_count: number;
  beer_masters_count: number;
  ratings_trend_pct: number | null;
  new_restaurants_in_period: number;
  new_beer_masters_in_period: number;
}

export interface RatingDistributionItemDto {
  rating: number;
  count: number;
}

export interface RatingsOverTimePointDto {
  date: string;
  count: number;
  average_rating: number | null;
}

export interface TopBeerMasterDto {
  name: string;
  restaurant_name: string;
  ratings_count: number;
  average_rating: number;
}

export interface RecentRatingDto {
  id: string;
  customer_name: string;
  restaurant_name: string;
  beer_master_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface DashboardDto {
  totals: DashboardTotalsDto;
  rating_distribution: RatingDistributionItemDto[];
  ratings_over_time: RatingsOverTimePointDto[];
  top_beer_masters: TopBeerMasterDto[];
  recent_ratings: RecentRatingDto[];
}

export interface AdminUserDto {
  id: string;
  full_name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
}
