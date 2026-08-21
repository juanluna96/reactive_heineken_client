import * as S from './Skeleton.styles';
import type { SkeletonProps } from './Skeleton.types';

export const Skeleton = ({ width, height, radius, className, style }: SkeletonProps) => (
  <S.Bar $width={width} $height={height} $radius={radius} className={className} style={style} aria-hidden="true" />
);
