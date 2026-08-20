// Theme toggle component - vanilla TypeScript island
// Sets theme before first paint via inline script to prevent flash

const STORAGE_KEY = 'praxis-theme';

type Theme = 'light' | 'dark';

function getStoredTheme(): Theme | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY) as Theme | null;
}

function setStoredTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initTheme(): void {
  const stored = getStoredTheme();
  const theme = stored ?? 'dark'; // Dark is default
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme(): void {
  const current = document.documentElement.getAttribute('data-theme') as Theme;
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  setStoredTheme(next);
  
  // Update button aria-label
  const btn = document.querySelector('[data-theme-toggle]') as HTMLButtonElement;
  if (btn) {
    btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', next === 'dark' ? 'false' : 'true');
  }
}

function setupToggle(): void {
  const btn = document.querySelector('[data-theme-toggle]') as HTMLButtonElement | null;
  if (btn) {
    btn.addEventListener('click', toggleTheme);
    
    // Set initial state
    const currentTheme = document.documentElement.getAttribute('data-theme') as Theme;
    btn.setAttribute('aria-pressed', currentTheme === 'dark' ? 'false' : 'true');
  }
}

// Initialize on load
if (typeof document !== 'undefined') {
  initTheme();
  setupToggle();
}

// Listen for system theme changes when no stored preference
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

// Export for potential use
export { initTheme, toggleTheme, setStoredTheme, getStoredTheme };
