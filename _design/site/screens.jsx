/* syn.horse — screen components */

const { useState, useEffect, useRef, useMemo } = React

// ─── Status bar (top, with clock + uptime) ────────────────────
function StatusBar({ route }) {
  const [now, setNow] = useState(() => new Date())
  const startRef = useRef(Date.now())
  const [uptime, setUptime] = useState("00:00:00")
  useEffect(() => {
    const t = setInterval(() => {
      setNow(new Date())
      const ms = Date.now() - startRef.current
      const s = Math.floor(ms / 1000)
      const hh = String(Math.floor(s / 3600)).padStart(2, "0")
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0")
      const ss = String(s % 60).padStart(2, "0")
      setUptime(`${hh}:${mm}:${ss}`)
    }, 1000)
    return () => clearInterval(t)
  }, [])
  const time = now.toISOString().slice(11, 19)
  return (
    <div className="statusbar">
      <span>
        <span className="pulse-dot"></span>online
      </span>
      <span className="sb-mid">
        <span className="frag">
          ◆ <span className="sb-route">/{route}</span>
        </span>
        <span className="frag">
          tz <span style={{ color: "var(--paper-2)" }}>UTC</span>
        </span>
      </span>
      <span>
        uptime <span className="sb-up">{uptime}</span>
      </span>
      <span>
        local <span className="sb-time">{time}</span>
      </span>
      <span>v0.3.1-syn</span>
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────
function Nav({ active, go }) {
  const tabs = [
    { id: "home", label: "home" },
    { id: "now", label: "now" },
    { id: "projects", label: "projects" },
    { id: "blog", label: "blog" },
    { id: "cv", label: "cv" },
    { id: "domains", label: "domains" },
    { id: "contact", label: "contact" }
  ]
  return (
    <nav className="nav">
      <div className="brand fx-glitch" onClick={() => go("home")}>
        <img className="mark" src="assets/logo-mark.svg" alt="" />
        <span className="word">
          syn<span className="dot">.</span>horse
        </span>
      </div>
      <span className="spacer"></span>
      {tabs.map((t) => (
        <button
          key={t.id}
          className={"tab fx-glitch " + (active === t.id || (active === "post" && t.id === "blog") ? "active" : "")}
          onClick={() => go(t.id)}
        >
          {t.label}
        </button>
      ))}
      <span className="cmd-hint">
        press <kbd>/</kbd>
      </span>
    </nav>
  )
}

// ─── HOME ─────────────────────────────────────────────────────
function HomeCalm({ go, status }) {
  return (
    <div className="container home">
      <div className="eyebrow">▶ syn · they/them · in the void</div>
      <h1>
        devops
        <br />
        and weird
        <br />
        things<span className="accent">.</span>
      </h1>
      <p className="sub">
        i'm <b>syn</b>. devops engineer and general-purpose nerd. i write occasionally, ship occasionally, and have a
        lot of opinions about prometheus.
      </p>
      <div className="now-bar">
        <span className="pulse"></span>
        <span className="text">
          <b>NOW:</b> {status}
        </span>
      </div>
      <div className="grid">
        <div className="card fx-glitch" onClick={() => go("now")}>
          <div className="h">/ now</div>
          <h3>this month</h3>
          <p>updated whenever i remember. sometimes wrong on purpose.</p>
          <span className="arrow">read /now →</span>
        </div>
        <div className="card fx-glitch" onClick={() => go("projects")}>
          <div className="h">/ projects</div>
          <h3>things i made</h3>
          <p>some live. some retired. one is a question about ducks.</p>
          <span className="arrow">see projects →</span>
        </div>
        <div className="card fx-glitch" onClick={() => go("blog")}>
          <div className="h">/ blog</div>
          <h3>17 posts</h3>
          <p>shell tools, meshtastic, eeg, ms, sdam. infrequent. unedited.</p>
          <span className="arrow">read posts →</span>
        </div>
        <div className="card fx-glitch" onClick={() => go("cv")}>
          <div className="h">/ cv</div>
          <h3>cv (lol)</h3>
          <p>10+ years. devops, sre, sysadmin. pdf if you must.</p>
          <span className="arrow">read cv →</span>
        </div>
      </div>
      <div className="links">
        <a href="https://github.com/synmux" target="_blank" rel="noopener">
          github
        </a>
        <a href="https://basilisk.gallery/@dave" target="_blank" rel="noopener">
          mastodon
        </a>
        <a href="https://bsky.app/profile/syn.horse" target="_blank" rel="noopener">
          bluesky
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            go("contact")
          }}
        >
          contact
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            go("domains")
          }}
        >
          the syn.* domains
        </a>
        <a href="/feed.xml">rss</a>
      </div>
      <div className="footer-note">
        <span>◆ syn · 2026 · built in the void</span>
        <span>no analytics · no newsletter · no we</span>
      </div>
    </div>
  )
}

function HomeFeral({ go, status }) {
  const marqueeItems = [
    "currently shouting at git",
    "◆ syn.horse v0.3.1",
    "last build 3h ago",
    "◆ 17 posts",
    "8 projects",
    "◆ 5 domains",
    "on-call free since 2023",
    "◆ no newsletter",
    "no analytics",
    "◆ NO WE",
    "do not subscribe",
    "◆ ask me about meshtastic"
  ]
  return (
    <div className="container home feral">
      <div className="eyebrow">▶ syn · they/them · last seen: {new Date().toISOString().slice(0, 10)}</div>
      <h1>
        <span className="l1">devops</span>
        <span className="l2">engineer.</span>
        <span className="l3">general-purpose nerd.</span>
      </h1>
      <div className="glitch-band">
        <div className="marquee-track">
          {marqueeItems.map((t, i) => (
            <span key={i} className={i % 3 === 0 ? "hl" : ""}>
              {t}
            </span>
          ))}
          {marqueeItems.map((t, i) => (
            <span key={"b" + i} className={i % 3 === 0 ? "hl" : ""}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <p className="sub" style={{ marginTop: 32 }}>
        terraform, nomad, cloudflare. a homelab. a meshtastic node on a ridge in wales.{" "}
        <b>currently shouting at git.</b>
      </p>
      <div className="grid three" style={{ marginTop: 36 }}>
        <div className="card fx-glitch" onClick={() => go("now")}>
          <div className="h">▶ /now</div>
          <h3>this month</h3>
          <p>{status}.</p>
          <span className="arrow">read /now →</span>
        </div>
        <div className="card fx-glitch" onClick={() => go("blog")}>
          <div className="h">▶ /blog</div>
          <h3>17 posts</h3>
          <p>shell tools, meshtastic, eeg, ms, sdam. unedited.</p>
          <span className="arrow">read posts →</span>
        </div>
        <div className="card fx-glitch" onClick={() => go("projects")}>
          <div className="h">▶ /projects</div>
          <h3>8 things</h3>
          <p>some alive, some retired, one asks about ducks.</p>
          <span className="arrow">see projects →</span>
        </div>
        <div className="card fx-glitch" onClick={() => go("cv")}>
          <div className="h">▶ /cv</div>
          <h3>cv. (lol.)</h3>
          <p>10+ years. devops, sre, sysadmin. terse.</p>
          <span className="arrow">read cv →</span>
        </div>
        <div className="card fx-glitch" onClick={() => go("domains")}>
          <div className="h">▶ /domains</div>
          <h3>5 domains</h3>
          <p>syn.horse, syn.as, syn.haus, syn.pink, dcw.soy.</p>
          <span className="arrow">see all →</span>
        </div>
        <div className="card fx-glitch" onClick={() => go("contact")}>
          <div className="h">▶ /contact</div>
          <h3>say hi</h3>
          <p>email + signal. dms are on, mostly.</p>
          <span className="arrow">contact →</span>
        </div>
      </div>
      <div className="footer-note" style={{ marginTop: 48 }}>
        <span>◆ syn · 2026 · built in the void</span>
        <span>
          press <kbd style={{ color: "var(--cool)" }}>/</kbd> for command palette · ↑↑↓↓ for a surprise
        </span>
      </div>
    </div>
  )
}

function HomeUnhinged({ go, status }) {
  const ascii = [
    "   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄",
    "   █                       █",
    "   █   ◆ syn.horse v0.3   █",
    "   █     not for sale     █",
    "   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀"
  ].join("\n")
  return (
    <div className="container wide home unhinged">
      <div className="eyebrow">▶ /home · uptime since 2014 · last reboot: complaint-driven</div>
      <h1>
        <span className="ghost">syn.horse</span>
        <span className="punk">syn.horse</span>
      </h1>
      <pre className="ascii">{ascii}</pre>
      <div className="stamp-grid">
        <div className="stamp">
          <div className="k">◆ name</div>
          <div className="v">syn</div>
        </div>
        <div className="stamp">
          <div className="k">▶ pronouns</div>
          <div className="v">they / them</div>
        </div>
        <div className="stamp">
          <div className="k">※ role</div>
          <div className="v hot">devops</div>
        </div>
        <div className="stamp">
          <div className="k">▓ locale</div>
          <div className="v cool">en_GB</div>
        </div>
        <div className="stamp">
          <div className="k">◯ posts</div>
          <div className="v">17</div>
        </div>
        <div className="stamp">
          <div className="k">✶ projects</div>
          <div className="v hot">8</div>
        </div>
        <div className="stamp">
          <div className="k">◆ domains</div>
          <div className="v cool">5</div>
        </div>
        <div className="stamp">
          <div className="k">▒ newsletter</div>
          <div className="v">no</div>
        </div>
        <div className="stamp">
          <div className="k">░ analytics</div>
          <div className="v">no</div>
        </div>
      </div>
      <div className="strap">
        currently <span className="accent">{status}</span>.
      </div>
      <div className="console-block" style={{ marginTop: 24 }}>
        <div>
          <span className="pr">syn@horse</span> <span className="mu">~/$</span> whoami
        </div>
        <div className="mu">→ a devops engineer who keeps building blogs instead of sleeping</div>
        <div>
          <span className="pr">syn@horse</span> <span className="mu">~/$</span> cat /etc/motd
        </div>
        <div className="mu">→ welcome. read nothing. press buttons.</div>
        <div>
          <span className="pr">syn@horse</span> <span className="mu">~/$</span> ls -la /things
        </div>
        <div className="mu">
          drwx— <span className="ok">blog/</span> 17 posts · last touched 2025-09-20
        </div>
        <div className="mu">
          drwx— <span className="ok">projects/</span> 8 items · 6 alive
        </div>
        <div className="mu">
          drwx— <span className="ok">cv/</span> 4 roles · 5 talks · 4 side things
        </div>
        <div className="mu">
          drwx— <span className="ok">domains/</span> 5 of them. don't ask.
        </div>
        <div>
          <span className="pr">syn@horse</span> <span className="mu">~/$</span>{" "}
          <span style={{ color: "var(--paper)" }}>_</span>
        </div>
      </div>
      <div className="grid three" style={{ marginTop: 32 }}>
        <div className="card fx-glitch" onClick={() => go("blog")}>
          <div className="h">cat /blog</div>
          <h3>read the words</h3>
          <p>17 posts. one of them is 24k characters about fish.</p>
          <span className="arrow">→ /blog</span>
        </div>
        <div className="card fx-glitch" onClick={() => go("cv")}>
          <div className="h">cat /cv</div>
          <h3>look at the cv</h3>
          <p>i did the things. they are listed in chronological order.</p>
          <span className="arrow">→ /cv</span>
        </div>
        <div className="card fx-glitch" onClick={() => go("contact")}>
          <div className="h">echo hi</div>
          <h3>say something</h3>
          <p>i will respond. eventually. probably. tone is everything.</p>
          <span className="arrow">→ /contact</span>
        </div>
      </div>
      <div className="footer-note" style={{ margin: "48px 0 0", padding: "14px 0 64px" }}>
        <span>◆ syn · 2026 · this site is held together with vibes and a cloudflare worker</span>
        <span>you got here. you're reading. that's the contract.</span>
      </div>
    </div>
  )
}

// ─── /now ─────────────────────────────────────────────────────
function Now({ status }) {
  return (
    <div className="container now">
      <div className="eyebrow">▶ /now · updated 2026.04.20</div>
      <h1>
        now<span className="dot">.</span>
      </h1>
      <p className="lede">a /now page. what i'm actually doing this month, not what linkedin would have you believe.</p>
      <h2>building</h2>
      <ul>
        <li>
          <span>
            <b>syn.horse</b> — this rewrite. nuxt 4 on cloudflare workers, content from markdown, deployed via wrangler.
            mostly working. {status}.
          </span>
        </li>
        <li>
          <span>
            <b>genderbase</b> — quarterly content review. removed 2 dead links, added 7 resources, refreshed the FAQ.
          </span>
        </li>
        <li>
          <span>
            <b>meshtastic node FOXP1</b> — moved it to a higher ridge. range went from 8km to ~12km. neighbours now
            relay my jokes.
          </span>
        </li>
      </ul>
      <h2>reading</h2>
      <ul>
        <li>
          <span>
            <b>the dispossessed</b>, le guin, third time round. somehow weirder.
          </span>
        </li>
        <li>
          <span>
            <b>the unaccountability machine</b>, dan davies. systems thinking for people who already shout at git.
          </span>
        </li>
        <li>
          <span>
            too many <b>are.na blocks</b>. probably more than is healthy.
          </span>
        </li>
      </ul>
      <h2>listening</h2>
      <ul>
        <li>
          <span>
            <b>the broadcast</b> — dub techno. it's april. that's enough excuse.
          </span>
        </li>
        <li>
          <span>
            <b>look mum no computer</b> — tinkerer/musician. accidentally informative.
          </span>
        </li>
      </ul>
      <h2>not doing</h2>
      <ul>
        <li>
          <span>
            <b>twitter / x</b> — quit it. not bragging.
          </span>
        </li>
        <li>
          <span>
            <b>that side project from january</b> — it can wait. it has to.
          </span>
        </li>
        <li>
          <span>
            <b>on-call</b> — ate it for a year in 2020. never again.
          </span>
        </li>
      </ul>
      <div className="console">
        <div>
          <span className="pr">&gt;</span> <span className="mu">last cron job ran 3h ago — yes the site is alive</span>
        </div>
        <div>
          <span className="pr">&gt;</span>{" "}
          <span className="mu">if you got here from hacker news: hi. don't comment. read.</span>
        </div>
        <div>
          <span className="pr">&gt;</span>{" "}
          <span className="mu">if you got here from linkedin: i don't know how. close the tab.</span>
        </div>
      </div>
      <div className="updated">last meaningful update: 2026.04.20 · next: when i remember</div>
    </div>
  )
}

// ─── projects ─────────────────────────────────────────────────
function Projects() {
  return (
    <div className="container projects">
      <div className="eyebrow">▶ /projects · 8 things</div>
      <h1>
        projects<span className="dot">.</span>
      </h1>
      <p className="lede">things i made on purpose. things i regret are not on this list.</p>
      <div className="proj-grid">
        {window.PROJECTS.map((p) => (
          <div className="proj fx-glitch" key={p.name}>
            <span className="yr">{p.yr}</span>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div className="url">↗ {p.url}</div>
            <div className="tags">
              {p.tags.map((t, i) => (
                <span key={i} className={"tg " + (t.k || "")}>
                  {t.l}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Object.assign(window, { StatusBar, Nav, HomeCalm, HomeFeral, HomeUnhinged, Now, Projects })
