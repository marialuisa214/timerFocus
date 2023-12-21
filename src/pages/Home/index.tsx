import { useForm } from 'react-hook-form' // hooks -> acomplam uma funcionalidade a um componente
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from '@phosphor-icons/react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CountdonwContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'A tarefa deve ter pelo menos 1 caractere'),
  minutes: zod
    .number()
    .min(5, 'O tempo mínimo é de 5 minutos')
    .max(60, 'O tempo máximo é de 60 minutos'),
})

// interface NewCycleFormData {
//   task: string
//   minutes: number
// }

// -> vamos inferir a timagem a partir newCycleValidationSchema, pois perceba, que ele tem os mesmos campos e o que esperamos, string e number

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

interface CycleTask {
  id: string
  task: string
  minutes: number
  startDate: Date
  interrupted?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<CycleTask[]>([])
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
  const [amountSeconds, setAmountSeconds] = useState(0) // armazena o total de segundos que ja se passou desde que a variavel foi criada

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)
  // encontra o ciclo ativo pelo id, na lista cycles

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      // se o ciclo ativo existir
      interval = setInterval(() => {
        setAmountSeconds(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }

    return () => {
      // -> quando o userEffect for chamado de novo ele deve fazer algo
      clearInterval(interval)
      setAmountSeconds(0)
    }
  }, [activeCycle])

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

    reset() // -> reseta os valores dos inputs
  }

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0
  const currentSecons = activeCycle ? totalSeconds - amountSeconds : 0

  const minutesAmount = Math.floor(currentSecons / 60)
  const secondsAmount = currentSecons % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  // partStart -> se a string tiver menos de 2 caracteres, ele vai adicionar o 0 no inicio

  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} `
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task') // watch -> monitora o valor de um input

  function HadleInterruptCycle() {
    setActiveCycleID(null)
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return {
            ...cycle,
            interrupted: new Date(),
          }
        }
        return cycle
      }),
    )
  }
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewTask)}>
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="taskSugestions"
            placeholder="Dê um nome para o seu Projeto"
            {...register('task')}
            disabled={!!activeCycle}
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
            {...register('minutes', { valueAsNumber: true })}
            disabled={!!activeCycle}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdonwContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdonwContainer>

        {activeCycle ? (
          <StopCountdownButton
            onClick={() => HadleInterruptCycle()}
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
