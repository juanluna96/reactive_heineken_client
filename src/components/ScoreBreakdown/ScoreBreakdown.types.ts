export interface ScoreComponentLine {
  label: string;
  weightPct: number;
  cs: number;
  contribution: number;
  /** Growth component still waiting on the restaurant's final sales figure. */
  pending: boolean;
}

export interface ScoreStaffLine {
  name: string;
  ratingsCount: number;
  /** Already resolved to the shown value (partial score when `isPartial`). */
  score: number | null;
  isPartial: boolean;
}

interface ScoreBreakdownBaseProps {
  /** Who the score belongs to — the bar-staff member or the restaurant. */
  subject: string;
  /** Full composite; null while withheld for a missing growth final value. */
  total: number | null;
  /** Non-growth part of the formula, shown when `isPartial`. */
  partialTotal: number | null;
  isPartial: boolean;
  /** Share of the formula (%) the partial total represents. */
  ratingWeightPct: number;
}

export interface ScoreBreakdownComponentsProps extends ScoreBreakdownBaseProps {
  variant: 'components';
  lines: ScoreComponentLine[];
}

export interface ScoreBreakdownStaffProps extends ScoreBreakdownBaseProps {
  variant: 'staff';
  lines: ScoreStaffLine[];
}

export type ScoreBreakdownProps = ScoreBreakdownComponentsProps | ScoreBreakdownStaffProps;
