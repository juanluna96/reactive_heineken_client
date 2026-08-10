import type { StepIndicatorProps } from './StepIndicator.types';

export const useStepIndicator = ({ current, total }: StepIndicatorProps) => {
  const steps = Array.from({ length: total }, (_, index) => ({
    key: index,
    active: index + 1 <= current,
  }));

  return { steps };
};
