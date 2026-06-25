// Shell.jsx — webapp chrome: status bar, side rail, marquee, fx layer
const { useState, useEffect } = React

function StatusBar({ route }) {
  const [t, setT] = useState(new Date())
  useEffect(() => {
    const i = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(i)
  }, [])
  const time = t.toTimeString().slice(0, 8)
  return (
    <div className="statusbar">
      <span className="brand">◆ syn.horse</span>
      <span className="item">/ {route}</span>
      <span className="spacer"></span>
      <span className="item">build 0.4.2-cursed</span>
      <span className="item">{time}</span>
      <span className="pulse"></span>
      <span className="item" style={{ color: "var(--ok)" }}>
        ONLINE
      </span>
    </div>
  )
}

function SideRail({ active, onNavigate }) {
  const items = [
    { id: "dashboard", icon: "layout-grid" },
    { id: "compose", icon: "plus-square" },
    { id: "detail", icon: "file-text" },
    { id: "settings", icon: "settings" },
    { id: "404", icon: "skull" }
  ]
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  })
  return (
    <div className="siderail">
      {items.map((it) => (
        <button
          key={it.id}
          className={"nav-btn" + (active === it.id ? " active" : "")}
          onClick={() => onNavigate(it.id)}
          title={it.id}
        >
          <i data-lucide={it.icon} style={{ width: 18, height: 18 }}></i>
        </button>
      ))}
    </div>
  )
}

function Marquee() {
  const items = [
    { t: "◆ 421 synths in your void", c: "hot" },
    { t: "WARN: vibes nominal", c: "pop" },
    { t: ">> someone you blocked liked your post anyway", c: "" },
    { t: "◆ build 0.4.2-cursed deployed", c: "cool" },
    { t: "TIP: ⌘K to summon the palette", c: "" },
    { t: ">> the kernel panics, but romantically", c: "hot" },
    { t: "NOTICE: do not feed the synth after midnight", c: "pop" }
  ]
  const all = [...items, ...items, ...items]
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((x, i) => (
          <span key={i} className={x.c}>
            {x.t}
          </span>
        ))}
      </div>
    </div>
  )
}

function Shell({ route, active, onNavigate, children }) {
  return (
    <div className="shell">
      <StatusBar route={route} />
      <SideRail active={active} onNavigate={onNavigate} />
      <main className="main">
        <div className="main-inner">{children}</div>
      </main>
      <Marquee />
      <div className="fx-layer">
        <div className="fx-grain-bg"></div>
        <div className="fx-scan"></div>
      </div>
    </div>
  )
}

Object.assign(window, { Shell, StatusBar, SideRail, Marquee })
