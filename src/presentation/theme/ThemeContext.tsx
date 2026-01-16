import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance } from 'react-native';
import { Theme, lightTheme, darkTheme } from './theme';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: Theme['colors'];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);

    const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      setTheme(newColorScheme === 'dark' ? darkTheme : lightTheme);
    });

    return () => subscription?.remove();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev.isDark ? lightTheme : darkTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    colors: theme.colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};