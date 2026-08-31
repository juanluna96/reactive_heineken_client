export interface RatingState {
  /** Set when picked from the restaurant's existing beer master list. */
  beerMasterId: string | null;
  /** Set instead of beerMasterId when the restaurant has no beer masters yet and the name is typed freehand. */
  beerMasterName: string;
  /** Overall experience, 1–5 (0 = not yet rated). */
  rating: number;
  /** "¿Cómo calificarías sus habilidades el día de hoy?", 1–5. */
  skillsRating: number;
  /** "¿Cómo calificarías el servicio?", 1–5. */
  serviceRating: number;
  comment: string;
  setBeerMasterId: (beerMasterId: string | null) => void;
  setBeerMasterName: (beerMasterName: string) => void;
  setRating: (rating: number) => void;
  setSkillsRating: (skillsRating: number) => void;
  setServiceRating: (serviceRating: number) => void;
  setComment: (comment: string) => void;
  reset: () => void;
}
