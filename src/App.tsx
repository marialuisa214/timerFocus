import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { defautTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './components/Router'

export function App() {
  return (
    <ThemeProvider theme={defautTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
