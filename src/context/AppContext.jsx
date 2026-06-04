import { createContext, useContext, useEffect, useState } from 'react';
import { PF } from '../data';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('pf_theme') || 'dark');
  const [lang, setLang] = useState(() => localStorage.getItem('pf_lang') || 'en');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pf_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('pf_lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const toggleTheme = () => setTheme((v) => (v === 'dark' ? 'light' : 'dark'));
  const toggleLang = () => setLang((v) => (v === 'en' ? 'es' : 'en'));

  const t = PF.i18n[lang];

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  return useContext(AppContext);
}
