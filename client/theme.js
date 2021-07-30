import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
      light: '#588ba8',
      main: '#fff',
      dark: '#373737',
      contrastText: '#fed361',
    },
    secondary: {
      light: '#ffad42',
      main: '#44c9aa',
      dark: '#bb4d00',
      contrastText: '#fffde7',
    },
      openTitle: '#588ba8',
      protectedTitle: '#f57c00',
      type: 'light'
    }
  })

  export default theme