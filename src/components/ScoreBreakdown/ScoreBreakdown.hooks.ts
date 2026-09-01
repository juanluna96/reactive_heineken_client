import { useTranslation } from '../../i18n';
import type { ScoreBreakdownProps } from './ScoreBreakdown.types';

export const useScoreBreakdown = (props: ScoreBreakdownProps) => {
  const { t } = useTranslation();
  const copy = t.scoreBreakdown;

  const format = (value: number | null): string => (value == null ? '—' : value.toFixed(1));

  const shownTotal = props.isPartial ? props.partialTotal : props.total;
  const partialHint = copy.partialHint.replace('{pct}', String(Math.round(props.ratingWeightPct)));

  return { copy, format, shownTotal, partialHint };
};
