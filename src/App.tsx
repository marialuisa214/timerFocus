import { ThemeProvider } from 'styled-components'
import { Button } from './components/Button'
import { defautTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={defautTheme}>
      <Button variant="vermelho" />
      <Button variant="azul" />
      <Button variant="roxo" />
      <Button />
      <p>Olá mundo</p>

      <GlobalStyle />
    </ThemeProvider>
  )
}
