import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dismissNotification } from "../../redux/actions";

import "./notification.scss";
function Notification({ notification }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(dismissNotification(notification.id));
    }, 10000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="row justify-content-center">
      <div className="col-10 clearfix">
        <div className="shadow container notification w-100 rounded bg-light mt-2 p-3 w-100 text-white">
          <span>{notification.message}</span>
        </div>
      </div>
    </div>
  );
}

export default Notification;
