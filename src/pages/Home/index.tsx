// import { useForm } from 'react-hook-form' // hooks -> acomplam uma funcionalidade a um componente
import { createContext, useState } from 'react'
import { HandPalm, Play } from '@phosphor-icons/react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
// import { NewCycleForm } from './NewCycleForm'
import { CountDown } from './components/CountDown'
interface CycleTask {
  id: string
  task: string
  minutes: number
  startDate: Date
  interrupted?: Date
  finisheedDate?: Date
}

interface CycleContextType {
  activeCycle: CycleTask | undefined
  activeCycleID: string | null
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

export function Home() {
  const [cycles, setCycles] = useState<CycleTask[]>([])
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)
  // encontra o ciclo ativo pelo id, na lista cycles

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  // function handleCreateNewTask(data: NewCycleFormData) {
  //   // data -> objeto com os valores dos inputs

  //   const id = String(new Date().getTime())
  //   const newCycle: CycleTask = {
  //     id,
  //     task: data.task,
  //     minutes: data.minutes,
  //     startDate: new Date(),
  //   }

  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleID(id)

  //   reset() // -> reseta os valores dos inputs
  // }

  // const task = watch('task') // watch -> monitora o valor de um input

  function handleInterruptCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return {
            ...cycle,
            interrupted: new Date(),
          }
        }
        return cycle
        setActiveCycleID(null)
      }),
    )
  }
  return (
    <HomeContainer>
      <form action="" /* onSubmit={handleSubmit(handleCreateNewTask)} */>
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleID, markCurrentCycleAsFinished }}
        >
          {/* <NewCycleForm />  */}
          <CountDown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton
            onClick={() => handleInterruptCycle()}
            type="button"
          >
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton /* disabled={!task} */ type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
