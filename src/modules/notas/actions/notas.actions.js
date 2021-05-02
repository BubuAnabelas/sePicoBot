export const TOGGLE_NEW_NOTE_MODAL_OPEN = 'TOGGLE_NEW_NOTE_MODAL_OPEN';
export const TOGGLE_VIEW_MODE = 'TOGGLE_VIEW_MODE';

export const toggleNewNoteModalOpen = () => {
  return {
    type: TOGGLE_NEW_NOTE_MODAL_OPEN
  };
};

export const toggleViewMode = () => {
  return {
    type: TOGGLE_VIEW_MODE
  };
};