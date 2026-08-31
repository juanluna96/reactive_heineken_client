import { useState } from 'react';
import type { StarRatingProps } from './StarRating.types';

const STAR_VALUES = [1, 2, 3, 4, 5];

export const useStarRating = ({ value, onChange, tierMessages }: StarRatingProps) => {
  const [hoverValue, setHoverValue] = useState(0);

  // Stars fill on hover; the tier message reflects the committed value only.
  const displayValue = hoverValue || value;
  const tierMessage = value > 0 ? tierMessages[value - 1] : '';

  const stars = STAR_VALUES.map((starValue) => ({
    value: starValue,
    filled: starValue <= displayValue,
    onSelect: () => onChange(starValue),
    onHover: () => setHoverValue(starValue),
  }));

  const handleHoverEnd = () => setHoverValue(0);

  return { stars, tierMessage, handleHoverEnd };
};
