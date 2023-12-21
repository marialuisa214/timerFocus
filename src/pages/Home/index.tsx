import { useForm } from 'react-hook-form' // hooks -> acomplam uma funcionalidade a um componente
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from '@phosphor-icons/react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './NewCycleForm'
import { CountDown } from './components/CountDown'
interface CycleTask {
  id: string
  task: string
  minutes: number
  startDate: Date
  interrupted?: Date
  finisheedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<CycleTask[]>([])
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
  const [amountSeconds, setAmountSeconds] = useState(0) // armazena o total de segundos que ja se passou desde que a variavel foi criada

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)
  // encontra o ciclo ativo pelo id, na lista cycles

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


  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} `
    }
  }, [minutes, seconds, activeCycle])

 

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
        return cycle
        setActiveCycleID(null)
      }),
    )
  }
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewTask)}>
        <NewCycleForm />
        <CountDown activeCycle={activeCycle} setCycles={setCycles}, activeCycleID={activeCycleID}/>

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
