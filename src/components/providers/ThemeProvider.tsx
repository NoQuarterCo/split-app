import React, { FC, Fragment } from "react"

import { ThemeProvider as ThemeContextProvider } from "../../application/context"
import {
  theme,
  ThemeProvider as SCThemeProvider,
} from "../../application/theme"

import { useAsyncStorage } from "../../lib/hooks/useAsyncStorage"

const ThemeProvider: FC = ({ children }) => {
  const [isDark, setDarkTheme] = useAsyncStorage("darkTheme", false)
  const toggleTheme = () => setDarkTheme(!isDark)

  return (
    <SCThemeProvider theme={theme(isDark)}>
      <ThemeContextProvider
        value={{ toggleTheme, isDark, theme: theme(isDark) }}
      >
        <Fragment>{children}</Fragment>
      </ThemeContextProvider>
    </SCThemeProvider>
  )
}

export default ThemeProvider
