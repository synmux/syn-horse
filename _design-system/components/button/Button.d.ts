import * as React from 'react';
export interface ButtonProps {
  /** primary = filled pink; secondary = pink outline; ghost = quiet; danger = destructive, ALL CAPS */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** fully rounded — use sparingly (filters, chips) */
  pill?: boolean;
  /** full-width */
  block?: boolean;
  disabled?: boolean;
  /** render as a link */
  href?: string;
  target?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Square, hard-edged button. Hover = RGB split (or glow on primary). Press = scale .97. Labels lowercase. */
export function Button(props: ButtonProps): JSX.Element;
