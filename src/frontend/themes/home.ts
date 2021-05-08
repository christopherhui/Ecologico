import { createMuiTheme } from '@material-ui/core'
import red from '@material-ui/core/colors/red'

export default createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          background: 'linear-gradient(215.45deg, rgba(11, 163, 96, 0.25) 9.1%, rgba(227, 255, 214, 0.125) 39.7%)',
          backgroundRepeat: 'space',
          backgroundAttachment: 'fixed'
        }
      }
    }
  },
  palette: {
    primary: { main: '#3CBA92' },
    secondary: { main: '#FFFFFF' },
    error: red
  }
})
