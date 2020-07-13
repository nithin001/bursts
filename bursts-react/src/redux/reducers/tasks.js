import {
  ADD_TO_TASK, EDIT_TASK, LOAD_TASKS, REMOVE_TASK, TOGGLE_EDIT_MODE,
} from '../actionTypes';

const initialState = {
  loaded: false,
  tasks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TASKS: {
      const { tasks } = action.payload;
      const { count } = action.payload;
      if (action.clearOnLoad) {
        return {
          ...state,
          tasks,
          count,
          loaded: true,
        };
      }
      return {
        ...state,
        loaded: true,
        tasks: [...state.tasks, ...tasks],
        count,
      };
    }

    case ADD_TO_TASK: {
      const task = action.payload;
      return {
        ...state,
        loaded: true,
        tasks: [...state.tasks, task],
        count: state.count + 1,
      };
    }

    case REMOVE_TASK: {
      const taskId = action.payload;
      const tasks = [...state.tasks].filter(task => task.id !== taskId);
      return {
        ...state,
        loaded: true,
        tasks,
        count: state.count - 1,
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
