import { Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form' // hooks -> acomplam uma funcionalidade a um componente
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CountdonwContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  StarCountdownButton,
  TaskInput,
} from './styles'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'A tarefa deve ter pelo menos 1 caractere'),
  minutes: zod
    .number()
    .min(5, 'O tempo mínimo é de 5 minutos')
    .max(60, 'O tempo máximo é de 60 minutos'),
})

export function Home() {
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: zodResolver(newCycleValidationSchema),
  })

  function handleCreateNewTask(data: any) {
    // data -> objeto com os valores dos inputs
    console.log(data)
  }

  console.log(formState.errors)
  const task = watch('task') // watch -> monitora o valor de um input

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
          />
          <datalist id="taskSugestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>
          <label htmlFor="">Durante</label>
          <MinutesInput
            // step={5}
            // min={5}
            // max={60}
            type="number"
            id="time"
            placeholder="00"
            {...register('minutes', { valueAsNumber: true })}
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

        <StarCountdownButton disabled={!task} type="submit">
          <Play size={24} />
          Começar
        </StarCountdownButton>
      </form>
    </HomeContainer>
  )
}
