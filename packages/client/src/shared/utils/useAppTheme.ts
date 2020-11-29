import { useState, useEffect } from 'react';
import { darkTheme, lightTheme, ITheme } from '../themes/index';

export const useAppTheme = (defaultTheme: ITheme = lightTheme): any => {
  const [theme, _setTheme] = useState(getInitialTheme);

  function getInitialTheme(): ITheme {
    const savedTheme = localStorage.getItem('theme');

    if (
      savedTheme &&
      (JSON.parse(savedTheme) === 'dark' || JSON.parse(savedTheme) === 'light')
    ) {
      return JSON.parse(savedTheme) === 'dark' ? darkTheme : defaultTheme;
    }
    return defaultTheme;
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme.type));
  }, [theme]);

  return {
    theme,
    setTheme: ({ setTheme, ...theme }: any) => {
      if (theme.type === 'dark') {
        return _setTheme(darkTheme);
      }
      return _setTheme(lightTheme);
    }
  };
};
