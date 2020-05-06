import { UPDATE_CURRENT_BURST, UPDATE_CURRENT_USER, TOGGLE_SKIPPED, TOGGLE_SPLIT_TO_BURSTS } from '../actionTypes';

const initialState = {
  currentBurstLoaded: false,
  currentUserLoaded: false,
  showSkipped: false,
  splitToBursts: false,
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

    case TOGGLE_SPLIT_TO_BURSTS: {
      const split = !state.splitToBursts;
      return {
        ...state,
        splitToBursts: split,
      };
    }
    default:
      return state;
  }
}
