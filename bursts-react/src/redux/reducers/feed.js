import { LOAD_ACTIVITY_FEED } from '../actionTypes';

const initialState = {
  loaded: false,
  activities: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIVITY_FEED: {
      const activities = action.clearOnLoad
        ? [...action.payload.activities]
        : [...state.activities, ...action.payload.activities];
      const { total_activities } = action.payload;
      return {
        ...state,
        loaded: true,
        activities,
        total_activities,
      };
    }
    default:
      return state;
  }
}
