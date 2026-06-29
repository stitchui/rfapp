export function AppHeader() {
  return (
    <header style={{ fontFamily: "var(--font-sans)" }}>
      <div style={{
        background: '#004d2c', color: '#fff',
        height: 'var(--header-height)', display: 'flex', alignItems: 'center',
        gap: 11, padding: '0 28px',
      }}>
        <svg width="28" height="32" viewBox="0 0 28 32" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
          <path d="M4 28 L10 4 L14 5 L8 29 Z"  fill="#8dc63f" fillOpacity="0.95" />
          <path d="M10 28 L16 2 L20 3 L14 29 Z" fill="#8dc63f" />
          <path d="M16 28 L22 0 L26 1 L20 29 Z" fill="#8dc63f" fillOpacity="0.9" />
        </svg>
        <span style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 20, letterSpacing: '0.04em',
        }}>
          Risk Factor Mapping
        </span>
      </div>
      <div style={{ height: 'var(--header-accent)', background: '#8dc63f' }} />
    </header>
  );
}
