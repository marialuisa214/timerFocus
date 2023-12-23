import { CycleTask } from './reducer'

export enum ActionTypes {
  FINISHEED_CYCLE = 'FINISHEED_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
}

export function addNewCycleAction(newCycle: CycleTask) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function finishCurrentCycleAction() {
  return {
    type: ActionTypes.FINISHEED_CYCLE,
  }
}
