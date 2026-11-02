import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode } from '../data/tests';
import { translations, Translations } from './translations';

export type ThemeMode = 'light' | 'dark';

interface AppPreferencesContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  resetPreferences: () => void;
  t: Translations;
}

const LANG_STORAGE_KEY = 'mmh_language';
const THEME_STORAGE_KEY = 'mmh_theme_v2';

const AppPreferencesContext = createContext<
  AppPreferencesContextValue | undefined
>(undefined);

export const AppPreferencesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'en' || saved === 'hi' || saved === 'bn') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'en';
  });

  // Default to the deep midnight-navy futuristic theme ('dark'), while allowing instant toggle to 'light'
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch {
      // ignore storage errors
    }
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const setTheme = (nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const resetPreferences = () => {
    setLanguageState('en');
    setThemeState('dark');
    try {
      localStorage.removeItem(LANG_STORAGE_KEY);
      localStorage.removeItem(THEME_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AppPreferencesContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        resetPreferences,
        t: translations[language],
      }}
    >
      {children}
    </AppPreferencesContext.Provider>
  );
};

export function useAppPreferences(): AppPreferencesContextValue {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx) {
    throw new Error(
      'useAppPreferences must be used within an AppPreferencesProvider'
    );
  }
  return ctx;
}
