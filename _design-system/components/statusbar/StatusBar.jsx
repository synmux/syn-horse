export function StatusBar({ brand = 'syn.horse', route, build, online = true, style }) {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const item = { textTransform: 'uppercase', whiteSpace: 'nowrap' };
  return (
    <div style={{ height: 'var(--statusbar-h)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 12px', background: 'rgba(13,2,33,.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--void-4)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', color: 'var(--fg-3)', overflow: 'hidden', ...style }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: 0, color: 'var(--paper)', whiteSpace: 'nowrap' }}>◆ {brand}</span>
      {route && <span style={item}>/ {route}</span>}
      <span style={{ flex: 1 }}></span>
      {build && <span style={item}>{build}</span>}
      <span style={item}>{now.toTimeString().slice(0, 8)}</span>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: online ? 'var(--ok)' : 'var(--danger)', boxShadow: '0 0 8px ' + (online ? 'var(--ok)' : 'var(--danger)') }}></span>
      <span style={{ ...item, color: online ? 'var(--ok)' : 'var(--danger)' }}>{online ? 'online' : 'offline'}</span>
    </div>
  );
}
