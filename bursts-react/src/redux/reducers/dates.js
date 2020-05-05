import moment from 'moment';
import { UPDATE_DATES } from '../actionTypes';

const initialState = {
  startDate: moment().subtract(7, 'days'),
  endDate: moment(),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATES: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
