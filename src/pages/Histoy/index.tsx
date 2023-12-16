import { HistoryContainer, HistoryList } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Inicio</th>
            <th>Status</th>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 dias</td>
              <td>Finalizado</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 dias</td>
              <td>Finalizado</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 dias</td>
              <td>Finalizado</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
