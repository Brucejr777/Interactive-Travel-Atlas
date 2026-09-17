import { useUserStore, type ThemePreference } from '../store/useUserStore'

const order: ThemePreference[] = ['light', 'dark', 'system']

const labels: Record<ThemePreference, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

export default function ThemeToggle() {
  const theme = useUserStore((s) => s.theme)
  const setTheme = useUserStore((s) => s.setTheme)

  function cycle() {
    const i = order.indexOf(theme)
    setTheme(order[(i + 1) % order.length])
  }

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={cycle}
      aria-label={`Colour theme: ${labels[theme]}. Activate to switch.`}
      title={`Theme: ${labels[theme]}`}
    >
      {theme === 'light' && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
      {theme === 'dark' && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
      {theme === 'system' && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      )}
    </button>
  )
}