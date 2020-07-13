import { LOAD_BURSTS } from '../actionTypes';

const initialState = {
  loaded: false,
  bursts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_BURSTS: {
      const { bursts } = action.payload;
      const { count } = action.payload;
      if (action.clearOnLoad) {
        return {
          ...state,
          bursts,
          count,
          loaded: true,
        };
      }
      return {
        ...state,
        loaded: true,
        bursts: [...state.bursts, ...bursts],
        count,
      };
    }

    default:
      return state;
  }
}
