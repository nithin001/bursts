import { LOAD_ACTIVITY_FEED } from "../actionTypes";

const initialState = {
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIVITY_FEED: {
      return {
        ...state,
        loaded: true,
        activities: [...action.payload],
      };
    }
    default:
      return state;
  }
}
