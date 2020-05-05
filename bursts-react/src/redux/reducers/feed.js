import { LOAD_ACTIVITY_FEED } from '../actionTypes';

const initialState = {
  loaded: false,
  activities: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIVITY_FEED: {
      return {
        ...state,
        loaded: true,
        activities: [...state.activities, ...action.payload.activities],
        total_activities: action.payload.total_activities,
      };
    }
    default:
      return state;
  }
}
