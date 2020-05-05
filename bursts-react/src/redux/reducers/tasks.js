import {
  LOAD_TASKS,
  ADD_TO_TASK,
  REMOVE_TASK,
  TOGGLE_EDIT_MODE,
  EDIT_TASK,
} from '../actionTypes';

const initialState = {
  loaded: false,
  tasks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TASKS: {
      const tasks = action.payload;
      return {
        ...state,
        loaded: true,
        tasks: [...tasks],
      };
    }

    case ADD_TO_TASK: {
      const task = action.payload;
      return {
        ...state,
        loaded: true,
        tasks: [...state.tasks, task],
      };
    }

    case REMOVE_TASK: {
      const taskId = action.payload;
      const tasks = [...state.tasks].filter(task => task.id !== taskId);
      return {
        ...state,
        loaded: true,
        tasks,
      };
    }

    case TOGGLE_EDIT_MODE: {
      const taskId = action.payload;
      const tasks = [...state.tasks].map((task) => {
        const editMode = task.editMode || false;
        if (task.id === taskId) {
          return { ...task, editMode: !editMode };
        }
        return task;
      });

      return {
        ...state,
        loaded: true,
        tasks,
      };
    }

    case EDIT_TASK: {
      const taskId = action.payload.id;
      const tasks = [...state.tasks].map((task) => {
        if (task.id === taskId) {
          return { ...task, ...action.payload, editMode: false };
        }
        return task;
      });

      return {
        ...state,
        loaded: true,
        tasks,
      };
    }

    default:
      return state;
  }
}
