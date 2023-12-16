import styled from 'styled-components'

export const HistoryContainer = styled.div`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto; // se maior que a pagina cria scroll
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse; // junta as bordas das celulas
    min-width: 600px; // force a tabela a ter no minimo 600px -> se nao scroll
  }
  th {
    background-color: ${(props) => props.theme['gray-600']};
    padding: 1rem;
    text-align: left;
    color: ${(props) => props.theme['gray-100']};
    font-size: 0%.875rem; // 14px
    line-height: 1.6;

    &:first-child {
      border-top-left-radius: 8px;
      padding-left: 1.5rem;
    }

    &:last-child {
      border-top-right-radius: 8px;
      padding-right: 1.5rem;
    }
  }
  td {
    background-color: ${(props) => props.theme['gray-700']};
    border-top: 4px solid ${(props) => props.theme['gray-800']};
    padding: 1rem;
    font-size: 0.875rem; // 14px
    line-height: 1.6;

    &:first-child {
      width: 50%;
      padding-left: 1.5rem;
    }

    &:last-child {
      padding-right: 1.5rem;
    }
  }
`
