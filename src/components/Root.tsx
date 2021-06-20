import React, { useEffect } from 'react'
import { Box, Container } from '@material-ui/core'
import TodoList from './TodoList'
import TodoInput from './TodoInput'
import { useMachine } from '@xstate/react'
import { todosMachine } from '../state/todosMachine'

const Root = () => {
  const [state, send, service] = useMachine(todosMachine, { devTools: true })
  const { newTodo, todos } = state.context

  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <TodoInput value={newTodo} todosService={service} />
        <TodoList todos={todos} />
      </Box>
    </Container>
  )
}

export default Root
