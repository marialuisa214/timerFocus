import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface CycleTask {
  id: string
  task: string
  minutes: number
  startDate: Date
  interrupted?: Date
  finisheedDate?: Date
}

interface CycleState {
  cycles: CycleTask[]
  activeCycleID: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.FINISHEED_CYCLE: {
      const activeCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID
      })

      return produce(state, (draft) => {
        draft.activeCycleID = null
        draft.cycles[activeCycleIndex].finisheedDate = new Date()
      })
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const activeCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID
      })

      if (activeCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleID = null
        draft.cycles[activeCycleIndex].interrupted = new Date()
      })
    }
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleID: action.payload.newCycle.id,
      // }
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleID = action.payload.newCycle.id
      })
    default:
      return state
  }
}
