import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';

const STAR_VALUES = [1, 2, 3, 4, 5];
const MAX_COMMENT_LENGTH = 140;
const DEFAULT_BEER_MASTER_NAME = 'Mark';

export const useRateBeerMasterScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [beerMasterName, setBeerMasterName] = useState(DEFAULT_BEER_MASTER_NAME);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const displayRating = hoverRating || rating;
  const tierMessage = rating > 0 ? t.rateBeerMaster.tierMessages[rating - 1] : '';

  const isNameValid = beerMasterName.trim().length > 0;
  const isRatingValid = rating > 0;
  const isFormValid = isNameValid && isRatingValid;

  const nameError = submitted && !isNameValid ? t.rateBeerMaster.errors.nameRequired : undefined;
  const ratingError = submitted && !isRatingValid ? t.rateBeerMaster.errors.ratingRequired : undefined;

  const handleStarHoverEnd = () => {
    setHoverRating(0);
  };

  const stars = STAR_VALUES.map((value) => ({
    value,
    filled: value <= displayRating,
    onSelect: () => setRating(value),
    onHover: () => setHoverRating(value),
  }));

  const handleBack = () => {
    navigate(ROUTES.watchExperience);
  };

  const handleBeerMasterNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBeerMasterName(event.target.value);
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value.slice(0, MAX_COMMENT_LENGTH));
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      setSubmitted(true);
      return;
    }
    navigate(ROUTES.thankYou);
  };

  return {
    t,
    beerMasterName,
    nameError,
    stars,
    tierMessage,
    ratingError,
    isFormValid,
    comment,
    maxCommentLength: MAX_COMMENT_LENGTH,
    handleBack,
    handleBeerMasterNameChange,
    handleStarHoverEnd,
    handleCommentChange,
    handleSubmit,
  };
};
