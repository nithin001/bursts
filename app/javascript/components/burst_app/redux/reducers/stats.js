import { LOAD_STATS } from "../actionTypes";

const initialState = {
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_STATS: {
      const { id } = action.payload;
      return {
        ...state,
        loaded: true,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
