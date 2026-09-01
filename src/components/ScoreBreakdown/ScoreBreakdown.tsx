import * as S from './ScoreBreakdown.styles';
import { useScoreBreakdown } from './ScoreBreakdown.hooks';
import type { ScoreBreakdownProps } from './ScoreBreakdown.types';

export const ScoreBreakdown = (props: ScoreBreakdownProps) => {
  const { copy, format, shownTotal, partialHint } = useScoreBreakdown(props);

  if (props.variant === 'components') {
    return (
      <S.Root>
        <S.Subject>{props.subject}</S.Subject>
        <S.Intro>{copy.componentsIntro}</S.Intro>

        <S.TableScroll>
          <S.Table>
            <S.HeaderRow>
              <span>{copy.columnComponent}</span>
              <span>{copy.columnWeight}</span>
              <span>{copy.columnCs}</span>
              <span>{copy.columnContribution}</span>
            </S.HeaderRow>
            {props.lines.map((line) => (
              <S.Row key={line.label} $muted={line.pending}>
                <S.Label>
                  <S.LabelText>{line.label}</S.LabelText>
                  {line.pending && <S.PendingTag>{copy.pendingTag}</S.PendingTag>}
                </S.Label>
                <span>{line.weightPct}%</span>
                <span>{line.pending ? '—' : line.cs.toFixed(1)}</span>
                <span>{line.contribution.toFixed(1)}</span>
              </S.Row>
            ))}
          </S.Table>
        </S.TableScroll>

        <S.TotalRow>
          <S.TotalLabel>{props.isPartial ? copy.partialTotalLabel : copy.totalLabel}</S.TotalLabel>
          <S.TotalValue $muted={props.isPartial}>{format(shownTotal)}</S.TotalValue>
        </S.TotalRow>
        {props.isPartial && <S.PartialHint>{partialHint}</S.PartialHint>}
      </S.Root>
    );
  }

  return (
    <S.Root>
      <S.Subject>{props.subject}</S.Subject>
      <S.Intro>{copy.staffIntro}</S.Intro>

      {props.lines.length === 0 ? (
        <S.EmptyHint>{copy.noStaff}</S.EmptyHint>
      ) : (
        <>
          <S.TableScroll>
            <S.Table>
              <S.StaffHeaderRow>
                <span>{copy.columnStaff}</span>
                <span>{copy.columnScore}</span>
              </S.StaffHeaderRow>
              {props.lines.map((line) => (
                <S.StaffRow key={line.name} $muted={line.isPartial}>
                  <S.Label>
                    <S.LabelText>{line.name}</S.LabelText>
                    {line.isPartial && <S.PendingTag>{copy.pendingTag}</S.PendingTag>}
                  </S.Label>
                  <span>{format(line.score)}</span>
                </S.StaffRow>
              ))}
            </S.Table>
          </S.TableScroll>
          <S.CountRow>{copy.staffCountLabel.replace('{count}', String(props.lines.length))}</S.CountRow>
        </>
      )}

      <S.TotalRow>
        <S.TotalLabel>{props.isPartial ? copy.partialAverageLabel : copy.staffAverageLabel}</S.TotalLabel>
        <S.TotalValue $muted={props.isPartial}>{format(shownTotal)}</S.TotalValue>
      </S.TotalRow>
      {props.isPartial && <S.PartialHint>{partialHint}</S.PartialHint>}
    </S.Root>
  );
};
