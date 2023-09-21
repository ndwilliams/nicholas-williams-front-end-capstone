import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequestById } from "../../services/requestsService";

export const UserRequestDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState({});

  useEffect(() => {
    getRequestById(requestId).then((requestObj) => setRequest(requestObj));
  }, [requestId]);

  return (
    <section key={request.id} className="request-container">
      <div className="request-info">
        Day of Week: <span>{request?.dayOfWeek?.name}</span>
      </div>
      <div className="request-time-slot-container">
        Time Slot:{" "}
        <span className="request-time-slot-info">
          {request?.timeOfDayStart?.timeOfDay} to
        </span>
        <span className="request-time-slot-info">
          {" "}
          {request?.timeOfDayEnd?.timeOfDay}
        </span>
      </div>
      <div className="request-extra-notes">
        Notes: <span>{request.notes}</span>
      </div>
      <div className="btn-container edit-request">
        <button
          className="btn-edit-request"
          onClick={() => {
            navigate(`/MyRequests/${request.id}/edit`);
          }}
        >
          Edit Request
        </button>
      </div>
    </section>
  );
};
