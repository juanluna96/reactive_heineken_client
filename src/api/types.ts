export interface RestaurantDto {
  id: number;
  name: string;
}

export interface BeerMasterDto {
  id: number;
  name: string;
}

export interface CreateRatingPayload {
  restaurant_id: number;
  beer_master_id?: number | null;
  beer_master_name?: string | null;
  customer_name: string;
  customer_email: string;
  rating: number;
  comment?: string | null;
}

export interface RatingDto {
  id: number;
  restaurant_id: number;
  beer_master_id: number | null;
  beer_master_name: string | null;
  customer_name: string;
  customer_email: string;
  rating: number;
  comment: string | null;
  created_at: string;
}
