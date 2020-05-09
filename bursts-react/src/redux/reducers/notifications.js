import { ADD_NOTIFICATION, DISMISS_NOTIFICATION } from "../actionTypes";

const initialState = {
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      return {
        notifications: [...state.notifications, action.payload],
      };
    }

    case DISMISS_NOTIFICATION: {
      const notifications = [...state.notifications].filter(
        (notificationObj) => notificationObj.id !== action.payload
      );
      return {
        notifications,
      };
    }

    default:
      return state;
  }
}
