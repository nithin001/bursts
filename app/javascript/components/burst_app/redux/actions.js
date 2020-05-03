import {
  UPDATE_CURRENT_BURST,
  UPDATE_BURST,
  UPDATE_CURRENT_USER,
  LOAD_TASKS,
  ADD_TO_TASK,
  REMOVE_TASK,
  TOGGLE_EDIT_MODE,
  EDIT_TASK,
  LOAD_STATS,
  LOAD_ACTIVITY_FEED,
} from "./actionTypes";

import { AxiosInstance } from "../util/api";

export const toggleEditMode = (id) => {
  return {
    type: TOGGLE_EDIT_MODE,
    payload: id,
  };
};

export const loadCurrentBurst = () => (dispatch) => {
  AxiosInstance()
    .get("/burst.json")
    .then((response) => {
      dispatch({
        type: UPDATE_CURRENT_BURST,
        payload: { id: response.data.id },
      });
    });
};

export const loadCurrentUser = () => (dispatch) => {
  AxiosInstance()
    .get("/user.json")
    .then((response) => {
      dispatch({
        type: UPDATE_CURRENT_USER,
        payload: response.data,
      });
    });
};

export const loadStats = () => (dispatch) => {
  AxiosInstance()
    .get("/stats.json")
    .then((response) => {
      dispatch({
        type: LOAD_STATS,
        payload: response.data,
      });
    });
};

export const loadBurst = (id) => (dispatch) => {
  AxiosInstance()
    .get(`/bursts/${id}.json`)
    .then((response) => {
      dispatch({
        type: UPDATE_BURST,
        payload: response.data,
      });
    });
};

export const loadTasks = (id) => (dispatch) => {
  AxiosInstance()
    .get(`/bursts/${id}/tasks.json`)
    .then((response) => {
      dispatch({
        type: LOAD_TASKS,
        payload: response.data,
      });
    });
};

export const createBurst = () => (dispatch) => {
  AxiosInstance()
    .post(`/bursts.json`)
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: UPDATE_CURRENT_BURST,
          payload: { id: response.data.id },
        });
      }
    });
};

export const startBurst = (id) => (dispatch) => {
  AxiosInstance()
    .patch(`/bursts/${id}/start.json`)
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: UPDATE_BURST,
          payload: response.data,
        });
      }
    });
};

export const completeBurst = (id) => (dispatch) => {
  AxiosInstance()
    .patch(`/bursts/${id}/complete.json`)
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: UPDATE_BURST,
          payload: response.data,
        });
      }
    });
};
export const updateBurstNotified = (id) => () => {
  AxiosInstance().patch(`/bursts/${id}/notified.json`)
};



export const createTask = (burstId, taskDescription) => (dispatch) => {
  AxiosInstance()
    .post(`/bursts/${burstId}/tasks.json`, {
      description: taskDescription,
    })
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: ADD_TO_TASK,
          payload: response.data,
        });
      }
    });
};

export const deleteTask = (burstId, taskId) => (dispatch) => {
  AxiosInstance()
    .delete(`/bursts/${burstId}/tasks/${taskId}.json`)
    .then((response) => {
      if (response.status === 204) {
        dispatch({
          type: REMOVE_TASK,
          payload: taskId,
        });
      }
    });
};

export const editTask = (burstId, taskId, taskDescription) => (dispatch) => {
  AxiosInstance()
    .patch(`/bursts/${burstId}/tasks/${taskId}.json`, {
      description: taskDescription,
    })
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: EDIT_TASK,
          payload: response.data,
        });
      }
    });
};

export const completeTask = (burstId, taskId) => (dispatch) => {
  AxiosInstance()
    .patch(`/bursts/${burstId}/tasks/${taskId}/complete.json`)
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: EDIT_TASK,
          payload: response.data,
        });
      }
    });
};

export const undoCompleteTask = (burstId, taskId) => (dispatch) => {
  AxiosInstance()
    .patch(`/bursts/${burstId}/tasks/${taskId}/undo_complete.json`)
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: EDIT_TASK,
          payload: response.data,
        });
      }
    });
};

export const loadActivityFeed = () => (dispatch) => {
  AxiosInstance()
    .get(`/feed.json?type=latest&count=5`)
    .then((response) => {
      dispatch({
        type: LOAD_ACTIVITY_FEED,
        payload: response.data,
      });
    });
};
