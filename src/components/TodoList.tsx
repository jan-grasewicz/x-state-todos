import React, { FC } from 'react'
import {
  AppBar,
  Button,
  createStyles,
  List,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Theme,
  Typography,
} from '@material-ui/core'
import { useService } from '@xstate/react'
import { TodosServiceType } from '../state/todosMachine'
import TodoListItem from './TodoListItem'
import { Filters, ITodo } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      height: 'calc(100vh - 224px)',
      minHeight: '192px',
      overflowY: 'auto',
    },
    bottomBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: theme.spacing(6),
    },
    info: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
)

const filterTodos = (filter: Filters, todos: ITodo[]) => {
  if (filter === Filters.SHOW_ACTIVE) {
    return todos.filter((todo) => !todo.completed)
  }
  if (filter === Filters.SHOW_COMPLETED) {
    return todos.filter((todo) => todo.completed)
  }
  return todos
}

const TodoList: FC<{
  todosService: TodosServiceType
}> = ({ todosService }) => {
  const classes = useStyles()
  const [state, send] = useService(todosService)
  const { filter, todos } = state.context

  const filteredTodos = filterTodos(filter, todos)

  const handleFilterChange = (event: React.ChangeEvent<{}>, newValue: Filters) => {
    send({ type: 'SHOW', filter: newValue })
  }

  const handleDeleteAll = () => {
    send({ type: 'CLEAR_ALL' })
  }

  const handleDeleteCompleted = () => {
    send({ type: 'CLEAR_COMPLETED' })
  }

  const tabsArray = [
    { label: 'Active', filter: Filters.SHOW_ACTIVE },
    { label: 'All', filter: Filters.SHOW_ALL },
    { label: 'Completed', filter: Filters.SHOW_COMPLETED },
  ]

  return (
    <Paper>
      <AppBar position='static' color='default' elevation={0}>
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          variant='fullWidth'
          indicatorColor='primary'
          textColor='primary'
        >
          {tabsArray.map(({ label, filter }) => (
            <Tab key={filter} label={label} value={filter} />
          ))}
        </Tabs>
      </AppBar>

      <List className={classes.list}>
        {!filteredTodos.length ? (
          <Typography className={classes.info} color='textSecondary' variant='subtitle2'>
            No todos
          </Typography>
        ) : (
          filteredTodos.map(({ id, title, completed, ref }) => (
            <TodoListItem key={id} id={id} title={title} completed={completed} todoRef={ref} />
          ))
        )}
      </List>

      <AppBar className={classes.bottomBar} position='static' color='default' elevation={0}>
        <Button color='primary' size='small' onClick={handleDeleteAll}>
          Delete All
        </Button>
        <Button color='primary' size='small' onClick={handleDeleteCompleted}>
          Delete Completed
        </Button>
      </AppBar>
    </Paper>
  )
}

export default TodoList
