// Pages.jsx — the screens. All primitives come from the design system.
const { Button, Tag, Card, Field, Console, StatStrip } = window.SynHorseDesignSystem_7004e4;

const SYNTHS = [
  { id: 'SY-0421', title: 'my entire posting history', description: 'unhinged screenshots and drafts. updated whenever you press a wrong button.', tags: [{ label: 'public', tone: 'hot' }, { label: '421 items' }] },
  { id: 'SY-0188', title: 'thoughts at 3am', description: 'do not open. if you opened it, do not read.', tags: [{ label: 'private', tone: 'cool' }, { label: '12 items' }] },
  { id: 'SY-0099', title: 'screenshots of error messages i found beautiful', description: 'a curated gallery. yes, even the kernel panic.', tags: [{ label: 'public', tone: 'hot' }, { label: '88 items' }, { label: 'pinned', tone: 'warn' }] },
  { id: 'SY-0042', title: 'the void ledger', description: "a running list of things i meant to post and didn't.", tags: [{ label: 'draft' }, { label: '42 items' }] },
  { id: 'SY-0007', title: 'cursed receipts', description: 'every transaction that made me feel something. mostly small.', tags: [{ label: 'archive' }, { label: '7 items' }] },
  { id: 'SY-0001', title: 'first synth', description: 'the original. a screenshot of a screenshot. you cannot delete this.', tags: [{ label: 'pinned', tone: 'warn' }, { label: '1 item' }] },
];

function PageHead({ sub, title, onSubClick, children }) {
  return (
    <div className="page-head">
      <div>
        <div className="sub" style={onSubClick ? { cursor: 'pointer' } : null} onClick={onSubClick}>{sub}</div>
        <h1>{title}</h1>
      </div>
      {children && <div className="actions">{children}</div>}
    </div>
  );
}

function DashboardPage({ onOpenSynth }) {
  return (
    <>
      <PageHead sub="/ dashboard" title="your void">
        <Button variant="ghost" size="sm">filter</Button>
        <Button variant="primary">new synth</Button>
      </PageHead>
      <StatStrip style={{ marginBottom: 28 }} items={[
        { value: '421', label: 'synths' },
        { value: '12.4k', label: 'impressions / wk', tone: 'cool' },
        { value: '98', label: 'cursed (pinned)', tone: 'warn' },
        { value: '3', label: 'drafts not posted', tone: 'danger' },
      ]} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {SYNTHS.map(s => <Card key={s.id} {...s} onClick={() => onOpenSynth(s)} />)}
      </div>
    </>
  );
}

function DetailPage({ synth, onBack }) {
  const s = synth || SYNTHS[0];
  return (
    <>
      <PageHead sub={'← / dashboard / ' + s.id} title={s.title} onSubClick={onBack}>
        <Button variant="ghost" size="sm">edit</Button>
        <Button variant="ghost" size="sm">share</Button>
        <Button variant="danger" size="sm">delete</Button>
      </PageHead>
      <Tabs items={['contents', 'history', 'danger zone']} active="contents" onChange={() => {}} />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, alignContent: 'start' }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ aspectRatio: '1', background: 'var(--void-2)', border: '1px solid var(--void-4)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>[ image: TODO ]</div>
          ))}
        </div>
        <aside>
          <div className="label">about</div>
          <p style={{ fontSize: 13, color: 'var(--fg-2)', marginBottom: 18 }}>{s.description}</p>
          <div className="label">stats</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
            <Tag tone="hot">421 items</Tag><Tag tone="cool">public</Tag><Tag>14 likes</Tag><Tag>3 forks</Tag>
          </div>
          <div className="label">activity</div>
          <Console lines={['last edit: 3 minutes ago', 'created: 2024-08-11 23:41', { text: 'warn: 2 unsynced drafts', kind: 'warn' }, 'owner: @horse.dril']} />
        </aside>
      </div>
    </>
  );
}

function ComposePage({ onSave }) {
  const [body, setBody] = React.useState('');
  return (
    <>
      <PageHead sub="/ compose" title="new synth">
        <Button variant="ghost" size="sm">save draft</Button>
        <Button variant="primary" onClick={onSave}>post (probably)</Button>
      </PageHead>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="title" placeholder="say something cursed" />
          <Field label="body" multiline rows={12} value={body} onChange={e => setBody(e.target.value)}
            placeholder="thoughts at 3am go here. nobody is reading. that's the deal."
            hint={'markdown supported. emoji are not. · ' + body.length + ' / 4096'} />
        </div>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div className="label">visibility</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><Tag tone="hot">public</Tag><Tag>private</Tag><Tag>friends</Tag></div>
          </div>
          <Field label="tags" placeholder="comma, separated" defaultValue="cursed, draft, unhinged" />
          <div>
            <div className="label">attached</div>
            <div style={{ border: '1px dashed var(--paper-3)', padding: '18px 12px', textAlign: 'center', color: 'var(--fg-3)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>drop file here<br />or don't</div>
          </div>
        </aside>
      </div>
    </>
  );
}

function DangerBlock({ title, body, action }) {
  return (
    <div style={{ border: '2px solid var(--danger)', padding: 16 }}>
      <div style={{ fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>{title}</div>
      <p style={{ fontSize: 13, color: 'var(--fg-2)', marginBottom: 10 }}>{body}</p>
      <Button variant="danger" size="sm">{action}</Button>
    </div>
  );
}

function SettingsPage() {
  const h = { fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 14 };
  return (
    <>
      <PageHead sub="/ settings" title="settings" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, maxWidth: 880 }}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h4 style={{ ...h, color: 'var(--fg-3)', marginBottom: 0 }}>account</h4>
          <Field label="handle" defaultValue="@horse.dril" />
          <Field label="display name" defaultValue="a horse, dril" />
          <Field label="bio" multiline rows={3} defaultValue="i used to be normal. then i became a synth." />
        </section>
        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h4 style={{ ...h, color: 'var(--danger)', marginBottom: 2 }}>danger zone</h4>
          <DangerBlock title="export everything" body="a tar.gz of every synth, draft, and regret." action="export" />
          <DangerBlock title="delete account" body={'this deletes everything. it does not "freeze" or "deactivate". it ends.'} action="delete forever" />
        </section>
      </div>
    </>
  );
}

function NotFoundPage({ onGoHome }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 0', maxWidth: 680, margin: '0 auto' }}>
      <svg width="96" height="96" style={{ color: 'var(--danger)', marginBottom: 24 }}><use href="../../assets/icons/pixel-sprites.svg#px-skull" /></svg>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 96, lineHeight: 1.1, color: 'var(--paper)', textShadow: 'var(--rgb-split)', marginBottom: 20 }}>404.</h1>
      <p style={{ fontSize: 18, color: 'var(--paper-2)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.04em', fontWeight: 600 }}>this page does not exist.</p>
      <p style={{ fontSize: 14, color: 'var(--fg-3)', marginBottom: 28 }}>never did. you are imagining it. go home.</p>
      <Button variant="primary" onClick={onGoHome}>go home</Button>
      <Console style={{ marginTop: 48, textAlign: 'left' }} lines={['GET /void/this-page HTTP/1.1', { text: '404 not found. nothing here. cope.', kind: 'err' }, 'redirecting in 0ms (psyche)']} />
    </div>
  );
}

function CommandPalette({ onClose, onNavigate }) {
  const items = [
    { section: 'go to' },
    { label: 'dashboard', kbd: 'g d', go: 'dashboard' },
    { label: 'new synth', kbd: 'g n', go: 'compose' },
    { label: 'settings', kbd: 'g s', go: 'settings' },
    { section: 'do' },
    { label: 'export everything (tar.gz)', kbd: 'e' },
    { label: 'toggle crt mode', kbd: 't c' },
    { label: 'log out', kbd: 'q' },
    { section: 'cursed' },
    { label: 'summon a random synth', kbd: '?' },
    { label: 'DELETE EVERYTHING', kbd: '⇧⌘⌫', danger: true },
  ];
  return (
    <div className="cp-overlay" onClick={onClose}>
      <div className="cp" onClick={e => e.stopPropagation()}>
        <div className="cp-input">
          <i data-lucide="search" style={{ color: 'var(--hot)', width: 18, height: 18 }}></i>
          <input autoFocus placeholder="say a command. or don't." />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>ESC</span>
        </div>
        <div className="cp-list">
          {items.map((it, i) => it.section ? (
            <div key={i} className="cp-section">{it.section}</div>
          ) : (
            <div key={i} className={'cp-item' + (i === 1 ? ' active' : '')} onClick={() => { if (it.go) { onNavigate(it.go); onClose(); } }} style={it.danger ? { color: 'var(--danger)' } : null}>
              <span>{it.label}</span><span className="kbd">{it.kbd}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardPage, DetailPage, ComposePage, SettingsPage, NotFoundPage, CommandPalette });
