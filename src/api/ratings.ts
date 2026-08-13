import { apiRequest } from './client';
import type { CreateRatingPayload, RatingDto } from './types';

export const createRating = (payload: CreateRatingPayload): Promise<RatingDto> =>
  apiRequest<RatingDto>('/ratings', { method: 'POST', body: JSON.stringify(payload) });
