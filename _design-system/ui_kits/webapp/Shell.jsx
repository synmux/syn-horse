// Shell.jsx — webapp chrome. StatusBar + Marquee come from the design system.
const { StatusBar: DSStatusBar, Marquee: DSMarquee } = window.SynHorseDesignSystem_7004e4;

const SHELL_MARQUEE = [
  { text: '◆ 421 synths in your void', tone: 'hot' },
  { text: 'warn: vibes nominal', tone: 'warn' },
  '>> someone you blocked liked your post anyway',
  { text: '◆ build 0.4.2-cursed deployed', tone: 'cool' },
  'tip: ⌘k to summon the palette',
  { text: '>> the kernel panics, but romantically', tone: 'hot' },
  { text: 'notice: do not feed the synth after midnight', tone: 'warn' },
];

function SideRail({ active, onNavigate }) {
  const items = [
    { id: 'dashboard', icon: 'layout-grid' },
    { id: 'compose', icon: 'plus-square' },
    { id: 'detail', icon: 'file-text' },
    { id: 'settings', icon: 'settings' },
    { id: '404', icon: 'skull' },
  ];
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="siderail">
      {items.map(it => (
        <button key={it.id} className={'nav-btn' + (active === it.id ? ' active' : '')} onClick={() => onNavigate(it.id)} title={it.id}>
          <i data-lucide={it.icon} style={{ width: 18, height: 18 }}></i>
        </button>
      ))}
    </div>
  );
}

function Shell({ route, active, onNavigate, children }) {
  return (
    <div className="shell">
      <DSStatusBar route={route} build="build 0.4.2-cursed" style={{ gridColumn: '1 / -1', zIndex: 50 }} />
      <SideRail active={active} onNavigate={onNavigate} />
      <main className="main"><div className="main-inner">{children}</div></main>
      <DSMarquee items={SHELL_MARQUEE} duration={40} style={{ gridColumn: '2 / -1', borderBottom: 0, display: 'flex', alignItems: 'center', padding: 0 }} />
      <div className="fx-layer">
        <div className="fx-grain-bg"></div>
        <div className="fx-scan"></div>
      </div>
    </div>
  );
}

Object.assign(window, { Shell, SideRail });
