import { Play } from '@phosphor-icons/react'
import {
  CountdonwContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  StarCountdownButton,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="taskSugestions"
            placeholder="Dê um nome para o seu Projeto"
          />
          <datalist id="taskSugestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>
          <label htmlFor="">Durante</label>
          <MinutesInput
            step={5}
            min={5}
            max={60}
            type="number"
            id="time"
            placeholder="00"
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdonwContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdonwContainer>

        <StarCountdownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StarCountdownButton>
      </form>
    </HomeContainer>
  )
}
