import React, { useEffect } from 'react'
import { Box, Container } from '@material-ui/core'
import TodoList from './TodoList'
import TodoInput from './TodoInput'

const Root = () => {
  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <TodoInput />
        <TodoList />
      </Box>
    </Container>
  )
}

export default Root
