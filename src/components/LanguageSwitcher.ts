// Language switcher component - vanilla TypeScript island
// Preserves current page path when switching languages

import { slugMap, type Locale } from '../i18n/ui';

const BANNER_KEY = 'praxis-lang-banner-dismissed';

function getCurrentLocale(): Locale {
  const path = window.location.pathname;
  if (path.startsWith('/fr/') || path === '/fr') return 'fr';
  return 'en';
}

function getOtherLocale(): Locale {
  return getCurrentLocale() === 'en' ? 'fr' : 'en';
}

function getLocalizedPath(locale: Locale): string {
  const currentPath = window.location.pathname;
  const currentLocale = getCurrentLocale();
  
  // Find the equivalent path in the other language
  const localeSlugMap = slugMap[currentLocale];
  
  // Try exact match first
  for (const [from, to] of Object.entries(localeSlugMap)) {
    if (currentPath === from || currentPath === from.replace('/en/', `/${currentLocale}/`)) {
      return to;
    }
  }
  
  // Default to root
  return locale === 'en' ? '/en/' : '/fr/';
}

function switchLanguage(): void {
  const otherLocale = getOtherLocale();
  const newPath = getLocalizedPath(otherLocale);
  window.location.href = newPath;
}

function setupSwitcher(): void {
  const btn = document.querySelector('[data-lang-switch]') as HTMLButtonElement | null;
  if (btn) {
    btn.addEventListener('click', switchLanguage);
  }
}

function showCrossLangBanner(): void {
  const currentLocale = getCurrentLocale();
  const otherLocale = currentLocale === 'en' ? 'fr' : 'en';
  const dismissed = sessionStorage.getItem(BANNER_KEY);
  
  if (dismissed) return;
  
  const banner = document.querySelector('[data-cross-lang-banner]') as HTMLElement | null;
  if (banner) {
    banner.removeAttribute('hidden');
    
    const link = banner.querySelector('[data-cross-lang-link]') as HTMLAnchorElement | null;
    if (link) {
      link.href = getLocalizedPath(otherLocale);
    }
    
    const dismissBtn = banner.querySelector('[data-cross-lang-dismiss]') as HTMLButtonElement | null;
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        banner.setAttribute('hidden', '');
        sessionStorage.setItem(BANNER_KEY, 'true');
      });
    }
  }
}

export { setupSwitcher, showCrossLangBanner, getLocalizedPath, getOtherLocale };
