export function Stat({ value, label, tone = 'hot', size = 'md', align = 'left', style }) {
  const colors = { hot: 'var(--hot)', cool: 'var(--cool)', warn: 'var(--pop)', danger: 'var(--danger)', paper: 'var(--paper)' };
  const sm = size === 'sm';
  return (
    <div style={{ background: 'var(--bg)', padding: sm ? 10 : 16, textAlign: align, ...style }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: sm ? 28 : 44, lineHeight: 1, color: colors[tone] || colors.hot }}>{value}</div>
      <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: sm ? 9 : 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{label}</div>
    </div>
  );
}

export function StatStrip({ items, size, align, children, style }) {
  const kids = items ? items.map((it, i) => <Stat key={i} size={size} align={align} {...it} />) : children;
  const n = React.Children.count(kids) || 1;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + n + ', minmax(0, 1fr))', gap: 1, background: 'var(--void-4)', border: '1px solid var(--void-4)', ...style }}>{kids}</div>
  );
}
