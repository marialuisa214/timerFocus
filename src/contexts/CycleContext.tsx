import { createContext, useReducer, useState } from 'react'
import { CycleTask, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions'

interface CreateNewTaskData {
  task: string
  minutes: number
}

interface CycleContextType {
  cycles: CycleTask[]
  activeCycle: CycleTask | undefined
  activeCycleID: string | null
  amountSeconds: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewTask: (data: CreateNewTaskData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

interface CycleContextProviderProps {
  children: React.ReactNode // qualquer html valido
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleID: null,
  })

  /**
   * state -> estado atual
   * action -> ação que vai ser executada para modificar o estado
   * dispach -> função que vai disparar a executar a ação(action)
   */

  const [amountSeconds, setAmountSeconds] = useState(0) // armazena o total de segundos que ja se passou desde que a variavel foi criada
  const { cycles, activeCycleID } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)
  // encontra o ciclo ativo pelo id, na lista cycles

  function markCurrentCycleAsFinished() {
    dispatch(finishCurrentCycleAction())
  }
  function setSecondsPassed(seconds: number) {
    setAmountSeconds(seconds)
  }

  function createNewTask(data: CreateNewTaskData) {
    // data -> objeto com os valores dos inputs

    const id = String(new Date().getTime())
    const newCycle: CycleTask = {
      id,
      task: data.task,
      minutes: data.minutes,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))

    setAmountSeconds(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleID,
        markCurrentCycleAsFinished,
        amountSeconds,
        setSecondsPassed,
        createNewTask,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
