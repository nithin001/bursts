import { LOAD_BURSTS } from "../actionTypes";

const initialState = {
  loaded: false,
  bursts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_BURSTS: {
      const bursts = action.payload.bursts;
      const count = action.payload.count;
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
        count: count,
      };
    }

    default:
      return state;
  }
}
