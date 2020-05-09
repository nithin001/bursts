import React from "react";
import { useSelector } from "react-redux";
import { getNotificationsState } from "../../redux/selectors";
import Notification from "./Notification";

function Notifications() {
  const notificationState = useSelector(getNotificationsState);
  return (
    <div className="container mt-2">
      {notificationState.notifications.map((notification) => (
        <Notification notification={notification} key={notification.id} />
      ))}
    </div>
  );
}

export default Notifications;
