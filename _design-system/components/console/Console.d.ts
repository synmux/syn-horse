import * as React from 'react';
export interface ConsoleLine { text: string; prompt?: boolean; kind?: 'warn' | 'err' | 'muted' | 'ok'; }
export interface ConsoleProps {
  /** strings render as prompt lines; objects allow kind + prompt control */
  lines?: Array<string | ConsoleLine>;
  style?: React.CSSProperties;
}
/** Terminal-style log block. Errors render ALL CAPS in danger red. */
export function Console(props: ConsoleProps): JSX.Element;
