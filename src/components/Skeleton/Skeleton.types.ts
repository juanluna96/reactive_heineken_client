import type { CSSProperties } from 'react';

export interface SkeletonProps {
  /** CSS width value. Defaults to 100%. */
  width?: string;
  /** CSS height value. Defaults to 16px (a text-line's height). */
  height?: string;
  /** CSS border-radius value. Defaults to the theme's md radius. */
  radius?: string;
  className?: string;
  /** Escape hatch for one-off spacing (e.g. margin-top) between skeleton bars in a loading layout. */
  style?: CSSProperties;
}
