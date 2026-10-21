export function Tag({ tone = 'default', dot = false, pill = false, children, style }) {
  const colors = { default: 'var(--paper-3)', hot: 'var(--hot)', cool: 'var(--cool)', warn: 'var(--pop)', ok: 'var(--ok)', danger: 'var(--danger)' };
  const c = colors[tone] || colors.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px',
      fontFamily: 'var(--font-mono)', fontSize: 10, lineHeight: 1.4, letterSpacing: '.08em', textTransform: 'uppercase',
      border: '1px solid ' + c, color: tone === 'default' ? 'var(--fg-3)' : c,
      borderRadius: pill ? 999 : 0, whiteSpace: 'nowrap', ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: c, boxShadow: '0 0 8px ' + c }}></span>}
      {children}
    </span>
  );
}
