// Tile.jsx — synth card
function Tile({ id, title, desc, tags = [], onClick }) {
  return (
    <div className="tile" onClick={onClick}>
      <div className="id">◆ {id}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="tile-tags">
        {tags.map((t, i) => (
          <span key={i} className={"tag " + (t.kind ? "tag-" + t.kind : "")}>
            {t.label || t}
          </span>
        ))}
      </div>
    </div>
  )
}

function Stat({ n, label, color }) {
  return (
    <div className="stat">
      <div className="num" style={color ? { color } : null}>
        {n}
      </div>
      <div className="lab">{label}</div>
    </div>
  )
}

function Tabs({ items, active, onChange }) {
  return (
    <div className="tabs">
      {items.map((it) => (
        <button key={it} className={"tab" + (active === it ? " active" : "")} onClick={() => onChange(it)}>
          {it}
        </button>
      ))}
    </div>
  )
}

function Console({ lines }) {
  return (
    <div className="console">
      {lines.map((l, i) => (
        <div key={i} className={l.kind ? "line-" + l.kind : ""}>
          {l.prompt && <span className="prompt">&gt; </span>}
          {l.text}
        </div>
      ))}
    </div>
  )
}

Object.assign(window, { Tile, Stat, Tabs, Console })
