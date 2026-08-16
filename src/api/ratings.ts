import { apiRequest } from './client';
import type { CreateRatingPayload, RatingDto, RatingExistsParams } from './types';

export const createRating = (payload: CreateRatingPayload): Promise<RatingDto> =>
  apiRequest<RatingDto>('/ratings', { method: 'POST', body: JSON.stringify(payload) });

export const checkRatingExists = async ({ restaurant_id, customer_email }: RatingExistsParams): Promise<boolean> => {
  const query = new URLSearchParams({ restaurant_id, customer_email });
  const { exists } = await apiRequest<{ exists: boolean }>(`/ratings/exists?${query}`);
  return exists;
};
