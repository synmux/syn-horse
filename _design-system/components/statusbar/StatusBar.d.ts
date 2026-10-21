import * as React from 'react';
export interface StatusBarProps {
  brand?: string;
  /** current route, shown as "/ route" */
  route?: string;
  /** build string, e.g. "build 0.4.2-cursed" */
  build?: string;
  online?: boolean;
  style?: React.CSSProperties;
}
/** 24px top chrome: brand, route, live clock, online pulse. Always visible. */
export function StatusBar(props: StatusBarProps): JSX.Element;
