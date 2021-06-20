import React, { FC, useState } from 'react'
import {
  createStyles,
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useService } from '@xstate/react'
import { Interpreter } from 'xstate'
import { TodosContext, TodosEvent, TodosState } from '../state/todosMachine'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputWrap: {
      display: 'flex',
      alignItems: 'center',
      padding: '2px 4px',
      marginBottom: theme.spacing(2),
    },
    input: {
      flex: 1,
      marginLeft: theme.spacing(1),
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
)

const TodoInput: FC<{
  value: string
  todosService: Interpreter<TodosContext, any, TodosEvent, TodosState>
}> = ({ value, todosService }) => {
  const classes = useStyles()
  const [state, send] = useService(todosService)
  // const INITIAL_INPUT_VALUE = ''
  // const [inputValue, setInputValue] = useState(INITIAL_INPUT_VALUE)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setInputValue(e.target.value)
    send({ type: 'NEWTODO.CHANGE', value: e.target.value })
  }

  const handleAdd = () => {
    // setInputValue(INITIAL_INPUT_VALUE)
    send({ type: 'NEWTODO.COMMIT' })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <Paper component='form' className={classes.inputWrap}>
      <InputBase
        className={classes.input}
        placeholder='Add Todo'
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <Divider className={classes.divider} orientation='vertical' />
      <IconButton color='primary' className={classes.iconButton} onClick={handleAdd}>
        <AddIcon />
      </IconButton>
    </Paper>
  )
}

export default TodoInput
