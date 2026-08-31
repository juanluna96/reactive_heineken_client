export interface StarRatingProps {
  /** Question shown above the stars. */
  label: string;
  /** Current value, 1–5 (0 = not yet rated). */
  value: number;
  onChange: (value: number) => void;
  /** Five messages, one per star value, shown under the stars once a value is picked. */
  tierMessages: string[];
  error?: string;
}
