// Mounts design-system components into static HTML.
//   <span data-ds="Button" data-variant="primary" data-href="#">label</span>
// Every data-* attribute becomes a prop (camelCased; "true"/"false"/numbers are parsed).
// Text content becomes children. For list props, add data-items-from-children:
//   <div data-ds="Marquee" data-variant="loud" data-items-from-children>
//     <span data-tone="hot">◆ now in beta</span><span>no ads. yet.</span>
//   </div>
// Each child becomes { text, ...its data-* }.
// Load after React, ReactDOM and _ds_bundle.js. Safe to run more than once.
(function () {
  var roots = window.__dsMountRoots || (window.__dsMountRoots = new WeakMap());

  function parse(v) {
    if (v === '' || v === 'true') return true;
    if (v === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
    return v;
  }
  function propsFrom(ds) {
    var p = {};
    Object.keys(ds).forEach(function (k) { p[k] = parse(ds[k]); });
    return p;
  }
  // read the authored markup once, before React replaces it
  function capture(el) {
    var props = propsFrom(el.dataset);
    delete props.ds;
    delete props.dsMounted;
    var children;
    if (props.itemsFromChildren) {
      delete props.itemsFromChildren;
      props.items = Array.prototype.map.call(el.children, function (c) {
        var item = propsFrom(c.dataset);
        var t = c.textContent.trim();
        if (t) item.text = t;
        return item;
      });
    } else {
      children = el.textContent.trim() || undefined;
    }
    return { props: props, children: children };
  }

  function mount() {
    var DS = window.SynHorseDesignSystem_7004e4;
    if (!DS) { console.error('ds-mount: design-system bundle not loaded'); return; }
    document.querySelectorAll('[data-ds]').forEach(function (el) {
      var name = el.dataset.ds;
      var Comp = DS[name];
      if (!Comp) { console.error('ds-mount: unknown component ' + name); return; }
      var entry = roots.get(el);
      if (!entry) {
        var authored = capture(el);
        el.textContent = '';
        if (!el.style.display) el.style.display = 'contents';
        entry = { root: ReactDOM.createRoot(el), props: authored.props, children: authored.children };
        roots.set(el, entry);
        el.dataset.dsMounted = '';
      }
      entry.root.render(React.createElement(Comp, entry.props, entry.children));
    });
  }

  if (window.__dsMountScheduled) return;
  window.__dsMountScheduled = true;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
