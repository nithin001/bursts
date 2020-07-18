import {
  ADD_NOTIFICATION,
  ADD_TO_TASK,
  ADD_TO_WORKS,
  DISMISS_NOTIFICATION,
  EDIT_TASK,
  EDIT_WORK, LOAD_ACTIVE_DATES,
  LOAD_ACTIVITY_FEED,
  LOAD_BURSTS,
  LOAD_STATS,
  LOAD_TASKS,
  LOAD_WORKS,
  REMOVE_FROM_WORKS,
  REMOVE_TASK,
  TOGGLE_EDIT_MODE,
  UPDATE_BURST,
  UPDATE_CURRENT_BURST,
  UPDATE_CURRENT_USER, UPDATE_PLAYER_BURST,
} from './actionTypes';

import { AxiosInstance } from '../util/api';

export const toggleEditMode = id => ({
  type: TOGGLE_EDIT_MODE,
  payload: id,
});

export const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const dismissNotification = notificationId => ({
  type: DISMISS_NOTIFICATION,
  payload: notificationId,
});

export const loadCurrentBurst = () => (dispatch) => {
  AxiosInstance()
    .get('/api/burst.json')
    .then((response) => {
      dispatch({
        type: UPDATE_CURRENT_BURST,
        payload: { id: response.data.id },
      });
    });
};

export const loadCurrentUser = () => (dispatch) => {
  AxiosInstance()
    .get('/api/user.json')
    .then((response) => {
      dispatch({
        type: UPDATE_CURRENT_USER,
        payload: response.data,
      });
    });
};

export const loadStats = () => (dispatch) => {
  AxiosInstance()
    .get('/api/stats.json')
    .then((response) => {
      dispatch({
        type: LOAD_STATS,
        payload: response.data,
      });
    });
};

export const loadPlayerBurst = id => (dispatch) => {
  AxiosInstance()
    .get(`/api/bursts/${id}.json`)
    .then((response) => {
      dispatch({
        type: UPDATE_PLAYER_BURST,
        payload: response.data,
      });
    });
};

export const loadBurst = id => (dispatch) => {
  AxiosInstance()
    .get(`/api/bursts/${id}.json`)
    .then((response) => {
      dispatch({
        type: UPDATE_BURST,
        payload: response.data,
      });
    });
};

export const loadBursts = date => (dispatch) => {
  AxiosInstance()
    .get(`/api/bursts.json?date=${date}`)
    .then((response) => {
      dispatch({
        type: LOAD_BURSTS,
        payload: response.data,
        clearOnLoad: true,
      });
    });
};

export const loadTasks = (page, clearOnLoad, onlyActive) => (dispatch) => {
  AxiosInstance()
    .get(`/api/tasks.json?page=${page}&only_active=${onlyActive}`)
    .then((response) => {
      dispatch({
        type: LOAD_TASKS,
        payload: response.data,
        clearOnLoad,
      });
    });
};

export const createBurst = () => (dispatch) => {
  AxiosInstance()
    .post('/api/bursts.json')
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: UPDATE_CURRENT_BURST,
          payload: { id: response.data.id },
        });
      }
    });
};

export const startBurst = id => (dispatch) => {
  AxiosInstance()
    .patch(`/api/bursts/${id}/start.json`)
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: UPDATE_BURST,
          payload: response.data,
        });
      }
    });
};

export const completeBurst = id => (dispatch) => {
  AxiosInstance()
    .patch(`/api/bursts/${id}/complete.json`)
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: UPDATE_BURST,
          payload: response.data,
        });
      }
    });
};
export const updateBurstNotified = id => () => {
  AxiosInstance().patch(`/api/bursts/${id}/notified.json`);
};

export const deleteTask = taskId => (dispatch) => {
  AxiosInstance()
    .delete(`/api/tasks/${taskId}.json`)
    .then((response) => {
      if (response.status === 204) {
        dispatch({
          type: REMOVE_TASK,
          payload: taskId,
        });
      }
    });
};

export const editTask = (taskId, taskDescription) => (dispatch) => {
  AxiosInstance()
    .patch(`/api/tasks/${taskId}.json`, {
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

export const completeTask = taskId => (dispatch) => {
  AxiosInstance()
    .patch(`/api/tasks/${taskId}/complete.json`)
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: EDIT_TASK,
          payload: response.data,
        });
      }
    });
};

export const undoCompleteTask = taskId => (dispatch) => {
  AxiosInstance()
    .patch(`/api/tasks/${taskId}/undo_complete.json`)
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: EDIT_TASK,
          payload: response.data,
        });
      }
    });
};

export const markWorked = (workId, completedTaskId) => (dispatch) => {
  AxiosInstance()
    .patch(`/api/works/${workId}/worked.json`, {
      complete_task: completedTaskId,
    })
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: EDIT_WORK,
          payload: response.data,
          workId,
        });
      }
    });
};

export const undoMarkWorked = workId => (dispatch) => {
  AxiosInstance()
    .patch(`/api/works/${workId}/undo_worked.json`)
    .then((response) => {
      if (response.data.id) {
        dispatch({
          type: EDIT_WORK,
          payload: response.data,
          workId,
        });
      }
    });
};

export const loadActivityFeed = (dates, page, clearOnLoad) => (dispatch) => {
  const startDate = dates.startDate
    ? `&from_date=${dates.startDate.format('YYYY-MM-DD')}`
    : '';
  const endDate = dates.endDate
    ? `&end_date=${dates.endDate.format('YYYY-MM-DD')}`
    : '';
  AxiosInstance()
    .get(`/api/feed.json?page=${page}${startDate}${endDate}`)
    .then((response) => {
      dispatch({
        type: LOAD_ACTIVITY_FEED,
        payload: response.data,
        clearOnLoad,
      });
    });
};

export const loadWorks = burstId => (dispatch) => {
  AxiosInstance()
    .get(`/api/works.json?burst_id=${burstId}`)
    .then((response) => {
      dispatch({
        type: LOAD_WORKS,
        payload: response.data,
      });
    });
};

export const createWork = (burstId, taskId) => (dispatch) => {
  AxiosInstance()
    .post('/api/works.json', {
      burst_id: burstId,
      task_id: taskId,
    })
    .then((response) => {
      dispatch({
        type: ADD_TO_WORKS,
        payload: response.data,
      });
    });
};

export const deleteWork = workId => (dispatch) => {
  AxiosInstance()
    .delete(`/api/works/${workId}.json`)
    .then((response) => {
      if (response.status === 204) {
        dispatch({
          type: REMOVE_FROM_WORKS,
          payload: workId,
        });
      }
    });
};

export const createTask = (taskDescription, burstId, onCreate) => (dispatch) => {
  AxiosInstance()
    .post('/api/tasks.json', {
      description: taskDescription,
    })
    .then((response) => {
      if (response.data.id) {
        console.log(burstId);
        if (burstId) {
          dispatch(createWork(burstId, response.data.id));
        } else if (onCreate) {
          onCreate(response.data.id);
        }
        dispatch({
          type: ADD_TO_TASK,
          payload: response.data,
        });
      }
    });
};

export const loadActiveDates = () => (dispatch) => {
  AxiosInstance()
    .get('/api/bursts/active_dates')
    .then((response) => {
      dispatch({
        type: LOAD_ACTIVE_DATES,
        payload: response.data,
      });
    });
};

export const createPostDatedSession = (taskIds, started_at, completed_at, date) => AxiosInstance()
  .post('/api/bursts/create_post_dated_burst.json', {
    task_ids: taskIds,
    started_at,
    completed_at,
    date,
  });

export const deleteBurst = (burstId) => {
  AxiosInstance()
    .delete(`/api/bursts/${burstId}.json`);
};
