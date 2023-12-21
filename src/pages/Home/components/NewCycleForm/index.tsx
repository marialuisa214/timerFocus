import { FormContainer, MinutesInput, TaskInput } from './styles'

export function NewCycleForm() {
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
