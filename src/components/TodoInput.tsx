import React, { FC } from 'react'
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
import { TodosServiceType } from '../state/todosMachine'

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
  todosService: TodosServiceType
}> = ({ todosService }) => {
  const classes = useStyles()
  const [state, send] = useService(todosService)
  const { newTodo } = state.context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    send({ type: 'NEWTODO.CHANGE', value: e.target.value })
  }

  const handleAdd = () => {
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
        value={newTodo}
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
