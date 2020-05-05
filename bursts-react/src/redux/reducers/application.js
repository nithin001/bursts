import { UPDATE_CURRENT_BURST, UPDATE_CURRENT_USER, TOGGLE_SKIPPED } from '../actionTypes';

const initialState = {
  currentBurstLoaded: false,
  currentUserLoaded: false,
  showSkipped: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_BURST: {
      const { id } = action.payload;
      return {
        ...state,
        currentBurstId: id,
        currentBurstLoaded: true,
      };
    }
    case UPDATE_CURRENT_USER: {
      return {
        ...state,
        user: { ...action.payload },
        currentUserLoaded: true,
      };
    }
    case TOGGLE_SKIPPED: {
      const skipped = !state.showSkipped;
      return {
        ...state,
        showSkipped: skipped,
      };
    }
    default:
      return state;
  }
}
