import { useEffect, useState } from "react";
import { getRequestsByUser } from "../../services/requestsService";
import { useNavigate } from "react-router-dom";

export const MyRequests = ({ currentUser }) => {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getRequestsByUser(currentUser).then((myRequestsArray) => {
      setRequests(myRequestsArray);
    });
  }, [currentUser]);

  return (
    <article className="requests">
      {requests.map((requestObj) => {
        return (
          <section key={requestObj.id} className="request-container">
            <div className="request-info">
              Day of Week: <span>{requestObj.dayOfWeek.name}</span>
            </div>
            <div className="request-time-slot-container">
              Time Slot:{" "}
              <span className="request-time-slot-info">
                {requestObj.timeOfDayStart.timeOfDay} to
              </span>
              <span className="request-time-slot-info">
                {" "}
                {requestObj.timeOfDayEnd.timeOfDay}
              </span>
            </div>
            <div className="btn-container">
              <button className="btn-completed">Completed?</button>
            </div>
            <div className="btn-container view-request">
              <button
                className="btn-view-request"
                onClick={() => {
                  navigate(`/MyRequests/${requestObj.id}`);
                }}
              >
                View Request
              </button>
            </div>
          </section>
        );
      })}
    </article>
  );
};
