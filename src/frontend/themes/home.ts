import { createMuiTheme } from '@material-ui/core'
import red from '@material-ui/core/colors/red'

export default createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          background: 'white',
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
