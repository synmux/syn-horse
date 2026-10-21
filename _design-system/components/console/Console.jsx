export function Console({ lines = [], style }) {
  const colors = { warn: 'var(--pop)', err: 'var(--danger)', muted: 'var(--fg-3)', ok: 'var(--ok)' };
  return (
    <div style={{ background: '#08011a', border: '1px solid var(--void-4)', padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6, color: 'var(--cool)', whiteSpace: 'pre-wrap', ...style }}>
      {lines.map((l, i) => {
        const line = typeof l === 'string' ? { text: l, prompt: true } : l;
        return (
          <div key={i} style={{ color: colors[line.kind] || undefined, textTransform: line.kind === 'err' ? 'uppercase' : 'none' }}>
            {line.prompt && <span style={{ color: 'var(--hot)' }}>&gt; </span>}{line.text}
          </div>
        );
      })}
    </div>
  );
}
