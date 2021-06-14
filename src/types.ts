export interface ITodo {
  id: number
  title: string
  completed: boolean
}

export enum Filters {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}
