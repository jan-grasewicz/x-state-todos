import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from './theme'
import Root from './components/Root'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
