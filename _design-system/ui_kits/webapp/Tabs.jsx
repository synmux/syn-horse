// Tabs.jsx — kit-local folder tabs (not yet promoted to the design system)
function Tabs({ items, active, onChange }) {
  return (
    <div className="tabs">
      {items.map(it => (
        <button key={it} className={'tab' + (active === it ? ' active' : '')} onClick={() => onChange(it)}>{it}</button>
      ))}
    </div>
  );
}

Object.assign(window, { Tabs });
