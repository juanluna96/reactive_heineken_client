export interface RatingState {
  /** Set when picked from the restaurant's existing beer master list. */
  beerMasterId: string | null;
  /** Set instead of beerMasterId when the restaurant has no beer masters yet and the name is typed freehand. */
  beerMasterName: string;
  rating: number;
  comment: string;
  setBeerMasterId: (beerMasterId: string | null) => void;
  setBeerMasterName: (beerMasterName: string) => void;
  setRating: (rating: number) => void;
  setComment: (comment: string) => void;
  reset: () => void;
}
