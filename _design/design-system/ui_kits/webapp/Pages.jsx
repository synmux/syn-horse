// Pages.jsx — the 6 screens
const { useState: useStateP, useEffect: useEffectP } = React

function DashboardPage({ onOpenSynth }) {
  const synths = [
    {
      id: "SY-0421",
      title: "my entire posting history",
      desc: "unhinged screenshots and drafts. updated whenever you press a wrong button.",
      tags: [{ label: "PUBLIC", kind: "hot" }, { label: "421 ITEMS" }]
    },
    {
      id: "SY-0188",
      title: "thoughts at 3am",
      desc: "do not open. if you opened it, do not read.",
      tags: [{ label: "PRIVATE", kind: "cool" }, { label: "12 ITEMS" }]
    },
    {
      id: "SY-0099",
      title: "screenshots of error messages i found beautiful",
      desc: "a curated gallery. yes, even the kernel panic.",
      tags: [{ label: "PUBLIC", kind: "hot" }, { label: "88 ITEMS" }, { label: "PINNED", kind: "warn" }]
    },
    {
      id: "SY-0042",
      title: "the void ledger",
      desc: "a running list of things i meant to post and didn't.",
      tags: [{ label: "DRAFT" }, { label: "42 ITEMS" }]
    },
    {
      id: "SY-0007",
      title: "cursed receipts",
      desc: "every transaction that made me feel something. mostly small.",
      tags: [{ label: "ARCHIVE" }, { label: "7 ITEMS" }]
    },
    {
      id: "SY-0001",
      title: "first synth",
      desc: "the original. a screenshot of a screenshot. you cannot delete this.",
      tags: [{ label: "PINNED", kind: "warn" }, { label: "1 ITEM" }]
    }
  ]
  return (
    <>
      <div className="page-head">
        <div>
          <div className="sub">/ dashboard</div>
          <h1>your void</h1>
        </div>
        <div className="actions">
          <button className="btn btn-ghost btn-sm">filter</button>
          <button className="btn btn-primary">new synth</button>
        </div>
      </div>
      <div className="stat-strip">
        <Stat n="421" label="synths" />
        <Stat n="12.4k" label="impressions / wk" color="var(--cool)" />
        <Stat n="98" label="cursed (pinned)" color="var(--pop)" />
        <Stat n="3" label="DRAFTS NOT POSTED" color="var(--danger)" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {synths.map((s) => (
          <Tile key={s.id} {...s} onClick={() => onOpenSynth(s)} />
        ))}
      </div>
    </>
  )
}

function DetailPage({ synth, onBack }) {
  const s = synth || {
    id: "SY-0421",
    title: "my entire posting history",
    desc: "a folder of unhinged screenshots and drafts. updated every time you press a wrong button."
  }
  return (
    <>
      <div className="page-head">
        <div>
          <div className="sub" style={{ cursor: "pointer" }} onClick={onBack}>
            ← / dashboard / {s.id}
          </div>
          <h1>{s.title}</h1>
        </div>
        <div className="actions">
          <button className="btn btn-ghost btn-sm">edit</button>
          <button className="btn btn-ghost btn-sm">share</button>
          <button className="btn btn-danger btn-sm">DELETE</button>
        </div>
      </div>
      <Tabs items={["contents", "history", "danger zone"]} active="contents" onChange={() => {}} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28 }}>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: "1",
                  background: "var(--void-2)",
                  border: "1px solid var(--void-4)",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--fg-3)"
                }}
              >
                [ image: TODO ]
              </div>
            ))}
          </div>
        </div>
        <aside>
          <div className="label">about</div>
          <p style={{ fontSize: 13, color: "var(--fg-2)", marginBottom: 18 }}>{s.desc}</p>
          <div className="label">stats</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 18 }}>
            <div className="tag tag-hot">421 ITEMS</div>
            <div className="tag tag-cool">PUBLIC</div>
            <div className="tag">14 LIKES</div>
            <div className="tag">3 FORKS</div>
          </div>
          <div className="label">activity</div>
          <Console
            lines={[
              { prompt: true, text: "last edit: 3 minutes ago" },
              { prompt: true, text: "created: 2024-08-11 23:41" },
              { kind: "warn", text: "WARN: 2 unsynced drafts" },
              { prompt: true, text: "owner: @horse.dril" }
            ]}
          />
        </aside>
      </div>
    </>
  )
}

function ComposePage({ onSave }) {
  const [title, setTitle] = useStateP("")
  const [body, setBody] = useStateP("")
  return (
    <>
      <div className="page-head">
        <div>
          <div className="sub">/ compose</div>
          <h1>new synth</h1>
        </div>
        <div className="actions">
          <button className="btn btn-ghost btn-sm">save draft</button>
          <button className="btn btn-primary" onClick={onSave}>
            post (probably)
          </button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28 }}>
        <div>
          <div className="label">title</div>
          <input
            className="field"
            placeholder="say something cursed"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: 14, fontSize: 18 }}
          />
          <div className="label">body</div>
          <textarea
            className="field"
            rows="12"
            placeholder="thoughts at 3am go here. nobody is reading. that's the deal."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.6 }}
          />
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--fg-3)",
              marginTop: 6,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <span>markdown supported. emoji are not.</span>
            <span>{body.length} / 4096</span>
          </div>
        </div>
        <aside>
          <div className="label">visibility</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            <span className="tag tag-hot">PUBLIC</span>
            <span className="tag">PRIVATE</span>
            <span className="tag">FRIENDS</span>
          </div>
          <div className="label">tags</div>
          <input
            className="field"
            placeholder="comma, separated"
            style={{ marginBottom: 16 }}
            defaultValue="cursed, draft, unhinged"
          />
          <div className="label">attached</div>
          <div
            style={{
              border: "1px dashed var(--paper-3)",
              padding: "18px 12px",
              textAlign: "center",
              color: "var(--fg-3)",
              fontSize: 12,
              fontFamily: "var(--font-mono)"
            }}
          >
            drop file here
            <br />
            or don't
          </div>
        </aside>
      </div>
    </>
  )
}

function SettingsPage() {
  return (
    <>
      <div className="page-head">
        <div>
          <div className="sub">/ settings</div>
          <h1>settings</h1>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, maxWidth: 880 }}>
        <section>
          <h4
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--fg-3)",
              textTransform: "uppercase",
              letterSpacing: ".1em",
              marginBottom: 14
            }}
          >
            account
          </h4>
          <div className="label">handle</div>
          <input className="field" defaultValue="@horse.dril" style={{ marginBottom: 14 }} />
          <div className="label">display name</div>
          <input className="field" defaultValue="a horse, dril" style={{ marginBottom: 14 }} />
          <div className="label">bio</div>
          <textarea className="field" rows="3" defaultValue="i used to be normal. then i became a synth." />
        </section>
        <section>
          <h4
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--danger)",
              textTransform: "uppercase",
              letterSpacing: ".1em",
              marginBottom: 14
            }}
          >
            DANGER ZONE
          </h4>
          <div style={{ border: "2px solid var(--danger)", padding: 16, marginBottom: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>EXPORT EVERYTHING</div>
            <p style={{ fontSize: 13, color: "var(--fg-2)", marginBottom: 10 }}>
              a tar.gz of every synth, draft, and regret.
            </p>
            <button className="btn btn-danger btn-sm">EXPORT</button>
          </div>
          <div style={{ border: "2px solid var(--danger)", padding: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>DELETE ACCOUNT</div>
            <p style={{ fontSize: 13, color: "var(--fg-2)", marginBottom: 10 }}>
              this deletes everything. it does not "freeze" or "deactivate". it ends.
            </p>
            <button className="btn btn-danger btn-sm">DELETE FOREVER</button>
          </div>
        </section>
      </div>
    </>
  )
}

function NotFoundPage({ onGoHome }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 0", maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "inline-block", marginBottom: 24 }}>
        <svg width="96" height="96" style={{ color: "var(--danger)" }}>
          <use href="../../assets/icons/pixel-sprites.svg#px-skull" />
        </svg>
      </div>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 96,
          lineHeight: 1,
          color: "var(--paper)",
          textShadow: "2px 0 0 var(--hot), -2px 0 0 var(--cool)",
          marginBottom: 20
        }}
      >
        404.
      </h1>
      <p
        style={{
          fontSize: 18,
          color: "var(--paper-2)",
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: ".04em",
          fontWeight: 600
        }}
      >
        THIS PAGE DOES NOT EXIST.
      </p>
      <p style={{ fontSize: 14, color: "var(--fg-3)", marginBottom: 28 }}>never did. you are imagining it. go home.</p>
      <button className="btn btn-primary" onClick={onGoHome}>
        go home
      </button>
      <div style={{ marginTop: 48 }}>
        <Console
          lines={[
            { prompt: true, text: "GET /void/this-page HTTP/1.1" },
            { kind: "err", text: "404 NOT FOUND. nothing here. cope." },
            { prompt: true, text: "redirecting in 0ms (psyche)" }
          ]}
        />
      </div>
    </div>
  )
}

function CommandPalette({ onClose, onNavigate }) {
  const items = [
    { section: "go to" },
    { label: "dashboard", kbd: "g d", go: "dashboard" },
    { label: "new synth", kbd: "g n", go: "compose" },
    { label: "settings", kbd: "g s", go: "settings" },
    { section: "do" },
    { label: "export everything (tar.gz)", kbd: "e" },
    { label: "toggle CRT mode", kbd: "t c" },
    { label: "log out", kbd: "q" },
    { section: "cursed" },
    { label: "summon a random synth", kbd: "?" },
    { label: "DELETE EVERYTHING", kbd: "⇧⌘⌫", danger: true }
  ]
  return (
    <div className="cp-overlay" onClick={onClose}>
      <div className="cp" onClick={(e) => e.stopPropagation()}>
        <div className="cp-input">
          <i data-lucide="search" style={{ color: "var(--hot)", width: 18, height: 18 }}></i>
          <input autoFocus placeholder="say a command. or don't." />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)" }}>ESC</span>
        </div>
        <div className="cp-list">
          {items.map((it, i) =>
            it.section ? (
              <div key={i} className="cp-section">
                {it.section}
              </div>
            ) : (
              <div
                key={i}
                className={"cp-item" + (i === 1 ? " active" : "")}
                onClick={() => {
                  if (it.go) {
                    onNavigate(it.go)
                    onClose()
                  }
                }}
                style={it.danger ? { color: "var(--danger)" } : null}
              >
                <span>{it.label}</span>
                <span className="kbd">{it.kbd}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

Object.assign(window, { DashboardPage, DetailPage, ComposePage, SettingsPage, NotFoundPage, CommandPalette })
