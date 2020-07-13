import {
  ADD_TO_WORKS, EDIT_WORK, LOAD_WORKS, REMOVE_FROM_WORKS,
} from '../actionTypes';

const initialState = {
  loaded: false,
  works: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_WORKS: {
      const works = action.payload;
      return {
        ...state,
        works: [...works],
        loaded: true,
      };
    }

    case ADD_TO_WORKS: {
      const work = action.payload;
      return {
        ...state,
        works: [...state.works, work],
        loaded: true,
      };
    }

    case REMOVE_FROM_WORKS: {
      const workId = action.payload;
      const works = state.works.filter(work => work.id !== workId);
      return {
        ...state,
        works,
        loaded: true,
      };
    }

    case EDIT_WORK: {
      const { workId } = action;
      const works = state.works.filter(work => work.id !== workId);
      return {
        ...state,
        works: [...works, action.payload],
        loaded: true,
      };
    }

    default:
      return state;
  }
}
