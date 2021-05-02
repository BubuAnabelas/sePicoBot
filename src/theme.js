import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFE600'
    },
    secondary: {
      main: green[500]
    },
    background: {
      default: yellow[50]
    }
  }
});

export default theme;
