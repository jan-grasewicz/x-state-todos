import { SpawnedActorRef, State } from 'xstate'
import { TodoContext, TodoEvent } from './state/todoMachine'

export interface ITodo {
  id: number
  title: string
  completed: boolean
  ref: SpawnedActorRef<
    TodoEvent,
    State<
      TodoContext,
      TodoEvent,
      any,
      {
        value: any
        context: TodoContext
      }
    >
  >
}

export enum Filters {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}
