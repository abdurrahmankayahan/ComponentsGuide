import { createContext, ReactNode, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, Spacing, Typography } from './themes';

export type ThemeContextType = {
  theme: typeof lightTheme;
  spacing:typeof Spacing;
  typography:typeof Typography;
  toggleTheme: () => void;
  setCustomTheme: (customTheme: typeof lightTheme,type:"dark"|"ligth") => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
type Props = {
  children?: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(lightTheme);
  const [spacing, setSpacing] = useState(Spacing);
  const [typography, setTypography] = useState(Typography);


  const toggleTheme = async () => {
    const next = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(next);
     await AsyncStorage.setItem('theme', next === darkTheme ? 'dark' : 'light');
  };

  const setCustomTheme = async (customTheme: typeof theme,type:"dark"|"ligth") => {
    setTheme(customTheme);
    await AsyncStorage.setItem('theme', type);
  };

  return (
    <ThemeContext.Provider value={{ theme,spacing,typography, toggleTheme, setCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
