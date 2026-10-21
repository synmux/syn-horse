import * as React from 'react';
export interface CardTag { label: string; tone?: 'hot' | 'cool' | 'warn' | 'ok' | 'danger'; }
export interface CardProps {
  /** short mono id shown top-right as "◆ id", e.g. "SY-0421" */
  id?: string;
  /** plain top-right text (overrides id), e.g. a year */
  meta?: string;
  /** mono uppercase line above the title, e.g. "/ now" */
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  tags?: CardTag[];
  /** sm = 22px title (mobile), md = 26px, lg = 32px */
  size?: 'sm' | 'md' | 'lg';
  /** 2px pink border + glow — the one card you want noticed */
  featured?: boolean;
  /** makes the card interactive: pink border on hover */
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Surface card ("synth tile"): elevated void bg, hairline border, VT323 title. */
export function Card(props: CardProps): JSX.Element;
