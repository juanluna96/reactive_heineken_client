export interface RegistrationState {
  name: string;
  /** National phone number as the customer typed it (no dial-code prefix). */
  phone: string;
  /** ISO 3166-1 alpha-2 code of the selected dial-code country (see PhoneField). */
  phoneCountry: string;
  /** Selected restaurant's id, stringified (matches SelectField's string value contract). */
  restaurantId: string;
  accepted: boolean;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setPhoneCountry: (phoneCountry: string) => void;
  setRestaurantId: (restaurantId: string) => void;
  setAccepted: (accepted: boolean) => void;
  reset: () => void;
}
