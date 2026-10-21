export function Marquee({ items = [], duration = 30, variant = 'subtle', style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !ref.current.animate) return;
    const a = ref.current.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: duration * 1000, iterations: Infinity });
    return () => a.cancel();
  }, [duration, items.length]);
  const loud = variant === 'loud';
  const tones = { hot: 'var(--hot)', cool: 'var(--cool)', warn: 'var(--pop)' };
  const row = items.map((it, i) => {
    const x = typeof it === 'string' ? { text: it } : it;
    return <span key={i} style={{ padding: '0 24px', color: loud ? 'var(--void)' : (tones[x.tone] || 'var(--fg-3)') }}>{x.text}</span>;
  });
  return (
    <div style={{ overflow: 'hidden', background: loud ? 'var(--hot)' : 'var(--bg-elev-1)', borderTop: loud ? 0 : '1px solid var(--void-4)', borderBottom: loud ? 0 : '1px solid var(--void-4)', padding: '7px 0', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', ...style }}>
      <div ref={ref} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>{row}{row}</div>
    </div>
  );
}
