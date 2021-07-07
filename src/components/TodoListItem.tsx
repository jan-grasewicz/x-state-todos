import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { ITodo } from '../types'
import { useActor } from '@xstate/react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    completed: {
      textDecoration: `solid line-through ${theme.palette.primary.main} 2px`,
    },
    listItem: {
      height: theme.spacing(6),
    },
  })
)

type Props = { todoRef: ITodo['ref'] }

const TodoListItem: React.FC<Props> = ({ todoRef }) => {
  const classes = useStyles()
  const [state, send] = useActor(todoRef)
  const { id, title, completed } = state.context

  const handleToggle = () => {
    send({ type: 'TOGGLE_COMPLETE' })
  }
  const handleDelete = () => {}

  return (
    <ListItem
      key={id}
      role={undefined}
      dense
      button
      onClick={handleToggle}
      className={classes.listItem}
    >
      <ListItemText
        id={String(id)}
        primary={title}
        className={completed ? classes.completed : undefined}
      />
      <ListItemSecondaryAction>
        <IconButton edge='end' aria-label='comments' onClick={handleDelete}>
          <DeleteForeverIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TodoListItem
