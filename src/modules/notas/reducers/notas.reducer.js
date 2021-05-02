import { TOGGLE_NEW_NOTE_MODAL_OPEN, TOGGLE_VIEW_MODE } from '../actions/notas.actions';
import NOTES_CONSTANTS from '../constants/notas.constants';
const initialState = {
  newNoteModalOpen: false,
  viewMode: 'grid'
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_NEW_NOTE_MODAL_OPEN:
      return Object.assign({}, state, { newNoteModalOpen: !state.newNoteModalOpen });
    case TOGGLE_VIEW_MODE:
      return Object.assign({}, state, { viewMode: state.viewMode == NOTES_CONSTANTS.VIEW_MODE.LIST ? NOTES_CONSTANTS.VIEW_MODE.GRID : NOTES_CONSTANTS.VIEW_MODE.LIST });
    default:
      return state;
  }
};
