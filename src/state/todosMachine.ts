import { createMachine, assign, spawn } from 'xstate'
import { Filters, ITodo } from '../types'
// import { createTodoMachine } from './todoMachine'

const createTodo = (title: string) => {
  return {
    id: Number(String(Date.now()) + String(Math.floor(Math.random() * Math.pow(10, 5)))),
    title,
    completed: false,
  }
}

export interface TodosContext {
  newTodo: string
  todos: ITodo[]
  filter: Filters
}

export type TodosEvent =
  | { type: 'NEWTODO.CHANGE'; value: string }
  | { type: 'NEWTODO.COMMIT'; value: string }
  | { type: 'TODO.COMMIT'; todo: ITodo }
  | { type: 'TODO.DELETE'; id: ITodo['id'] }
  | { type: 'SHOW'; filter: Filters }
  | { type: 'MARK.completed' }
  | { type: 'MARK.active' }
  | { type: 'CLEAR_COMPLETED' }

export enum TodosStateValues {
  'loading' = 'loading',
  'ready' = 'ready',
}

export type TodosState =
  | {
      value: TodosStateValues.loading
      context: TodosContext & {
        newTodo: ''
        todos: []
        filter: Filters.SHOW_ALL
      }
    }
  | {
      value: TodosStateValues.ready
      context: TodosContext
    }

export const todosMachine = createMachine<TodosContext, TodosEvent, TodosState>({
  id: 'todos',
  context: {
    newTodo: '',
    todos: [{ id: 1, title: 'first', completed: false }],
    filter: Filters.SHOW_ALL,
  },
  initial: 'loading',
  states: {
    loading: {
      // entry: assign({
      //   todos: (context) => {
      //     // "Rehydrate" persisted todos
      //     return context.todos.map((todo) => ({
      //       ...todo,
      //       ref: spawn(createTodoMachine(todo)),
      //     }))
      //   },
      // }),
      always: 'ready',
    },
    ready: {},
  },
  on: {
    'NEWTODO.CHANGE': {
      actions: assign({
        newTodo: (_, event) => event.value,
      }),
    },
    // 'NEWTODO.COMMIT': {
    //   actions: [
    //     assign({
    //       todo: '', // clear todo
    //       todos: (context, event) => {
    //         const newTodo = createTodo(event.value.trim())
    //         return context.todos.concat({
    //           ...newTodo,
    //           ref: spawn(createTodoMachine(newTodo)),
    //         })
    //       },
    //     }),
    //     'persist',
    //   ],
    //   cond: (_, event) => event.value.trim().length,
    // },
    // 'TODO.COMMIT': {
    //   actions: [
    //     assign({
    //       todos: (context, event) =>
    //         context.todos.map((todo) => {
    //           return todo.id === event.todo.id ? { ...todo, ...event.todo, ref: todo.ref } : todo
    //         }),
    //     }),
    //     'persist',
    //   ],
    // },
    // 'TODO.DELETE': {
    //   actions: [
    //     assign({
    //       todos: (context, event) => context.todos.filter((todo) => todo.id !== event.id),
    //     }),
    //     'persist',
    //   ],
    // },
    // SHOW: {
    //   actions: assign({
    //     filter: (_, event) => event.filter,
    //   }),
    // },
    // 'MARK.completed': {
    //   actions: (context) => {
    //     context.todos.forEach((todo) => todo.ref.send('SET_COMPLETED'))
    //   },
    // },
    // 'MARK.active': {
    //   actions: (context) => {
    //     context.todos.forEach((todo) => todo.ref.send('SET_ACTIVE'))
    //   },
    // },
    // CLEAR_COMPLETED: {
    //   actions: assign({
    //     todos: (context) => context.todos.filter((todo: ITodo) => !todo.completed),
    //   }),
    // },
  },
})
