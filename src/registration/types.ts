export interface RegistrationState {
  name: string;
  email: string;
  /** Selected restaurant's id, stringified (matches SelectField's string value contract). */
  restaurantId: string;
  accepted: boolean;
  /**
   * Independent, optional opt-in (separate checkbox from `accepted`) authorizing
   * this activation's results to be emailed to the participant — counsel
   * guidance, 2026-08-21. Never required for `isFormValid`.
   */
  resultsConsent: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setRestaurantId: (restaurantId: string) => void;
  setAccepted: (accepted: boolean) => void;
  setResultsConsent: (resultsConsent: boolean) => void;
  reset: () => void;
}
