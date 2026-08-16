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
