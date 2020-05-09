import {
  UPDATE_CURRENT_BURST,
  UPDATE_CURRENT_USER,
  TOGGLE_SKIPPED,
  TOGGLE_SPLIT_TO_BURSTS,
  TOGGLE_SHOW_COMPLETED,
} from "../actionTypes";

const initialState = {
  currentBurstLoaded: false,
  currentUserLoaded: false,
  showSkipped: false,
  splitToBursts: false,
  showCompleted: false,
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

    case TOGGLE_SHOW_COMPLETED: {
      const showCompleted = !state.showCompleted;
      return {
        ...state,
        showCompleted,
      };
    }

    default:
      return state;
  }
}
