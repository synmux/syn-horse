/* @ds-bundle: {"format":4,"namespace":"SynHorseDesignSystem_7004e4","components":[{"name":"Button","sourcePath":"components/button/Button.jsx"},{"name":"Card","sourcePath":"components/card/Card.jsx"},{"name":"Console","sourcePath":"components/console/Console.jsx"},{"name":"Field","sourcePath":"components/field/Field.jsx"},{"name":"Marquee","sourcePath":"components/marquee/Marquee.jsx"},{"name":"Stat","sourcePath":"components/stat/Stat.jsx"},{"name":"StatStrip","sourcePath":"components/stat/Stat.jsx"},{"name":"StatusBar","sourcePath":"components/statusbar/StatusBar.jsx"},{"name":"Tag","sourcePath":"components/tag/Tag.jsx"}],"sourceHashes":{"components/button/Button.jsx":"94efe69ed5b8","components/card/Card.jsx":"5ed760c41557","components/console/Console.jsx":"57439460ee8f","components/field/Field.jsx":"a349d84d1c4a","components/marquee/Marquee.jsx":"0fb5bd6aabe8","components/stat/Stat.jsx":"fe0f7c4c6eb6","components/statusbar/StatusBar.jsx":"089a28735c0c","components/tag/Tag.jsx":"df6efa63ebd0","slides/deck-stage.js":"ad1c016a6256","ui_kits/_shared/ds-mount.js":"3e02d9833404","ui_kits/mobile/ios-frame.jsx":"d67eb3ffe562","ui_kits/webapp/Pages.jsx":"de0ec7d06157","ui_kits/webapp/Shell.jsx":"0a97fff58f1e","ui_kits/webapp/Tabs.jsx":"c40dcdbac160"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SynHorseDesignSystem_7004e4 = window.SynHorseDesignSystem_7004e4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/button/Button.jsx
try { (() => {
function Button({
  variant = 'secondary',
  size = 'md',
  pill = false,
  block = false,
  disabled = false,
  href,
  target,
  type = 'button',
  onClick,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const tones = {
    primary: {
      bg: 'var(--hot)',
      fg: 'var(--void)',
      bd: 'var(--hot)'
    },
    secondary: {
      bg: 'transparent',
      fg: 'var(--paper)',
      bd: 'var(--hot)'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--paper-2)',
      bd: 'var(--paper-3)'
    },
    danger: {
      bg: 'transparent',
      fg: 'var(--danger)',
      bd: 'var(--danger)'
    }
  };
  const sizes = {
    sm: ['6px 12px', 12],
    md: ['9px 16px', 14],
    lg: ['12px 22px', 15]
  };
  const t = tones[variant] || tones.secondary;
  const [pad, fs] = sizes[size] || sizes.md;
  const live = hover && !disabled;
  const isPrimary = variant === 'primary',
    isDanger = variant === 'danger';
  const El = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(El, {
    href: href,
    target: target,
    type: href ? undefined : type,
    disabled: href ? undefined : disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: block ? 'block' : 'inline-block',
      width: block ? '100%' : undefined,
      boxSizing: 'border-box',
      textAlign: 'center',
      textDecoration: 'none',
      fontFamily: 'var(--font-body)',
      fontSize: fs,
      fontWeight: 600,
      lineHeight: 1.2,
      padding: pad,
      border: '2px solid ' + t.bd,
      borderRadius: pill ? 999 : 0,
      background: isPrimary && live ? 'var(--hot-2)' : isDanger && live ? 'var(--danger)' : t.bg,
      color: isDanger && live ? 'var(--paper)' : live && variant === 'secondary' ? 'var(--hot)' : live && variant === 'ghost' ? 'var(--cool)' : t.fg,
      borderColor: live && variant === 'ghost' ? 'var(--cool)' : t.bd,
      textTransform: isDanger ? 'uppercase' : 'lowercase',
      letterSpacing: isDanger ? '.05em' : 0,
      whiteSpace: 'nowrap',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: press && !disabled ? 'scale(.97)' : 'none',
      textShadow: live && variant === 'secondary' ? 'var(--rgb-split)' : 'none',
      boxShadow: live && isPrimary ? 'var(--glow-hot)' : 'none',
      transition: 'all 80ms var(--ease-snap)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/button/Button.jsx", error: String((e && e.message) || e) }); }

// components/card/Card.jsx
try { (() => {
function Card({
  id,
  meta,
  eyebrow,
  title,
  description,
  tags = [],
  size = 'md',
  featured = false,
  onClick,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    hot: 'var(--hot)',
    cool: 'var(--cool)',
    warn: 'var(--pop)',
    ok: 'var(--ok)',
    danger: 'var(--danger)'
  };
  const sizes = {
    sm: [22, 14],
    md: [26, 16],
    lg: [32, 22]
  };
  const [titleSize, pad] = sizes[size] || sizes.md;
  const corner = meta || (id ? '◆ ' + id : null);
  const borderColor = featured || hover && onClick ? 'var(--hot)' : 'var(--void-4)';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      boxSizing: 'border-box',
      background: 'var(--bg-elev-1)',
      border: (featured ? 2 : 1) + 'px solid ' + borderColor,
      borderRadius: 'var(--radius-1)',
      padding: pad,
      boxShadow: featured ? 'var(--glow-hot)' : 'var(--inset-edge)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'border-color 80ms var(--ease-snap)',
      color: 'var(--paper)',
      ...style
    }
  }, corner && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      right: 12,
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--fg-3)',
      letterSpacing: '.08em'
    }
  }, corner), eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--fg-3)',
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: titleSize,
      lineHeight: 1.2,
      paddingRight: corner ? 72 : 0,
      paddingBottom: 6
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--fg-2)'
    }
  }, description), children, tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginTop: 12
    }
  }, tags.map((t, i) => {
    const c = tones[t.tone] || 'var(--paper-3)';
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        padding: '3px 8px',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        border: '1px solid ' + c,
        color: t.tone ? c : 'var(--fg-3)',
        whiteSpace: 'nowrap'
      }
    }, t.label);
  })));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/card/Card.jsx", error: String((e && e.message) || e) }); }

// components/console/Console.jsx
try { (() => {
function Console({
  lines = [],
  style
}) {
  const colors = {
    warn: 'var(--pop)',
    err: 'var(--danger)',
    muted: 'var(--fg-3)',
    ok: 'var(--ok)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#08011a',
      border: '1px solid var(--void-4)',
      padding: '14px 16px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      lineHeight: 1.6,
      color: 'var(--cool)',
      whiteSpace: 'pre-wrap',
      ...style
    }
  }, lines.map((l, i) => {
    const line = typeof l === 'string' ? {
      text: l,
      prompt: true
    } : l;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        color: colors[line.kind] || undefined,
        textTransform: line.kind === 'err' ? 'uppercase' : 'none'
      }
    }, line.prompt && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--hot)'
      }
    }, "> "), line.text);
  }));
}
Object.assign(__ds_scope, { Console });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/console/Console.jsx", error: String((e && e.message) || e) }); }

// components/field/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  hint,
  multiline = false,
  rows = 3,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  onChange,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  const inputStyle = {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 12px',
    background: 'var(--bg-elev-1)',
    color: 'var(--paper)',
    borderRadius: 0,
    border: '1px solid ' + (focus ? 'var(--cool)' : 'var(--paper-3)'),
    outline: focus ? '2px solid var(--cool)' : 'none',
    outlineOffset: 2,
    boxShadow: focus ? 'var(--glow-cool)' : 'none',
    fontFamily: multiline ? 'var(--font-mono)' : 'var(--font-body)',
    fontSize: multiline ? 13 : 14,
    lineHeight: 1.5,
    resize: 'vertical'
  };
  const common = {
    value,
    defaultValue,
    placeholder,
    onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: inputStyle
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 4,
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-3)'
    }
  }, label), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, common)) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, common)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 4,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/field/Field.jsx", error: String((e && e.message) || e) }); }

// components/marquee/Marquee.jsx
try { (() => {
function Marquee({
  items = [],
  duration = 30,
  variant = 'subtle',
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !ref.current.animate) return;
    const a = ref.current.animate([{
      transform: 'translateX(0)'
    }, {
      transform: 'translateX(-50%)'
    }], {
      duration: duration * 1000,
      iterations: Infinity
    });
    return () => a.cancel();
  }, [duration, items.length]);
  const loud = variant === 'loud';
  const tones = {
    hot: 'var(--hot)',
    cool: 'var(--cool)',
    warn: 'var(--pop)'
  };
  const row = items.map((it, i) => {
    const x = typeof it === 'string' ? {
      text: it
    } : it;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        padding: '0 24px',
        color: loud ? 'var(--void)' : tones[x.tone] || 'var(--fg-3)'
      }
    }, x.text);
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      background: loud ? 'var(--hot)' : 'var(--bg-elev-1)',
      borderTop: loud ? 0 : '1px solid var(--void-4)',
      borderBottom: loud ? 0 : '1px solid var(--void-4)',
      padding: '7px 0',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'inline-flex',
      whiteSpace: 'nowrap'
    }
  }, row, row));
}
Object.assign(__ds_scope, { Marquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marquee/Marquee.jsx", error: String((e && e.message) || e) }); }

// components/stat/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Stat({
  value,
  label,
  tone = 'hot',
  size = 'md',
  align = 'left',
  style
}) {
  const colors = {
    hot: 'var(--hot)',
    cool: 'var(--cool)',
    warn: 'var(--pop)',
    danger: 'var(--danger)',
    paper: 'var(--paper)'
  };
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)',
      padding: sm ? 10 : 16,
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: sm ? 28 : 44,
      lineHeight: 1,
      color: colors[tone] || colors.hot
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: 'var(--font-mono)',
      fontSize: sm ? 9 : 10,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-3)'
    }
  }, label));
}
function StatStrip({
  items,
  size,
  align,
  children,
  style
}) {
  const kids = items ? items.map((it, i) => /*#__PURE__*/React.createElement(Stat, _extends({
    key: i,
    size: size,
    align: align
  }, it))) : children;
  const n = React.Children.count(kids) || 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + n + ', minmax(0, 1fr))',
      gap: 1,
      background: 'var(--void-4)',
      border: '1px solid var(--void-4)',
      ...style
    }
  }, kids);
}
Object.assign(__ds_scope, { Stat, StatStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/stat/Stat.jsx", error: String((e && e.message) || e) }); }

// components/statusbar/StatusBar.jsx
try { (() => {
function StatusBar({
  brand = 'syn.horse',
  route,
  build,
  online = true,
  style
}) {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const item = {
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--statusbar-h)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 12px',
      background: 'rgba(13,2,33,.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--void-4)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.08em',
      color: 'var(--fg-3)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      letterSpacing: 0,
      color: 'var(--paper)',
      whiteSpace: 'nowrap'
    }
  }, "\u25C6 ", brand), route && /*#__PURE__*/React.createElement("span", {
    style: item
  }, "/ ", route), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), build && /*#__PURE__*/React.createElement("span", {
    style: item
  }, build), /*#__PURE__*/React.createElement("span", {
    style: item
  }, now.toTimeString().slice(0, 8)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: online ? 'var(--ok)' : 'var(--danger)',
      boxShadow: '0 0 8px ' + (online ? 'var(--ok)' : 'var(--danger)')
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...item,
      color: online ? 'var(--ok)' : 'var(--danger)'
    }
  }, online ? 'online' : 'offline'));
}
Object.assign(__ds_scope, { StatusBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/statusbar/StatusBar.jsx", error: String((e && e.message) || e) }); }

// components/tag/Tag.jsx
try { (() => {
function Tag({
  tone = 'default',
  dot = false,
  pill = false,
  children,
  style
}) {
  const colors = {
    default: 'var(--paper-3)',
    hot: 'var(--hot)',
    cool: 'var(--cool)',
    warn: 'var(--pop)',
    ok: 'var(--ok)',
    danger: 'var(--danger)'
  };
  const c = colors[tone] || colors.default;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 8px',
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      lineHeight: 1.4,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      border: '1px solid ' + c,
      color: tone === 'default' ? 'var(--fg-3)' : c,
      borderRadius: pill ? 999 : 0,
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: c,
      boxShadow: '0 0 8px ' + c
    }
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tag/Tag.jsx", error: String((e && e.message) || e) }); }

// slides/deck-stage.js
try { (() => {
/**
 * <deck-stage> — reusable web component for HTML decks.
 *
 * Handles:
 *  (a) speaker notes — reads <script type="application/json" id="speaker-notes">
 *      and posts {slideIndexChanged: N} to the parent window on nav.
 *  (b) keyboard navigation — ←/→, PgUp/PgDn, Space, Home/End, number keys.
 *  (c) press R to reset to slide 0 (with a tasteful keyboard hint).
 *  (d) bottom-center overlay showing slide count + hints, fades out on idle.
 *  (e) auto-scaling — inner canvas is a fixed design size (default 1920×1080)
 *      scaled with `transform: scale()` to fit the viewport, letterboxed.
 *      Set the `noscale` attribute to render at authored size (1:1) — the
 *      PPTX exporter sets this so its DOM capture sees unscaled geometry.
 *  (f) print — `@media print` lays every slide out as its own page at the
 *      design size, so the browser's Print → Save as PDF produces a clean
 *      one-page-per-slide PDF with no extra setup.
 *
 * Slides are HIDDEN, not unmounted. Non-active slides stay in the DOM with
 * `visibility: hidden` + `opacity: 0`, so their state (videos, iframes,
 * form inputs, React trees) is preserved across navigation.
 *
 * Lifecycle event — the component dispatches a `slidechange` CustomEvent on
 * itself whenever the active slide changes (including the initial mount).
 * The event bubbles and composes out of shadow DOM, so you can listen on
 * the <deck-stage> element or on document:
 *
 *   document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
 *     e.detail.index         // new 0-based index
 *     e.detail.previousIndex // previous index, or -1 on init
 *     e.detail.total         // total slide count
 *     e.detail.slide         // the new active slide element
 *     e.detail.previousSlide // the prior slide element, or null on init
 *     e.detail.reason        // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
 *   });
 *
 * Persistence: none at the deck level. The host app keeps the current slide
 * in its own URL (?slide=) and re-delivers it via location.hash on load, so a
 * bare load with no hash always starts at slide 1.
 *
 * Usage:
 *   <deck-stage width="1920" height="1080">
 *     <section data-label="Title">...</section>
 *     <section data-label="Agenda">...</section>
 *   </deck-stage>
 *
 * Slides are the direct element children of <deck-stage>. Each slide is
 * automatically tagged with:
 *   - data-screen-label="NN Label"   (1-indexed, for comment flow)
 *   - data-om-validate="no_overflowing_text,no_overlapping_text,slide_sized_text"
 */

(() => {
  const DESIGN_W_DEFAULT = 1920;
  const DESIGN_H_DEFAULT = 1080;
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no_overflowing_text,no_overlapping_text,slide_sized_text';
  const pad2 = n => String(n).padStart(2, '0');
  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
    }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    /* Tap zones for mobile — back/forward thirds like Stories.
       Transparent, no visible UI, don't block the overlay. */
    .tapzones {
      position: fixed;
      inset: 0;
      display: flex;
      z-index: 2147482000;
      pointer-events: none;
    }
    .tapzone {
      flex: 1;
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
    }
    /* Only activate tap zones on coarse pointers (touch devices). */
    @media (hover: hover) and (pointer: fine) {
      .tapzones { display: none; }
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that connectedCallback injects
       into <head> (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      ::slotted(*:last-child) {
        break-after: auto;
        page-break-after: auto;
      }
      .overlay, .tapzones { display: none !important; }
    }
  `;
  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height', 'noscale'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._index = 0;
      this._slides = [];
      this._notes = [];
      this._hideTimer = null;
      this._mouseIdleTimer = null;
      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onTapBack = this._onTapBack.bind(this);
      this._onTapForward = this._onTapForward.bind(this);
    }
    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W_DEFAULT;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H_DEFAULT;
    }
    connectedCallback() {
      this._render();
      this._loadNotes();
      this._syncPrintPageRule();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('mousemove', this._onMouseMove, {
        passive: true
      });
      // Initial collection + layout happens via slotchange, which fires on mount.
    }
    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      if (this._hideTimer) clearTimeout(this._hideTimer);
      if (this._mouseIdleTimer) clearTimeout(this._mouseIdleTimer);
    }
    attributeChangedCallback() {
      if (this._canvas) {
        this._canvas.style.width = this.designWidth + 'px';
        this._canvas.style.height = this.designHeight + 'px';
        this._canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
        this._canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
        this._fit();
        this._syncPrintPageRule();
      }
    }
    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;
      const stage = document.createElement('div');
      stage.className = 'stage';
      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      canvas.style.width = this.designWidth + 'px';
      canvas.style.height = this.designHeight + 'px';
      canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
      canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      // Tap zones (mobile): left third = back, right third = forward.
      const tapzones = document.createElement('div');
      tapzones.className = 'tapzones export-hidden';
      tapzones.setAttribute('aria-hidden', 'true');
      tapzones.setAttribute('data-noncommentable', '');
      const tzBack = document.createElement('div');
      tzBack.className = 'tapzone tapzone--back';
      const tzMid = document.createElement('div');
      tzMid.className = 'tapzone tapzone--mid';
      tzMid.style.pointerEvents = 'none';
      const tzFwd = document.createElement('div');
      tzFwd.className = 'tapzone tapzone--fwd';
      tzBack.addEventListener('click', this._onTapBack);
      tzFwd.addEventListener('click', this._onTapForward);
      tapzones.append(tzBack, tzMid, tzFwd);

      // Overlay: compact, solid black, with clickable controls.
      const overlay = document.createElement('div');
      overlay.className = 'overlay export-hidden';
      overlay.setAttribute('role', 'toolbar');
      overlay.setAttribute('aria-label', 'Deck controls');
      overlay.setAttribute('data-noncommentable', '');
      overlay.innerHTML = `
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `;
      overlay.querySelector('.prev').addEventListener('click', () => this._go(this._index - 1, 'click'));
      overlay.querySelector('.next').addEventListener('click', () => this._go(this._index + 1, 'click'));
      overlay.querySelector('.reset').addEventListener('click', () => this._go(0, 'click'));
      this._root.append(style, stage, tapzones, overlay);
      this._canvas = canvas;
      this._slot = slot;
      this._overlay = overlay;
      this._countEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');
    }

    /** @page must live in the document stylesheet — it's a no-op inside
     *  shadow DOM. Inject/update a single <head> style tag so the print
     *  sheet matches the design size and Save-as-PDF yields one slide per
     *  page with no margins. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.textContent = '@page { size: ' + this.designWidth + 'px ' + this.designHeight + 'px; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }';
    }
    _onSlotChange() {
      this._collectSlides();
      this._restoreIndex();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'init'
      });
      this._fit();
    }
    _collectSlides() {
      const assigned = this._slot.assignedElements({
        flatten: true
      });
      this._slides = assigned.filter(el => {
        // Skip template/style/script nodes even if someone slots them.
        const tag = el.tagName;
        return tag !== 'TEMPLATE' && tag !== 'SCRIPT' && tag !== 'STYLE';
      });
      this._slides.forEach((slide, i) => {
        const n = i + 1;
        // Determine a label for comment flow: prefer explicit data-label,
        // then an existing data-screen-label, then first heading, else "Slide".
        let label = slide.getAttribute('data-label');
        if (!label) {
          const existing = slide.getAttribute('data-screen-label');
          if (existing) {
            // Strip any leading number the author may have included.
            label = existing.replace(/^\s*\d+\s*/, '').trim() || existing;
          }
        }
        if (!label) {
          const h = slide.querySelector('h1, h2, h3, [data-title]');
          if (h) label = (h.textContent || '').trim().slice(0, 40);
        }
        if (!label) label = 'Slide';
        slide.setAttribute('data-screen-label', `${pad2(n)} ${label}`);

        // Validation attribute for comment flow / auto-checks.
        if (!slide.hasAttribute('data-om-validate')) {
          slide.setAttribute('data-om-validate', VALIDATE_ATTR);
        }
        slide.setAttribute('data-deck-slide', String(i));
      });
      if (this._totalEl) this._totalEl.textContent = String(this._slides.length || 1);
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
    }
    _loadNotes() {
      const tag = document.getElementById('speaker-notes');
      if (!tag) {
        this._notes = [];
        return;
      }
      try {
        const parsed = JSON.parse(tag.textContent || '[]');
        if (Array.isArray(parsed)) this._notes = parsed;
      } catch (e) {
        console.warn('[deck-stage] Failed to parse #speaker-notes JSON:', e);
        this._notes = [];
      }
    }
    _restoreIndex() {
      // The host's ?slide= param is delivered as a #<int> hash (1-indexed) on
      // the iframe src. No hash → slide 1; the deck itself keeps no position
      // state across loads.
      const h = (location.hash || '').match(/^#(\d+)$/);
      if (h) {
        const n = parseInt(h[1], 10) - 1;
        if (n >= 0 && n < this._slides.length) this._index = n;
      }
    }
    _applyIndex({
      showOverlay = true,
      broadcast = true,
      reason = 'init'
    } = {}) {
      if (!this._slides.length) return;
      const prev = this._prevIndex == null ? -1 : this._prevIndex;
      const curr = this._index;
      // Keep the iframe's own hash in sync so an in-iframe location.reload()
      // (reload banner path in viewer-handle.ts) lands on the current slide,
      // not the stale deep-link hash from initial load.
      try {
        history.replaceState(null, '', '#' + (curr + 1));
      } catch (e) {}
      this._slides.forEach((s, i) => {
        if (i === curr) s.setAttribute('data-deck-active', '');else s.removeAttribute('data-deck-active');
      });
      if (this._countEl) this._countEl.textContent = String(curr + 1);
      if (broadcast) {
        // (1) Legacy: host-window postMessage for speaker-notes renderers.
        try {
          window.postMessage({
            slideIndexChanged: curr
          }, '*');
        } catch (e) {}

        // (2) In-page CustomEvent on the <deck-stage> element itself.
        //     Bubbles and composes out of shadow DOM so slide code can listen:
        //       document.querySelector('deck-stage').addEventListener('slidechange', e => {
        //         e.detail.index, e.detail.previousIndex, e.detail.total, e.detail.slide, e.detail.reason
        //       });
        const detail = {
          index: curr,
          previousIndex: prev,
          total: this._slides.length,
          slide: this._slides[curr] || null,
          previousSlide: prev >= 0 ? this._slides[prev] || null : null,
          reason: reason // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
        };
        this.dispatchEvent(new CustomEvent('slidechange', {
          detail,
          bubbles: true,
          composed: true
        }));
      }
      this._prevIndex = curr;
      if (showOverlay) this._flashOverlay();
    }
    _flashOverlay() {
      if (!this._overlay) return;
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => {
        this._overlay.removeAttribute('data-visible');
      }, OVERLAY_HIDE_MS);
    }
    _fit() {
      if (!this._canvas) return;
      // PPTX export sets noscale so the DOM capture sees authored-size
      // geometry — the scaled canvas is in shadow DOM, so the exporter's
      // resetTransformSelector can't reach .canvas.style.transform directly.
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = 'none';
        return;
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min(vw / this.designWidth, vh / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }
    _onResize() {
      this._fit();
    }
    _onMouseMove() {
      // Keep overlay visible while mouse moves; hide after idle.
      this._flashOverlay();
    }
    _onTapBack(e) {
      e.preventDefault();
      this._go(this._index - 1, 'tap');
    }
    _onTapForward(e) {
      e.preventDefault();
      this._go(this._index + 1, 'tap');
    }
    _onKey(e) {
      // Ignore when the user is typing.
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      let handled = true;
      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
        this._go(this._index + 1, 'keyboard');
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        this._go(this._index - 1, 'keyboard');
      } else if (key === 'Home') {
        this._go(0, 'keyboard');
      } else if (key === 'End') {
        this._go(this._slides.length - 1, 'keyboard');
      } else if (key === 'r' || key === 'R') {
        this._go(0, 'keyboard');
      } else if (/^[0-9]$/.test(key)) {
        // 1..9 jump to that slide; 0 jumps to 10.
        const n = key === '0' ? 9 : parseInt(key, 10) - 1;
        if (n < this._slides.length) this._go(n, 'keyboard');
      } else {
        handled = false;
      }
      if (handled) {
        e.preventDefault();
        this._flashOverlay();
      }
    }
    _go(i, reason = 'api') {
      if (!this._slides.length) return;
      const clamped = Math.max(0, Math.min(this._slides.length - 1, i));
      if (clamped === this._index) {
        this._flashOverlay();
        return;
      }
      this._index = clamped;
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason
      });
    }

    // Public API ------------------------------------------------------------

    /** Current slide index (0-based). */
    get index() {
      return this._index;
    }
    /** Total slide count. */
    get length() {
      return this._slides.length;
    }
    /** Programmatically navigate. */
    goTo(i) {
      this._go(i, 'api');
    }
    next() {
      this._go(this._index + 1, 'api');
    }
    prev() {
      this._go(this._index - 1, 'api');
    }
    reset() {
      this._go(0, 'api');
    }
  }
  if (!customElements.get('deck-stage')) {
    customElements.define('deck-stage', DeckStage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/deck-stage.js", error: String((e && e.message) || e) }); }

// ui_kits/_shared/ds-mount.js
try { (() => {
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
    Object.keys(ds).forEach(function (k) {
      p[k] = parse(ds[k]);
    });
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
    return {
      props: props,
      children: children
    };
  }
  function mount() {
    var DS = window.SynHorseDesignSystem_7004e4;
    if (!DS) {
      console.error('ds-mount: design-system bundle not loaded');
      return;
    }
    document.querySelectorAll('[data-ds]').forEach(function (el) {
      var name = el.dataset.ds;
      var Comp = DS[name];
      if (!Comp) {
        console.error('ds-mount: unknown component ' + name);
        return;
      }
      var entry = roots.get(el);
      if (!entry) {
        var authored = capture(el);
        el.textContent = '';
        if (!el.style.display) el.style.display = 'contents';
        entry = {
          root: ReactDOM.createRoot(el),
          props: authored.props,
          children: authored.children
        };
        roots.set(el, entry);
        el.dataset.dsMounted = '';
      }
      entry.root.render(React.createElement(Comp, entry.props, entry.children));
    });
  }
  if (window.__dsMountScheduled) return;
  window.__dsMountScheduled = true;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {
    once: true
  });else mount();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/_shared/ds-mount.js", error: String((e && e.message) || e) }); }

// ui_kits/mobile/ios-frame.jsx
try { (() => {
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports: IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/webapp/Pages.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Pages.jsx — the screens. All primitives come from the design system.
const {
  Button,
  Tag,
  Card,
  Field,
  Console,
  StatStrip
} = window.SynHorseDesignSystem_7004e4;
const SYNTHS = [{
  id: 'SY-0421',
  title: 'my entire posting history',
  description: 'unhinged screenshots and drafts. updated whenever you press a wrong button.',
  tags: [{
    label: 'public',
    tone: 'hot'
  }, {
    label: '421 items'
  }]
}, {
  id: 'SY-0188',
  title: 'thoughts at 3am',
  description: 'do not open. if you opened it, do not read.',
  tags: [{
    label: 'private',
    tone: 'cool'
  }, {
    label: '12 items'
  }]
}, {
  id: 'SY-0099',
  title: 'screenshots of error messages i found beautiful',
  description: 'a curated gallery. yes, even the kernel panic.',
  tags: [{
    label: 'public',
    tone: 'hot'
  }, {
    label: '88 items'
  }, {
    label: 'pinned',
    tone: 'warn'
  }]
}, {
  id: 'SY-0042',
  title: 'the void ledger',
  description: "a running list of things i meant to post and didn't.",
  tags: [{
    label: 'draft'
  }, {
    label: '42 items'
  }]
}, {
  id: 'SY-0007',
  title: 'cursed receipts',
  description: 'every transaction that made me feel something. mostly small.',
  tags: [{
    label: 'archive'
  }, {
    label: '7 items'
  }]
}, {
  id: 'SY-0001',
  title: 'first synth',
  description: 'the original. a screenshot of a screenshot. you cannot delete this.',
  tags: [{
    label: 'pinned',
    tone: 'warn'
  }, {
    label: '1 item'
  }]
}];
function PageHead({
  sub,
  title,
  onSubClick,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sub",
    style: onSubClick ? {
      cursor: 'pointer'
    } : null,
    onClick: onSubClick
  }, sub), /*#__PURE__*/React.createElement("h1", null, title)), children && /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, children));
}
function DashboardPage({
  onOpenSynth
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    sub: "/ dashboard",
    title: "your void"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "filter"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "new synth")), /*#__PURE__*/React.createElement(StatStrip, {
    style: {
      marginBottom: 28
    },
    items: [{
      value: '421',
      label: 'synths'
    }, {
      value: '12.4k',
      label: 'impressions / wk',
      tone: 'cool'
    }, {
      value: '98',
      label: 'cursed (pinned)',
      tone: 'warn'
    }, {
      value: '3',
      label: 'drafts not posted',
      tone: 'danger'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 14
    }
  }, SYNTHS.map(s => /*#__PURE__*/React.createElement(Card, _extends({
    key: s.id
  }, s, {
    onClick: () => onOpenSynth(s)
  })))));
}
function DetailPage({
  synth,
  onBack
}) {
  const s = synth || SYNTHS[0];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    sub: '← / dashboard / ' + s.id,
    title: s.title,
    onSubClick: onBack
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "edit"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "share"), /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    size: "sm"
  }, "delete")), /*#__PURE__*/React.createElement(Tabs, {
    items: ['contents', 'history', 'danger zone'],
    active: "contents",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 320px',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 8,
      alignContent: 'start'
    }
  }, Array.from({
    length: 9
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      aspectRatio: '1',
      background: 'var(--void-2)',
      border: '1px solid var(--void-4)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, "[ image: TODO ]"))), /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "about"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--fg-2)',
      marginBottom: 18
    }
  }, s.description), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "stats"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "hot"
  }, "421 items"), /*#__PURE__*/React.createElement(Tag, {
    tone: "cool"
  }, "public"), /*#__PURE__*/React.createElement(Tag, null, "14 likes"), /*#__PURE__*/React.createElement(Tag, null, "3 forks")), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "activity"), /*#__PURE__*/React.createElement(Console, {
    lines: ['last edit: 3 minutes ago', 'created: 2024-08-11 23:41', {
      text: 'warn: 2 unsynced drafts',
      kind: 'warn'
    }, 'owner: @horse.dril']
  }))));
}
function ComposePage({
  onSave
}) {
  const [body, setBody] = React.useState('');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    sub: "/ compose",
    title: "new synth"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "save draft"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onSave
  }, "post (probably)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 320px',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "title",
    placeholder: "say something cursed"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "body",
    multiline: true,
    rows: 12,
    value: body,
    onChange: e => setBody(e.target.value),
    placeholder: "thoughts at 3am go here. nobody is reading. that's the deal.",
    hint: 'markdown supported. emoji are not. · ' + body.length + ' / 4096'
  })), /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "visibility"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "hot"
  }, "public"), /*#__PURE__*/React.createElement(Tag, null, "private"), /*#__PURE__*/React.createElement(Tag, null, "friends"))), /*#__PURE__*/React.createElement(Field, {
    label: "tags",
    placeholder: "comma, separated",
    defaultValue: "cursed, draft, unhinged"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "attached"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px dashed var(--paper-3)',
      padding: '18px 12px',
      textAlign: 'center',
      color: 'var(--fg-3)',
      fontSize: 12,
      fontFamily: 'var(--font-mono)'
    }
  }, "drop file here", /*#__PURE__*/React.createElement("br", null), "or don't")))));
}
function DangerBlock({
  title,
  body,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--danger)',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      marginBottom: 6,
      textTransform: 'uppercase',
      letterSpacing: '.04em'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--fg-2)',
      marginBottom: 10
    }
  }, body), /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    size: "sm"
  }, action));
}
function SettingsPage() {
  const h = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '.1em',
    marginBottom: 14
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    sub: "/ settings",
    title: "settings"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 28,
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      ...h,
      color: 'var(--fg-3)',
      marginBottom: 0
    }
  }, "account"), /*#__PURE__*/React.createElement(Field, {
    label: "handle",
    defaultValue: "@horse.dril"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "display name",
    defaultValue: "a horse, dril"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "bio",
    multiline: true,
    rows: 3,
    defaultValue: "i used to be normal. then i became a synth."
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      ...h,
      color: 'var(--danger)',
      marginBottom: 2
    }
  }, "danger zone"), /*#__PURE__*/React.createElement(DangerBlock, {
    title: "export everything",
    body: "a tar.gz of every synth, draft, and regret.",
    action: "export"
  }), /*#__PURE__*/React.createElement(DangerBlock, {
    title: "delete account",
    body: 'this deletes everything. it does not "freeze" or "deactivate". it ends.',
    action: "delete forever"
  }))));
}
function NotFoundPage({
  onGoHome
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '80px 0',
      maxWidth: 680,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "96",
    height: "96",
    style: {
      color: 'var(--danger)',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("use", {
    href: "../../assets/icons/pixel-sprites.svg#px-skull"
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 96,
      lineHeight: 1.1,
      color: 'var(--paper)',
      textShadow: 'var(--rgb-split)',
      marginBottom: 20
    }
  }, "404."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: 'var(--paper-2)',
      marginBottom: 12,
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      fontWeight: 600
    }
  }, "this page does not exist."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg-3)',
      marginBottom: 28
    }
  }, "never did. you are imagining it. go home."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onGoHome
  }, "go home"), /*#__PURE__*/React.createElement(Console, {
    style: {
      marginTop: 48,
      textAlign: 'left'
    },
    lines: ['GET /void/this-page HTTP/1.1', {
      text: '404 not found. nothing here. cope.',
      kind: 'err'
    }, 'redirecting in 0ms (psyche)']
  }));
}
function CommandPalette({
  onClose,
  onNavigate
}) {
  const items = [{
    section: 'go to'
  }, {
    label: 'dashboard',
    kbd: 'g d',
    go: 'dashboard'
  }, {
    label: 'new synth',
    kbd: 'g n',
    go: 'compose'
  }, {
    label: 'settings',
    kbd: 'g s',
    go: 'settings'
  }, {
    section: 'do'
  }, {
    label: 'export everything (tar.gz)',
    kbd: 'e'
  }, {
    label: 'toggle crt mode',
    kbd: 't c'
  }, {
    label: 'log out',
    kbd: 'q'
  }, {
    section: 'cursed'
  }, {
    label: 'summon a random synth',
    kbd: '?'
  }, {
    label: 'DELETE EVERYTHING',
    kbd: '⇧⌘⌫',
    danger: true
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "cp-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "cp",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "cp-input"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search",
    style: {
      color: 'var(--hot)',
      width: 18,
      height: 18
    }
  }), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    placeholder: "say a command. or don't."
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, "ESC")), /*#__PURE__*/React.createElement("div", {
    className: "cp-list"
  }, items.map((it, i) => it.section ? /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cp-section"
  }, it.section) : /*#__PURE__*/React.createElement("div", {
    key: i,
    className: 'cp-item' + (i === 1 ? ' active' : ''),
    onClick: () => {
      if (it.go) {
        onNavigate(it.go);
        onClose();
      }
    },
    style: it.danger ? {
      color: 'var(--danger)'
    } : null
  }, /*#__PURE__*/React.createElement("span", null, it.label), /*#__PURE__*/React.createElement("span", {
    className: "kbd"
  }, it.kbd))))));
}
Object.assign(window, {
  DashboardPage,
  DetailPage,
  ComposePage,
  SettingsPage,
  NotFoundPage,
  CommandPalette
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/webapp/Pages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/webapp/Shell.jsx
try { (() => {
// Shell.jsx — webapp chrome. StatusBar + Marquee come from the design system.
const {
  StatusBar: DSStatusBar,
  Marquee: DSMarquee
} = window.SynHorseDesignSystem_7004e4;
const SHELL_MARQUEE = [{
  text: '◆ 421 synths in your void',
  tone: 'hot'
}, {
  text: 'warn: vibes nominal',
  tone: 'warn'
}, '>> someone you blocked liked your post anyway', {
  text: '◆ build 0.4.2-cursed deployed',
  tone: 'cool'
}, 'tip: ⌘k to summon the palette', {
  text: '>> the kernel panics, but romantically',
  tone: 'hot'
}, {
  text: 'notice: do not feed the synth after midnight',
  tone: 'warn'
}];
function SideRail({
  active,
  onNavigate
}) {
  const items = [{
    id: 'dashboard',
    icon: 'layout-grid'
  }, {
    id: 'compose',
    icon: 'plus-square'
  }, {
    id: 'detail',
    icon: 'file-text'
  }, {
    id: 'settings',
    icon: 'settings'
  }, {
    id: '404',
    icon: 'skull'
  }];
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "siderail"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    className: 'nav-btn' + (active === it.id ? ' active' : ''),
    onClick: () => onNavigate(it.id),
    title: it.id
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": it.icon,
    style: {
      width: 18,
      height: 18
    }
  }))));
}
function Shell({
  route,
  active,
  onNavigate,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement(DSStatusBar, {
    route: route,
    build: "build 0.4.2-cursed",
    style: {
      gridColumn: '1 / -1',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement(SideRail, {
    active: active,
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-inner"
  }, children)), /*#__PURE__*/React.createElement(DSMarquee, {
    items: SHELL_MARQUEE,
    duration: 40,
    style: {
      gridColumn: '2 / -1',
      borderBottom: 0,
      display: 'flex',
      alignItems: 'center',
      padding: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fx-layer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fx-grain-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fx-scan"
  })));
}
Object.assign(window, {
  Shell,
  SideRail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/webapp/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/webapp/Tabs.jsx
try { (() => {
// Tabs.jsx — kit-local folder tabs (not yet promoted to the design system)
function Tabs({
  items,
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it,
    className: 'tab' + (active === it ? ' active' : ''),
    onClick: () => onChange(it)
  }, it)));
}
Object.assign(window, {
  Tabs
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/webapp/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Console = __ds_scope.Console;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Marquee = __ds_scope.Marquee;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.StatStrip = __ds_scope.StatStrip;

__ds_ns.StatusBar = __ds_scope.StatusBar;

__ds_ns.Tag = __ds_scope.Tag;

})();
