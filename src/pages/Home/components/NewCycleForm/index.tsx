import { FormContainer, MinutesInput, TaskInput } from './styles'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function NewCycleForm() {
  const newCycleValidationSchema = zod.object({
    task: zod.string().min(1, 'A tarefa deve ter pelo menos 1 caractere'),
    minutes: zod
      .number()
      .min(5, 'O tempo mínimo é de 5 minutos')
      .max(60, 'O tempo máximo é de 60 minutos'),
  })
  type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })
  return (
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
  )
}
