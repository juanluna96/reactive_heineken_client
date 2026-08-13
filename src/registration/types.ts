export interface RegistrationState {
  name: string;
  email: string;
  restaurant: string;
  accepted: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setRestaurant: (restaurant: string) => void;
  setAccepted: (accepted: boolean) => void;
  reset: () => void;
}
