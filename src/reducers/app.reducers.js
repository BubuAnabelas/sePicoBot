import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import sideBarReducer from '../components/SideBar/reducers/sidebar.reducer';
import notesReducer from '../modules/notas/reducers/notas.reducer';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    sideBarStore: sideBarReducer,
    notesStore: notesReducer
  });

export default createRootReducer;
