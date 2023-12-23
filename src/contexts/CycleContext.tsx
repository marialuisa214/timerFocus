import { createContext, useReducer, useState } from 'react'

interface CycleTask {
  id: string
  task: string
  minutes: number
  startDate: Date
  interrupted?: Date
  finisheedDate?: Date
}

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

interface CycleState {
  cycles: CycleTask[]
  activeCycleID: string | null
}

export const CyclesContext = createContext({} as CycleContextType)

interface CycleContextProviderProps {
  children: React.ReactNode // qualquer html valido
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CycleState, action: any) => {
      switch (action.type) {
        case 'FINISHEED_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleID) {
                return { ...cycle, finisheedDate: new Date() }
              } else {
                return cycle
              }
            }),
            activeCycleID: null,
          }
        case 'INTERRUPT_CURRENT_CYCLE': {
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleID) {
                return { ...cycle, interruptedDate: new Date() }
              } else {
                return cycle
              }
            }),
            activeCycleID: null,
          }
        }
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleID: action.payload.newCycle.id,
          }
        default:
          return state
      }
      return state
    },
    {
      cycles: [],
      activeCycleID: null,
    },
  )

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
    dispatch({
      type: 'FINISHEED_CYCLE',
      payload: {
        activeCycleID,
      },
    })
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
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    setAmountSeconds(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleID,
      },
    })
    // setCycles(
    //   cycles.map((cycle) => {
    //     if (cycle.id === activeCycleID) {
    //       return { ...cycle, interrupted: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
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
