import React, { useEffect } from 'react'
import { Box, Container } from '@material-ui/core'
import { useMachine } from '@xstate/react'
import { todosMachine } from '../state/todosMachine'
import TodoList from './TodoList'
import TodoInput from './TodoInput'
import { Filters, ITodo } from '../types'
import { useHashChange } from '../useHashChange'

function filterTodos(filter: Filters, todos: ITodo[]) {
  if (filter === Filters.SHOW_ACTIVE) {
    return todos.filter((todo) => !todo.completed)
  }

  if (filter === Filters.SHOW_COMPLETED) {
    return todos.filter((todo) => todo.completed)
  }

  return todos
}

const Root = () => {
  const [state, send] = useMachine(
    todosMachine.withConfig({
      todo: 'Learn state machines',
      todos: (async () => {
        try {
          let response = await fetch('https://jsonplaceholder.typicode.com/todos')
          let todos: ITodo[] = await response.json()
          return todos
        } catch (e) {
          console.error(e)
          return []
        }
      })(),
    }),
    { devTools: true }
  )

  useHashChange(() => {
    send({ type: 'SHOW', filter: window.location.hash.slice(2) || Filters.SHOW_ALL })
  })

  useEffect(() => {
    window.location.hash.slice(2) && send({ type: 'SHOW', filter: window.location.hash.slice(2) })
  }, [send])

  const { todos, todo, filter } = state.context

  const numActiveTodos = todos.filter((todo) => !todo.completed).length
  const allCompleted = todos.length > 0 && numActiveTodos === 0
  const mark = !allCompleted ? 'completed' : 'active'
  const markEvent = `MARK.${mark}`
  const filteredTodos = filterTodos(filter, todos)

  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        {/* <TodoInput />
        <TodoList /> */}
      </Box>
    </Container>
  )
}

export default Root
