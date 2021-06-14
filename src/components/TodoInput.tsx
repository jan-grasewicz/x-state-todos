import React, { useState } from 'react'
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

const TodoInput = () => {
  const classes = useStyles()
  const INITIAL_INPUT_VALUE = ''
  const [inputValue, setInputValue] = useState(INITIAL_INPUT_VALUE)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleAdd = () => {
    setInputValue(INITIAL_INPUT_VALUE)
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
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Divider className={classes.divider} orientation='vertical' />
      <IconButton color='primary' className={classes.iconButton} onClick={handleAdd}>
        <AddIcon />
      </IconButton>
    </Paper>
  )
}

export default TodoInput
