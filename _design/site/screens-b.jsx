/* syn.horse — secondary screens */

const { useState: useStateB, useEffect: useEffectB, useMemo: useMemoB } = React

// ─── Blog index ───────────────────────────────────────────────
function Blog({ openPost }) {
  const [filter, setFilter] = useStateB("all")
  const filtered = useMemoB(
    () => (filter === "all" ? window.POSTS : window.POSTS.filter((p) => p.tags.includes(filter))),
    [filter]
  )
  return (
    <div className="container blog">
      <div className="eyebrow">▶ /blog · {window.POSTS.length} posts · infrequent · lowercase</div>
      <h1>
        blog<span className="dot">.</span>
      </h1>
      <p className="lede">
        writing about devops, hardware, the slow death of weird websites, and occasionally my body. infrequent.
        unedited. no editor will ever fix that.
      </p>
      <div className="filter">
        <span className={"tg " + (filter === "all" ? "on" : "")} onClick={() => setFilter("all")}>
          ALL · {window.POSTS.length}
        </span>
        {window.TAG_COUNTS.map(([t, c]) => (
          <span key={t} className={"tg " + (filter === t ? "on" : "")} onClick={() => setFilter(t)}>
            {t.toUpperCase()} · {c}
          </span>
        ))}
      </div>
      <ul>
        {filtered.map((p) => (
          <li key={p.slug} className="blog-row fx-glitch" onClick={() => openPost(p)}>
            <span className="date">{p.date}</span>
            <div>
              <h3>{p.title}</h3>
              <div className="desc">{p.desc}</div>
              <div className="post-tags">
                {p.tags.map((t) => (
                  <span key={t} className="tg">
                    {t}
                  </span>
                ))}
                {!p.real && <span className="tg warn">FUTURE</span>}
              </div>
            </div>
            <span className="read">{p.read} →</span>
          </li>
        ))}
      </ul>
      <div className="feed-line">
        rss feed: <a href="/feed.xml">/feed.xml</a> · subscribe with the reader of your choice. no email list. i'm not
        chasing you.
      </div>
    </div>
  )
}

// ─── Post ─────────────────────────────────────────────────────
function Post({ post, back }) {
  const p = post || window.POSTS[0]
  return (
    <div className="container post">
      <div className="crumb fx-glitch" onClick={back}>
        ← / blog
      </div>
      <h1>{p.title}</h1>
      <div className="meta">
        <span>
          <span className="pill">◆</span> {p.date}
        </span>
        <span>· {p.read}</span>
        <span>· tags: {p.tags.join(", ")}</span>
        {!p.real && <span style={{ color: "var(--pop)" }}>· FROM THE FUTURE</span>}
      </div>
      <div className="body">
        <p>
          {p.desc}{" "}
          <i>
            this is the placeholder body — the real post lives in{" "}
            <code>
              content/blog/{p.date.replace(/\./g, "-")}_{p.slug}.md
            </code>{" "}
            and renders via @nuxt/content. design exploration only.
          </i>
        </p>
        <h2>the setup</h2>
        <p>
          here's the thesis. i had a problem, i refused to leave the house, and i had a half-charged thinkpad. you can
          guess what happened next.
        </p>
        <p>
          i'd been running this exact stack for about six months — <code>nuxt 4</code>, <code>cloudflare workers</code>,{" "}
          <code>@nuxt/content</code>, <code>tailwind</code>, <code>daisyui</code> — and the thing that finally broke me
          was the <b>build pipeline</b>. specifically, the part where it lies about whether content has changed.
        </p>
        <pre>
          <code>{`> wrangler deploy
✘ [ERROR] you tried something
   the worker is fine. you are not.

i lost the file. i'm not sorry.`}</code>
        </pre>
        <h2>what changed</h2>
        <p>
          the fix, as is tradition, was three lines of yaml. but the journey there involved <a href="#">prometheus</a>,{" "}
          <a href="#">grafana</a>, a misconfigured tailnet, two pots of coffee, and a brief out-of-body experience.
        </p>
        <blockquote>"the kernel panics, but romantically."</blockquote>
        <p>
          that's an error message i would die for. instead i get "
          <i>something went wrong, our team has been notified</i>." nothing went wrong. somebody wrote a bad query and
          capitalism happened. say so.
        </p>
        <h2>what to do</h2>
        <ul>
          <li>build a personal site. make it weird.</li>
          <li>don't put your linkedin on it.</li>
          <li>don't optimize for the algorithm.</li>
          <li>write your own 404. swear, occasionally.</li>
          <li>link to a friend.</li>
        </ul>
        <p>
          that's it. that's the post. there's no call to action. there's no "if you liked this, consider subscribing."
          you got here. you read it. that's the contract. thanks.
        </p>
      </div>
      <div className="post-foot">
        <span>◆ written in /var/notes/2026/ · cron'd, not edited</span>
        <span>
          <a href="https://github.com/synmux/syn-horse" target="_blank" rel="noopener">
            edit on github →
          </a>
        </span>
      </div>
    </div>
  )
}

// ─── CV ───────────────────────────────────────────────────────
function CV() {
  return (
    <div className="container cv">
      <div className="eyebrow">▶ /cv · last revised 2026.03 · pdf available on request</div>
      <h1>
        cv<span className="dot">.</span>
      </h1>
      <p className="lede">
        10+ years in devops, sre, and sysadmin. terraform, nomad, kubernetes, prometheus, more bash than is strictly
        healthy. terse on purpose.
      </p>
      <div className="cv-actions">
        <button className="btn fx-glitch">↓ download pdf</button>
        <button className="btn fx-glitch">↗ linkedin (don't)</button>
        <button className="btn fx-glitch">✉ email for full ref list</button>
      </div>

      <h2>
        <span className="num">01 ·</span> work
      </h2>
      {window.CV_ROLES.map((r, i) => (
        <div className="role" key={i}>
          <div className="left">
            <div className="dt">{r.dt}</div>
            <div className="place">{r.place}</div>
            <div className="loc">{r.loc}</div>
          </div>
          <div className="right">
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
            <div className="stack">
              {r.stack.map((s) => (
                <span key={s} className="tg">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      <h2>
        <span className="num">02 ·</span> talks
      </h2>
      <div className="talks">
        {window.TALKS.map((t, i) => (
          <div className="talk" key={i}>
            <span className="yr">{t.yr}</span>
            <h4>{t.title}</h4>
            <span className="venue">↗ {t.venue}</span>
          </div>
        ))}
      </div>

      <h2>
        <span className="num">03 ·</span> side projects
      </h2>
      <div className="proj-grid">
        {window.SIDE.map((s, i) => (
          <div className="proj" key={i}>
            <span className="yr">{s.yr}</span>
            <h3>{s.name}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>

      <h2>
        <span className="num">04 ·</span> elsewhere
      </h2>
      <div className="role">
        <div className="left">
          <div className="dt">refs</div>
          <div className="place">on request</div>
        </div>
        <div className="right">
          <p>
            i can put you in touch with eng managers, peers, and direct reports. names + contact details on request —
            i'm not putting them on a public page.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Contact ──────────────────────────────────────────────────
function Contact() {
  return (
    <div className="container contact">
      <div className="eyebrow">▶ /contact · email is open · dms are mostly</div>
      <h1>
        say hi<span className="dot">.</span>
      </h1>
      <p className="lede">
        email works. signal works. the rest are listed because i feel obligated. tone is everything: lead with what you
        want, not pleasantries.
      </p>
      <div className="grid">
        <div>
          <h2>the open ones</h2>
          <div className="links">
            {window.SOCIAL.map((s) => (
              <a className="link fx-glitch" key={s.k} href={s.href} target="_blank" rel="noopener">
                <span className="k">{s.k}</span>
                <span className="v">{s.v}</span>
                <span className="arr">↗</span>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2>im / messengers</h2>
          <div className="im-card">
            {window.IM.map((m) => (
              <div className="row" key={m.name}>
                <span>◆ {m.name}</span>
                <span className="ok">{m.note}</span>
              </div>
            ))}
          </div>
          <div className="ask">
            <b>ask for my number ◆</b>
            <br />i don't list phone numbers in plaintext (scrapers gonna scrape). email me first, mention which
            messenger, and i'll send you a number. signal preferred.
          </div>
        </div>
      </div>

      <div className="footer-note" style={{ marginTop: 64 }}>
        <span>◆ usually responds within 48h · sometimes 2 weeks · rarely never</span>
        <span>do not pitch me web3, "ai-driven" anything, or recruitment for crypto</span>
      </div>
    </div>
  )
}

// ─── Domains ──────────────────────────────────────────────────
function Domains() {
  return (
    <div className="container domains">
      <div className="eyebrow">▶ /domains · the syn.* family · 5 of them</div>
      <h1>
        domains<span className="dot">.</span>
      </h1>
      <p className="lede">
        i collect tlds the way other people collect houseplants. one is the main site. the rest redirect, park, or
        quietly ask a question about ducks.
      </p>
      <div className="dom-grid">
        {window.DOMAINS.map((d) => (
          <div key={d.tld} className={"dom-row " + d.cls}>
            <div className="name">
              {d.base}
              <span style={{ color: "var(--paper-3)" }}>.</span>
              <span className="tld">{d.tld}</span>
            </div>
            <div className="desc">{d.desc}</div>
            <div className="status">
              {d.status === "ok" && <span className="ok">● {d.statusText}</span>}
              {d.status === "warn" && <span className="warn">● {d.statusText}</span>}
              {d.status === "park" && <span className="park">○ {d.statusText}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="footer-note" style={{ marginTop: 48 }}>
        <span>◆ all served by one cloudflare worker</span>
        <span>renewal calendar lives in fastmail · pray for me</span>
      </div>
    </div>
  )
}

// ─── 404 ──────────────────────────────────────────────────────
function NotFound({ go }) {
  return (
    <div className="notfound">
      <div className="eyebrow">▶ /this-page-does-not-exist · status 404</div>
      <div className="big">404</div>
      <div className="yell">
        this page <span className="accent">does not exist</span>. never did. go home.
      </div>
      <div className="console">
        <div>
          <span className="pr">syn@horse</span> <span className="mu">~/$</span> stat /this-route
        </div>
        <div className="mu">
          → stat: cannot stat '/this-route': <span className="danger">no such file or directory</span>
        </div>
        <div>
          <span className="pr">syn@horse</span> <span className="mu">~/$</span> dmesg | tail
        </div>
        <div className="mu">
          → kernel: page fault at 0x{Math.random().toString(16).slice(2, 10)} — request was nonsense
        </div>
        <div className="mu">→ kernel: i checked. it's not here. it never was.</div>
        <div className="mu">→ kernel: type the url next time. don't trust shortcuts.</div>
        <div>
          <span className="pr">syn@horse</span> <span className="mu">~/$</span>{" "}
          <span style={{ color: "var(--paper)" }}>_</span>
        </div>
      </div>
      <div className="actions">
        <button className="btn fx-glitch" onClick={() => go("home")}>
          ← go home
        </button>
        <button className="btn fx-glitch" onClick={() => go("blog")}>
          read the blog instead
        </button>
        <button className="btn warn fx-glitch" onClick={() => go("domains")}>
          maybe it's on another domain
        </button>
      </div>
    </div>
  )
}

Object.assign(window, { Blog, Post, CV, Contact, Domains, NotFound })
