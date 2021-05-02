import { TOGGLE_SIDEBAR } from '../actions/sidebar.actions';

const initialState = {
  open: false
};

export default function sideBarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR: {
      return Object.assign({}, state, { open: !state.open });
    }
    default: {
      return state;
    }
  }
}
