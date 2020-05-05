import { UPDATE_BURST } from '../actionTypes';

const initialState = {
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_BURST: {
      return {
        ...state,
        loaded: true,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
