/* syn.horse — palette + konami + main app */

const { useState: useS, useEffect: useE, useRef: useR, useMemo: useM } = React

// ─── Command palette ──────────────────────────────────────────
function Palette({ onClose, go }) {
  const [q, setQ] = useS("")
  const [sel, setSel] = useS(0)
  const inputRef = useR(null)
  useE(() => {
    inputRef.current && inputRef.current.focus()
  }, [])
  const filtered = useM(() => {
    if (!q) return window.COMMANDS
    const ql = q.toLowerCase()
    return window.COMMANDS.filter((c) => c.label.toLowerCase().includes(ql) || c.desc.toLowerCase().includes(ql))
  }, [q])
  useE(() => {
    setSel(0)
  }, [q])

  const exec = (c) => {
    if (c.ext) window.open(c.ext, "_blank")
    else go(c.id)
    onClose()
  }
  const onKey = (e) => {
    if (e.key === "Escape") {
      onClose()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSel((s) => Math.min(filtered.length - 1, s + 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSel((s) => Math.max(0, s - 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      filtered[sel] && exec(filtered[sel])
    }
  }

  return (
    <div className="palette-bg" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <div className="input-wrap">
          <span className="pr">▶</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="type to navigate. esc to dismiss."
          />
          <span className="hint">{filtered.length} results</span>
        </div>
        <div className="results">
          {filtered.map((c, i) => (
            <div
              key={c.id}
              className={"row " + (i === sel ? "sel" : "")}
              onMouseEnter={() => setSel(i)}
              onClick={() => exec(c)}
            >
              <span className="ic">[{c.ic}]</span>
              <div>
                <div className="label">{c.label}</div>
                <div className="desc">{c.desc}</div>
              </div>
              <span className="ic">↵</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="row" style={{ color: "var(--paper-3)" }}>
              <span className="ic">—</span>
              <div>
                <div className="label">nothing matches.</div>
                <div className="desc">try less.</div>
              </div>
              <span></span>
            </div>
          )}
        </div>
        <div className="footer">
          <span>↑↓ navigate · ↵ open · esc dismiss</span>
          <span>syn.horse · v0.3.1</span>
        </div>
      </div>
    </div>
  )
}

// ─── Konami ───────────────────────────────────────────────────
function Konami({ onUntrigger }) {
  useE(() => {
    const t = setTimeout(onUntrigger, 3200)
    return () => clearTimeout(t)
  }, [])
  return <div className="konami">◆ THE HORSE IS LOOSE ◆</div>
}

// ─── Main app ─────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  variant: "calm",
  accent: "hot",
  scanStrength: 0.05,
  grain: true,
  ca: true,
  lowercaseAll: false,
  status: "shouting at git"
} /*EDITMODE-END*/

const ACCENT_MAP = {
  hot: "#ff71ce",
  cool: "#01cdfe",
  pop: "#fffb96",
  lilac: "#b967ff"
}

function App({ tweaks, setTweak }) {
  const [route, setRoute] = useS("home")
  const [post, setPost] = useS(null)
  const [palette, setPalette] = useS(false)
  const [konami, setKonami] = useS(false)

  // global keys
  useE(() => {
    const onKey = (e) => {
      if (e.key === "/" && !palette && !(e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) {
        e.preventDefault()
        setPalette(true)
      } else if (e.key === "Escape") {
        setPalette(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [palette])

  // konami
  useE(() => {
    const seq = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a"
    ]
    let idx = 0
    const onKey = (e) => {
      const k = e.key
      if (k.toLowerCase() === seq[idx].toLowerCase()) {
        idx++
        if (idx === seq.length) {
          setKonami(true)
          idx = 0
        }
      } else {
        idx = k.toLowerCase() === seq[0].toLowerCase() ? 1 : 0
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const go = (r) => {
    if (r === "404") {
      setRoute("404")
      return
    }
    setRoute(r)
    window.scrollTo({ top: 0, behavior: "instant" })
  }
  const openPost = (p) => {
    setPost(p)
    setRoute("post")
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  const labels = {
    home: "01 Home",
    now: "02 Now",
    projects: "03 Projects",
    blog: "04 Blog",
    post: "05 Post",
    cv: "06 CV",
    contact: "07 Contact",
    domains: "08 Domains",
    404: "09 404"
  }

  // accent css var injection
  const rootStyle = {
    "--accent-color": ACCENT_MAP[tweaks.accent] || ACCENT_MAP.hot,
    "--scan-strength": tweaks.scanStrength
  }

  const cls = [tweaks.ca ? "ca-on" : "ca-off", tweaks.lowercaseAll ? "lc-all" : ""].join(" ")

  let homeEl
  if (tweaks.variant === "feral") homeEl = <window.HomeFeral go={go} status={tweaks.status} />
  else if (tweaks.variant === "unhinged") homeEl = <window.HomeUnhinged go={go} status={tweaks.status} />
  else homeEl = <window.HomeCalm go={go} status={tweaks.status} />

  return (
    <div data-screen-label={labels[route]} style={rootStyle} className={cls}>
      <window.StatusBar route={route === "post" ? `blog/${post?.slug || ""}` : route} />
      <window.Nav active={route} go={go} />

      {route === "home" && homeEl}
      {route === "now" && <window.Now status={tweaks.status} />}
      {route === "projects" && <window.Projects />}
      {route === "blog" && <window.Blog openPost={openPost} />}
      {route === "post" && <window.Post post={post} back={() => go("blog")} />}
      {route === "cv" && <window.CV />}
      {route === "contact" && <window.Contact />}
      {route === "domains" && <window.Domains />}
      {route === "404" && <window.NotFound go={go} />}

      {palette && <Palette onClose={() => setPalette(false)} go={go} />}
      {konami && <Konami onUntrigger={() => setKonami(false)} />}

      {/* Tweaks panel */}
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="home variant" />
        <window.TweakRadio
          value={tweaks.variant}
          options={[
            { value: "calm", label: "calm" },
            { value: "feral", label: "feral" },
            { value: "unhinged", label: "unhinged" }
          ]}
          onChange={(v) => setTweak("variant", v)}
        />
        <window.TweakSection label="accent" />
        <window.TweakRadio
          value={tweaks.accent}
          options={[
            { value: "hot", label: "pink" },
            { value: "cool", label: "cyan" },
            { value: "pop", label: "lemon" },
            { value: "lilac", label: "lilac" }
          ]}
          onChange={(v) => setTweak("accent", v)}
        />
        <window.TweakSection label="effects" />
        <window.TweakSlider
          label="scanlines"
          value={tweaks.scanStrength}
          min={0}
          max={0.18}
          step={0.01}
          onChange={(v) => setTweak("scanStrength", v)}
        />
        <window.TweakToggle label="grain" value={tweaks.grain} onChange={(v) => setTweak("grain", v)} />
        <window.TweakToggle
          label="chromatic aberration on hover"
          value={tweaks.ca}
          onChange={(v) => setTweak("ca", v)}
        />
        <window.TweakSection label="copy" />
        <window.TweakToggle
          label="force lowercase everywhere"
          value={tweaks.lowercaseAll}
          onChange={(v) => setTweak("lowercaseAll", v)}
        />
        <window.TweakText label="/now status string" value={tweaks.status} onChange={(v) => setTweak("status", v)} />
        <window.TweakSection label="navigate" />
        <window.TweakButton label="show 404" onClick={() => go("404")} />
        <window.TweakButton label="trigger konami toast" onClick={() => setKonami(true)} />
      </window.TweaksPanel>
    </div>
  )
}

// fx layers
function FX({ grainOn }) {
  return (
    <>
      <div className="fx-scan"></div>
      {grainOn && <div className="fx-grain"></div>}
      <div className="fx-vignette"></div>
    </>
  )
}

function Root() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS)
  return (
    <>
      <FX grainOn={tweaks.grain} />
      <App tweaks={tweaks} setTweak={setTweak} />
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />)
