import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';
import { THEME_TYPE_STORAGE_KEY } from '~/_shared/constants';
import { getFromLocalStore } from '~/_shared/helper';



type ThemeType = 'light' | 'dark';

interface ThemeContextValues {
  themeType: ThemeType;
  setThemeType?: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = createContext<ThemeContextValues>({
  themeType: 'light',
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [themeType, setThemeType] = useState<ThemeType>('light');
 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = getFromLocalStore(THEME_TYPE_STORAGE_KEY ?? 'light');
      if (theme) {
        setThemeType(theme as ThemeType);
      }
    }
  }, []);


  return (
    <ThemeContext.Provider value={{ themeType, setThemeType }}>
      {children}
    </ThemeContext.Provider>
  );
};
