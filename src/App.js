import logo from './logo.svg';
import './App.css';
import theme from './theme';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { store, history } from './store';
import { Provider } from 'react-redux';

import NavBar from './components/NavBar/navbar';
import Dashboard from './modules/dashboard/Dashboard';
import SideBar from './components/SideBar/SideBar';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import Notas from './modules/notas/Notas';
import Puntos from './modules/puntos/Puntos';

function App() {
  console.log(theme);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConnectedRouter history={history}>
          <div className="App">
            <NavBar />
            <SideBar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/notas" component={Notas} />
              <Route exact path="/puntos" component={Puntos} />
              <Route render={() => <div>404</div>} />
            </Switch>
          </div>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
