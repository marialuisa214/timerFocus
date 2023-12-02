// .d  -> codigo de definicao de tipos (INTERFACE)

import 'styled-components'
import { DefaultTheme } from '../styles/themes/default.ts'

type ThemeType = typeof DefaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
