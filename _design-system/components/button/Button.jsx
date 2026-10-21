export function Button({ variant = 'secondary', size = 'md', pill = false, block = false, disabled = false, href, target, type = 'button', onClick, children, style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const tones = {
    primary: { bg: 'var(--hot)', fg: 'var(--void)', bd: 'var(--hot)' },
    secondary: { bg: 'transparent', fg: 'var(--paper)', bd: 'var(--hot)' },
    ghost: { bg: 'transparent', fg: 'var(--paper-2)', bd: 'var(--paper-3)' },
    danger: { bg: 'transparent', fg: 'var(--danger)', bd: 'var(--danger)' },
  };
  const sizes = { sm: ['6px 12px', 12], md: ['9px 16px', 14], lg: ['12px 22px', 15] };
  const t = tones[variant] || tones.secondary;
  const [pad, fs] = sizes[size] || sizes.md;
  const live = hover && !disabled;
  const isPrimary = variant === 'primary', isDanger = variant === 'danger';
  const El = href ? 'a' : 'button';
  return (
    <El href={href} target={target} type={href ? undefined : type} disabled={href ? undefined : disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{
        display: block ? 'block' : 'inline-block', width: block ? '100%' : undefined, boxSizing: 'border-box', textAlign: 'center', textDecoration: 'none',
        fontFamily: 'var(--font-body)', fontSize: fs, fontWeight: 600, lineHeight: 1.2, padding: pad,
        border: '2px solid ' + t.bd, borderRadius: pill ? 999 : 0,
        background: isPrimary && live ? 'var(--hot-2)' : (isDanger && live ? 'var(--danger)' : t.bg),
        color: isDanger && live ? 'var(--paper)' : (live && variant === 'secondary' ? 'var(--hot)' : (live && variant === 'ghost' ? 'var(--cool)' : t.fg)),
        borderColor: live && variant === 'ghost' ? 'var(--cool)' : t.bd,
        textTransform: isDanger ? 'uppercase' : 'lowercase', letterSpacing: isDanger ? '.05em' : 0,
        whiteSpace: 'nowrap', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        transform: press && !disabled ? 'scale(.97)' : 'none',
        textShadow: live && variant === 'secondary' ? 'var(--rgb-split)' : 'none',
        boxShadow: live && isPrimary ? 'var(--glow-hot)' : 'none',
        transition: 'all 80ms var(--ease-snap)', ...style,
      }}>{children}</El>
  );
}
