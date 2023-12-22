import { FormProvider, useForm } from 'react-hook-form' // hooks -> acomplam uma funcionalidade a um componente
import { createContext, useState } from 'react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from '@phosphor-icons/react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'
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
  amountSeconds: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CycleContextType)

export function Home() {
  const [cycles, setCycles] = useState<CycleTask[]>([])
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
  const [amountSeconds, setAmountSeconds] = useState(0) // armazena o total de segundos que ja se passou desde que a variavel foi criada
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)
  // encontra o ciclo ativo pelo id, na lista cycles

  const newCycleValidationSchema = zod.object({
    task: zod.string().min(1, 'A tarefa deve ter pelo menos 1 caractere'),
    minutes: zod
      .number()
      .min(5, 'O tempo mínimo é de 5 minutos')
      .max(60, 'O tempo máximo é de 60 minutos'),
  })
  type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

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
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewTask(data: NewCycleFormData) {
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

    reset() // -> reseta os valores dos inputs
  }

  function setSecondsPassed(seconds: number) {
    setAmountSeconds(seconds)
  }

  const task = watch('task') // watch -> monitora o valor de um input

  function handleInterruptCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return {
            ...cycle,
            interrupted: new Date(),
          }
        }
        setActiveCycleID(null)
        return cycle
      }),
      console.log('ciclo interrompido com sucesso'),
    )
  }
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewTask)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleID,
            markCurrentCycleAsFinished,
            amountSeconds,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            {/* pega todas as funcionalidades do newCycleForm e passa para o filho */}
            <NewCycleForm />
          </FormProvider>
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
          <StartCountdownButton disabled={!task} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
