export function Card({ id, meta, eyebrow, title, description, tags = [], size = 'md', featured = false, onClick, children, style }) {
  const [hover, setHover] = React.useState(false);
  const tones = { hot: 'var(--hot)', cool: 'var(--cool)', warn: 'var(--pop)', ok: 'var(--ok)', danger: 'var(--danger)' };
  const sizes = { sm: [22, 14], md: [26, 16], lg: [32, 22] };
  const [titleSize, pad] = sizes[size] || sizes.md;
  const corner = meta || (id ? '◆ ' + id : null);
  const borderColor = featured || (hover && onClick) ? 'var(--hot)' : 'var(--void-4)';
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', boxSizing: 'border-box', background: 'var(--bg-elev-1)', border: (featured ? 2 : 1) + 'px solid ' + borderColor,
        borderRadius: 'var(--radius-1)', padding: pad, boxShadow: featured ? 'var(--glow-hot)' : 'var(--inset-edge)', cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 80ms var(--ease-snap)', color: 'var(--paper)', ...style,
      }}>
      {corner && <div style={{ position: 'absolute', top: 8, right: 12, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '.08em' }}>{corner}</div>}
      {eyebrow && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>{eyebrow}</div>}
      {title && <div style={{ fontFamily: 'var(--font-display)', fontSize: titleSize, lineHeight: 1.2, paddingRight: corner ? 72 : 0, paddingBottom: 6 }}>{title}</div>}
      {description && <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-2)' }}>{description}</div>}
      {children}
      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
          {tags.map((t, i) => {
            const c = tones[t.tone] || 'var(--paper-3)';
            return <span key={i} style={{ padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', border: '1px solid ' + c, color: t.tone ? c : 'var(--fg-3)', whiteSpace: 'nowrap' }}>{t.label}</span>;
          })}
        </div>
      )}
    </div>
  );
}
