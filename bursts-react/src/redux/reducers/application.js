import {
  TOGGLE_SHOW_COMPLETED,
  TOGGLE_SKIPPED,
  TOGGLE_SPLIT_TO_BURSTS,
  UPDATE_CURRENT_BURST,
  UPDATE_CURRENT_USER,
  LOAD_ACTIVE_DATES, UPDATE_BURST, UPDATE_PLAYER_BURST,
} from '../actionTypes';

const initialState = {
  currentBurstIdLoaded: false,
  currentUserLoaded: false,
  showSkipped: false,
  splitToBursts: false,
  showCompleted: false,
  activeDatesLoaded: false,
  activeDates: [],
  currentBurstLoaded: false,
  burst: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_BURST: {
      const { id } = action.payload;
      return {
        ...state,
        currentBurstId: id,
        currentBurstIdLoaded: true,
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

    case LOAD_ACTIVE_DATES: {
      return {
        ...state,
        activeDatesLoaded: true,
        activeDates: [...action.payload],
      };
    }

    case UPDATE_PLAYER_BURST: {
      return {
        ...state,
        currentBurstLoaded: true,
        burst: { ...action.payload },
      };
    }

    default:
      return state;
  }
}
