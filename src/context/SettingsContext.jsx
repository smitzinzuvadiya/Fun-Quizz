import { createContext, useEffect, useState, useContext } from 'react';

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('quiz_sound_enabled');
    return saved !== null ? saved === 'true' : true; // Default to true
  });

  useEffect(() => {
    localStorage.setItem('quiz_sound_enabled', soundEnabled.toString());
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <SettingsContext.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
