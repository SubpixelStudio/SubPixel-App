import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const darkTheme = {
  bg: '#0b0e14', card: '#111418', text: '#f3f4f6', text2: '#cbd5e1', accent: '#7dd3fc'
};
const lightTheme = {
  bg: '#f5f7fb', card: '#fff', text: '#0f172a', text2: '#334155', accent: '#0284c7'
};

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('@sp_theme');
        if (saved) setDark(saved === 'dark');
      } catch (e) { /* ignore */ }
    })();
  }, []);

  const toggleTheme = async () => {
    const next = !dark;
    setDark(next);
    try { await AsyncStorage.setItem('@sp_theme', next ? 'dark' : 'light'); } catch (e) {}
  };

  const colors = dark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}
