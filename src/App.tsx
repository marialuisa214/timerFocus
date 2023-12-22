import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { defautTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './components/Router'
import { CycleContextProvider } from './contexts/CycleContext'

export function App() {
  return (
    <ThemeProvider theme={defautTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
