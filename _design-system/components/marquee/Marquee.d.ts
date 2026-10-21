import * as React from 'react';
export interface MarqueeItem { text: string; tone?: 'hot' | 'cool' | 'warn'; }
export interface MarqueeProps {
  items?: Array<string | MarqueeItem>;
  /** seconds per loop */
  duration?: number;
  /** subtle = dark bar, toned items; loud = solid pink bar, void text */
  variant?: 'subtle' | 'loud';
  style?: React.CSSProperties;
}
/** Endless scrolling ticker of system messages. Load-bearing chrome, not decoration. */
export function Marquee(props: MarqueeProps): JSX.Element;
