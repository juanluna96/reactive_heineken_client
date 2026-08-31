import { apiRequest } from './client';
import type {
  RestaurantScoreInputDto,
  RestaurantScoreInputPayload,
  ScoreComponentCreatePayload,
  ScoreComponentDto,
  ScoreComponentUpdatePayload,
  ScoringConfigDto,
} from './types';

export const fetchScoringConfig = (): Promise<ScoringConfigDto> =>
  apiRequest<ScoringConfigDto>('/admin/scoring/config');

export const createScoreComponent = (payload: ScoreComponentCreatePayload): Promise<ScoreComponentDto> =>
  apiRequest<ScoreComponentDto>('/admin/scoring/components', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateScoreComponent = (
  componentId: string,
  payload: ScoreComponentUpdatePayload,
): Promise<ScoreComponentDto> =>
  apiRequest<ScoreComponentDto>(`/admin/scoring/components/${componentId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteScoreComponent = (componentId: string): Promise<void> =>
  apiRequest<void>(`/admin/scoring/components/${componentId}`, { method: 'DELETE' });

export const setRestaurantScoreInput = (
  payload: RestaurantScoreInputPayload,
): Promise<RestaurantScoreInputDto> =>
  apiRequest<RestaurantScoreInputDto>('/admin/scoring/restaurant-inputs', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
