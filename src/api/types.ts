export interface RestaurantDto {
  id: string;
  name: string;
}

export interface RestaurantWritePayload {
  name: string;
}

export interface BeerMasterDto {
  id: string;
  name: string;
}

export interface BeerMasterWritePayload {
  name: string;
}

export interface CreateRatingPayload {
  restaurant_id: string;
  beer_master_id?: string | null;
  beer_master_name?: string | null;
  customer_name: string;
  customer_phone: string;
  rating: number;
  skills_rating: number;
  service_rating: number;
  comment?: string | null;
}

export interface RatingExistsParams {
  restaurant_id: string;
  customer_phone: string;
}

export interface RatingDto {
  id: string;
  restaurant_id: string;
  beer_master_id: string | null;
  beer_master_name: string | null;
  customer_name: string;
  customer_phone: string;
  rating: number;
  skills_rating: number;
  service_rating: number;
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
  skills_rating: number;
  service_rating: number;
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

/** One weighted piece of the STAR SERVE composite score (see scoring). */
export interface ScoreBreakdownItemDto {
  label: string;
  weight_pct: number;
  cs: number;
  contribution: number;
  /** Growth component still waiting on the restaurant's final sales figure. */
  pending: boolean;
}

/** One bar-staff member whose score was averaged into a restaurant's score. */
export interface RestaurantStaffScoreDto {
  name: string;
  ratings_count: number;
  score: number | null;
  partial_score: number | null;
  is_partial: boolean;
}

export interface RestaurantRankingDto {
  id: string;
  name: string;
  created_at: string;
  ratings_count: number;
  average_rating: number;
  /**
   * STAR SERVE composite 0–100 (mean of the venue's bar-staff scores). null
   * when the restaurant has no ratings, or while `is_partial` is true.
   */
  score: number | null;
  /** Non-growth part of the formula (`rating_weight_pct` % of it). */
  partial_score: number | null;
  /** True when `score` is withheld only because a growth final value is unset. */
  is_partial: boolean;
  /** Share of the formula (%) the partial score represents. */
  rating_weight_pct: number;
  score_breakdown: ScoreBreakdownItemDto[];
  /**
   * The venue's bar-staff and their individual scores (their average is
   * `score`). Populated only for owner/heineken — empty otherwise.
   */
  staff_scores: RestaurantStaffScoreDto[];
}

export interface AdminBeerMasterDto {
  id: string;
  name: string;
  restaurant_id: string;
  restaurant_name: string;
}

export interface BeerMasterRankingDto {
  // null when every rating for this name was typed freehand — no registered
  // BeerMaster row to point to.
  id: string | null;
  name: string;
  restaurant_id: string;
  restaurant_name: string;
  created_at: string;
  ratings_count: number;
  average_rating: number;
  /**
   * STAR SERVE composite 0–100 for this staffer. null with zero ratings, or
   * while `is_partial` is true.
   */
  score: number | null;
  /** Non-growth part of the formula (`rating_weight_pct` % of it). */
  partial_score: number | null;
  is_partial: boolean;
  rating_weight_pct: number;
  score_breakdown: ScoreBreakdownItemDto[];
}

/** STAR SERVE scoring configuration (owner-only, /admin/scoring). */
export interface ScoreComponentDto {
  id: string;
  key: string;
  label: string;
  kind: 'rating_skills' | 'rating_service' | 'rating_experience' | 'manual';
  weight: number;
  enabled: boolean;
  position: number;
  confidence_k: number | null;
  is_growth_pct: boolean;
  ceiling_pct: number | null;
}

export interface RestaurantScoreInputDto {
  restaurant_id: string;
  component_id: string;
  /** Raw 0–100 for a non-growth component; derived growth % for a growth one. */
  value: number;
  /** Growth components only — the starting/ending sales figures. */
  initial_value: number | null;
  final_value: number | null;
}

export interface ScoringConfigRestaurantDto {
  id: string;
  name: string;
}

export interface ScoringConfigDto {
  components: ScoreComponentDto[];
  restaurants: ScoringConfigRestaurantDto[];
  restaurant_inputs: RestaurantScoreInputDto[];
}

export interface ScoreComponentCreatePayload {
  label: string;
  weight: number;
  is_growth_pct: boolean;
  ceiling_pct?: number | null;
}

export interface ScoreComponentUpdatePayload {
  label?: string;
  weight?: number;
  enabled?: boolean;
  position?: number;
  confidence_k?: number | null;
  is_growth_pct?: boolean;
  ceiling_pct?: number | null;
}

export interface RestaurantScoreInputPayload {
  restaurant_id: string;
  component_id: string;
  /** Send for a non-growth component. */
  value?: number | null;
  /** Send both for a growth component; the server derives `value`. */
  initial_value?: number | null;
  final_value?: number | null;
}

export interface RatingReviewDto {
  id: string;
  customer_name: string;
  rating: number;
  skills_rating: number;
  service_rating: number;
  comment: string | null;
  restaurant_id: string;
  restaurant_name: string;
  beer_master_name: string | null;
  created_at: string;
}

export interface RatingsDto {
  reviews: RatingReviewDto[];
  total_ratings: number;
  average_rating: number;
  average_rating_trend: number | null;
  positive_share_pct: number;
}

export type AdminRole = 'restaurant' | 'heineken' | 'owner';

export interface AdminUserDto {
  id: string;
  full_name: string;
  email: string;
  role: AdminRole;
  restaurant_id: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  // A restaurant_id, or the "heineken" sentinel — see RegisterScreen.hooks.ts.
  affiliation: string;
}

export interface ResetPasswordPayload {
  token: string;
  new_password: string;
}
