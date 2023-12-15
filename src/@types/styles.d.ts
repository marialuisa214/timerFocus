// .d.ts  -> codigo de definicao de tipos do typeScript (INTERFACE), so possui tipagem

import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
