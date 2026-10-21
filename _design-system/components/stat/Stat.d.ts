import * as React from 'react';
export interface StatProps {
  value: React.ReactNode;
  label: string;
  tone?: 'hot' | 'cool' | 'warn' | 'danger' | 'paper';
  /** sm = 28px number (mobile, compact) */
  size?: 'md' | 'sm';
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}
/** Big VT323 number + mono label. */
export function Stat(props: StatProps): JSX.Element;
export interface StatStripProps {
  /** shorthand: render these as Stats (otherwise pass Stat children) */
  items?: StatProps[];
  size?: 'md' | 'sm';
  align?: 'left' | 'center';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Hairline-divided row of Stats. */
export function StatStrip(props: StatStripProps): JSX.Element;
