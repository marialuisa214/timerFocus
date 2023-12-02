import styled from 'styled-components'

export type ButtonVariant = 'vermelho' | 'azul' | 'roxo'

interface ButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  margin: 8px;
  border: 0;

  background-color: ${(props) => props.theme['green-500']};
`
