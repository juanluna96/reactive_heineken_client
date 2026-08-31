import { AnimatePresence } from 'framer-motion';
import { errorMessageVariants } from '../../animations/variants';
import * as S from './StarRating.styles';
import { useStarRating } from './StarRating.hooks';
import type { StarRatingProps } from './StarRating.types';

export const StarRating = (props: StarRatingProps) => {
  const { label, error } = props;
  const { stars, tierMessage, handleHoverEnd } = useStarRating(props);

  return (
    <S.Field>
      <S.Question>{label}</S.Question>
      <S.Stars>
        {stars.map((star) => (
          <S.StarButton
            key={star.value}
            type="button"
            onClick={star.onSelect}
            onMouseEnter={star.onHover}
            onMouseLeave={handleHoverEnd}
            aria-label={`${star.value}`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            {star.filled ? <S.StarFilled /> : <S.StarEmpty />}
          </S.StarButton>
        ))}
      </S.Stars>
      <S.TierMessage $visible={Boolean(tierMessage)}>{tierMessage}</S.TierMessage>
      <AnimatePresence>
        {error && (
          <S.Error initial="hidden" animate="visible" exit="exit" variants={errorMessageVariants}>
            {error}
          </S.Error>
        )}
      </AnimatePresence>
    </S.Field>
  );
};
