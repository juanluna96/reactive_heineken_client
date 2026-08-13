export interface RatingState {
  beerMasterName: string;
  rating: number;
  comment: string;
  setBeerMasterName: (beerMasterName: string) => void;
  setRating: (rating: number) => void;
  setComment: (comment: string) => void;
  reset: () => void;
}
