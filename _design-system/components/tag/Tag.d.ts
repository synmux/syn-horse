import * as React from 'react';
export interface TagProps {
  tone?: 'default' | 'hot' | 'cool' | 'warn' | 'ok' | 'danger';
  /** glowing status dot before the label */
  dot?: boolean;
  pill?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Mono uppercase label chip — status, visibility, counts. */
export function Tag(props: TagProps): JSX.Element;
