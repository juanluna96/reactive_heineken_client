import type { ReactNode } from 'react';

export interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  showIcon?: boolean;
}
