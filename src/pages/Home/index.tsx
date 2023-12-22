import { FormProvider, useForm } from 'react-hook-form' // hooks -> acomplam uma funcionalidade a um componente
import { useContext } from 'react'
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
import { CyclesContext } from '../../contexts/CycleContext'

export function Home() {
  const { activeCycle, createNewTask, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleValidationSchema = zod.object({
    task: zod.string().min(1, 'A tarefa deve ter pelo menos 1 caractere'),
    minutes: zod
      .number()
      .min(5, 'O tempo mínimo é de 5 minutos')
      .max(60, 'O tempo máximo é de 60 minutos'),
  })
  type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })

  const { handleSubmit, watch /* reset */ } = newCycleForm

  const task = watch('task') // watch -> monitora o valor de um input

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(createNewTask)}>
        <FormProvider {...newCycleForm}>
          {/* pega todas as funcionalidades do newCycleForm e passa para o filho */}
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountdownButton
            onClick={() => interruptCurrentCycle()}
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
