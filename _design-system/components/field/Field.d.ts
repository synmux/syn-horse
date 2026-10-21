import * as React from 'react';
export interface FieldProps {
  /** mono uppercase label above the input */
  label?: string;
  /** small mono helper text below */
  hint?: string;
  /** render a textarea (mono font) instead of an input */
  multiline?: boolean;
  rows?: number;
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}
/** Labelled text input / textarea. Focus = cyan outline + glow. */
export function Field(props: FieldProps): JSX.Element;
