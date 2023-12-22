import { createContext, useState } from 'react'

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

export const CyclesContext = createContext({} as CycleContextType)

interface CycleContextProviderProps {
  children: React.ReactNode // qualquer html valido
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cycles, setCycles] = useState<CycleTask[]>([])
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
  const [amountSeconds, setAmountSeconds] = useState(0) // armazena o total de segundos que ja se passou desde que a variavel foi criada

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

    setCycles((state) => [...state, newCycle])
    setActiveCycleID(id)
    setAmountSeconds(0)

    // reset() // -> reseta os valores dos inputs
  }

  function interruptCurrentCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleID(null)
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
