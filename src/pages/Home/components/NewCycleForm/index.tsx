import { FormContainer, MinutesInput, TaskInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CycleContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

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
