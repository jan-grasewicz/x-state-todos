import React from 'react'
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
import TodoListItem from './TodoListItem'
import { Filters } from '../types'

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

const TodoList = () => {
  const classes = useStyles()

  const filteredTodosIds =
    activeFilter === Filters.SHOW_ACTIVE
      ? activeTodosIds
      : activeFilter === Filters.SHOW_COMPLETED
      ? completedTodosIds
      : allTodosIds

  const handleFilterChange = (event: React.ChangeEvent<{}>, newValue: Filters) => {}

  const handleDeleteAll = () => {}

  const handleDeleteCompleted = () => {}

  const tabsArray = [
    { label: 'Active', filter: Filters.SHOW_ACTIVE },
    { label: 'All', filter: Filters.SHOW_ALL },
    { label: 'Completed', filter: Filters.SHOW_COMPLETED },
  ]

  return (
    <Paper>
      <AppBar position='static' color='default' elevation={0}>
        <Tabs
          value={activeFilter}
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
        {!filteredTodosIds.length ? (
          <Typography className={classes.info} color='textSecondary' variant='subtitle2'>
            No todos
          </Typography>
        ) : (
          filteredTodosIds.map((todoId) => <TodoListItem key={todoId} id={todoId} />)
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
