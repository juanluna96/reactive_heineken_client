import * as S from './StepIndicator.styles';
import { useStepIndicator } from './StepIndicator.hooks';
import type { StepIndicatorProps } from './StepIndicator.types';

export const StepIndicator = (props: StepIndicatorProps) => {
  const { label } = props;
  const { steps } = useStepIndicator(props);

  return (
    <S.Wrapper>
      <S.Dots>
        {steps.map((step) => (
          <S.Dot key={step.key} $active={step.active} />
        ))}
      </S.Dots>
      <S.Label>{label}</S.Label>
    </S.Wrapper>
  );
};
