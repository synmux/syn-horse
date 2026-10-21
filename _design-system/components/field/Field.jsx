export function Field({ label, hint, multiline = false, rows = 3, type = 'text', value, defaultValue, placeholder, onChange, style }) {
  const [focus, setFocus] = React.useState(false);
  const inputStyle = {
    display: 'block', width: '100%', boxSizing: 'border-box', padding: '10px 12px',
    background: 'var(--bg-elev-1)', color: 'var(--paper)', borderRadius: 0,
    border: '1px solid ' + (focus ? 'var(--cool)' : 'var(--paper-3)'),
    outline: focus ? '2px solid var(--cool)' : 'none', outlineOffset: 2, boxShadow: focus ? 'var(--glow-cool)' : 'none',
    fontFamily: multiline ? 'var(--font-mono)' : 'var(--font-body)', fontSize: multiline ? 13 : 14, lineHeight: 1.5, resize: 'vertical',
  };
  const common = { value, defaultValue, placeholder, onChange, onFocus: () => setFocus(true), onBlur: () => setFocus(false), style: inputStyle };
  return (
    <label style={{ display: 'block', ...style }}>
      {label && <span style={{ display: 'block', marginBottom: 4, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{label}</span>}
      {multiline ? <textarea rows={rows} {...common}></textarea> : <input type={type} {...common} />}
      {hint && <span style={{ display: 'block', marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>{hint}</span>}
    </label>
  );
}
