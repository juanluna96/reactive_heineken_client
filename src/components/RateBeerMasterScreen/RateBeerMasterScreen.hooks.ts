import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError, fetchBeerMasters, createRating } from '../../api';
import type { BeerMasterDto } from '../../api';
import { useTranslation } from '../../i18n';
import { useRatingStore } from '../../rating';
import { useRegistrationStore } from '../../registration';
import { ROUTES } from '../../routes';
import type { AutocompleteFieldOption } from '../AutocompleteField';
import { toE164 } from '../PhoneField';

const MAX_COMMENT_LENGTH = 140;

export const useRateBeerMasterScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const restaurantId = useRegistrationStore((state) => state.restaurantId);
  const customerName = useRegistrationStore((state) => state.name);
  const customerPhone = useRegistrationStore((state) => state.phone);
  const customerPhoneCountry = useRegistrationStore((state) => state.phoneCountry);

  const beerMasterId = useRatingStore((state) => state.beerMasterId);
  const setBeerMasterId = useRatingStore((state) => state.setBeerMasterId);
  const beerMasterName = useRatingStore((state) => state.beerMasterName);
  const setBeerMasterName = useRatingStore((state) => state.setBeerMasterName);
  const rating = useRatingStore((state) => state.rating);
  const setRating = useRatingStore((state) => state.setRating);
  const skillsRating = useRatingStore((state) => state.skillsRating);
  const setSkillsRating = useRatingStore((state) => state.setSkillsRating);
  const serviceRating = useRatingStore((state) => state.serviceRating);
  const setServiceRating = useRatingStore((state) => state.setServiceRating);
  const comment = useRatingStore((state) => state.comment);
  const setComment = useRatingStore((state) => state.setComment);

  const [submitted, setSubmitted] = useState(false);
  const [beerMasters, setBeerMasters] = useState<BeerMasterDto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  // Reached without going through registration (e.g. a direct URL, or a
  // reload after the flow) — the customer/restaurant fields would be empty
  // and the submit would fail server-side. Send them back to fill it in.
  useEffect(() => {
    if (!restaurantId || !customerName.trim() || !customerPhone.trim()) {
      navigate(ROUTES.registration, { replace: true });
    }
  }, [restaurantId, customerName, customerPhone, navigate]);

  useEffect(() => {
    if (!restaurantId) return;

    let cancelled = false;
    fetchBeerMasters(restaurantId)
      .then((data) => {
        if (!cancelled) setBeerMasters(data);
      })
      .catch(() => {
        if (!cancelled) setBeerMasters([]);
      });
    return () => {
      cancelled = true;
    };
  }, [restaurantId]);

  // Suggestions from the restaurant's existing Stars Server list — typing a
  // name that isn't among them is still accepted (AutocompleteField's
  // allowCustomValue) and may get auto-registered server-side.
  const beerMasterOptions: AutocompleteFieldOption[] = beerMasters.map((master) => ({
    value: master.id,
    label: master.name,
  }));
  const selectedBeerMasterId = beerMasterId ?? '';

  const isNameValid = beerMasterId !== null || beerMasterName.trim().length > 0;
  const areRatingsValid = rating > 0 && skillsRating > 0 && serviceRating > 0;
  const isFormValid = isNameValid && areRatingsValid;

  const nameError = submitted && !isNameValid ? t.rateBeerMaster.errors.nameRequired : undefined;
  const ratingErrorFor = (value: number) =>
    submitted && value === 0 ? t.rateBeerMaster.errors.ratingRequired : undefined;

  const handleBack = () => {
    navigate(ROUTES.registration);
  };

  const handleBeerMasterSelect = (value: string) => {
    setBeerMasterId(value === '' ? null : value);
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value.slice(0, MAX_COMMENT_LENGTH));
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(undefined);
    try {
      await createRating({
        restaurant_id: restaurantId,
        beer_master_id: beerMasterId,
        beer_master_name: beerMasterId ? null : beerMasterName.trim(),
        customer_name: customerName,
        customer_phone: toE164(customerPhoneCountry, customerPhone),
        rating,
        skills_rating: skillsRating,
        service_rating: serviceRating,
        comment: comment.trim() ? comment.trim() : null,
      });
      navigate(ROUTES.thankYou);
    } catch (err) {
      const isAlreadyRated = err instanceof ApiError && err.status === 409;
      setSubmitError(isAlreadyRated ? t.rateBeerMaster.errors.alreadyRated : t.rateBeerMaster.errors.submitFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    t,
    beerMasterOptions,
    selectedBeerMasterId,
    beerMasterName,
    nameError,
    tierMessages: t.rateBeerMaster.tierMessages,
    rating,
    setRating,
    experienceError: ratingErrorFor(rating),
    skillsRating,
    setSkillsRating,
    skillsError: ratingErrorFor(skillsRating),
    serviceRating,
    setServiceRating,
    serviceError: ratingErrorFor(serviceRating),
    isFormValid,
    isSubmitting,
    submitError,
    comment,
    maxCommentLength: MAX_COMMENT_LENGTH,
    handleBack,
    setBeerMasterName,
    handleBeerMasterSelect,
    handleCommentChange,
    handleSubmit,
  };
};
