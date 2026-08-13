export interface RegistrationState {
  name: string;
  email: string;
  /** Selected restaurant's id, stringified (matches SelectField's string value contract). */
  restaurantId: string;
  accepted: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setRestaurantId: (restaurantId: string) => void;
  setAccepted: (accepted: boolean) => void;
  reset: () => void;
}
