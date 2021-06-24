import { Box, Container } from '@material-ui/core'
import TodoList from './TodoList'
import TodoInput from './TodoInput'
import { useMachine } from '@xstate/react'
import { todosMachine } from '../state/todosMachine'

const Root = () => {
  const [state, send, service] = useMachine(todosMachine, { devTools: true })

  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <TodoInput todosService={service} />
        <TodoList todosService={service} />
      </Box>
    </Container>
  )
}

export default Root
