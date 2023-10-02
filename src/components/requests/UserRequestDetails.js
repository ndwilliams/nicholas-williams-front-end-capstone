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
    <section
      key={request.id}
      className="mx-auto w-1/2 text-center font-sans text-lg content-center
    my-10 bg-blue-400 bg-opacity-80 rounded-3xl"
    >
      <div className="p-1">
        Day of Week: <span>{request?.dayOfWeek?.name}</span>
      </div>
      <div className="p-1">
        Time Slot:{" "}
        <span className="request-time-slot-info">
          {request?.timeOfDayStart?.timeOfDay} to
        </span>
        <span> {request?.timeOfDayEnd?.timeOfDay}</span>
      </div>
      {!request.notes ? (
        ""
      ) : (
        <div className="request-extra-notes">
          Notes: <span>{request.notes}</span>
        </div>
      )}

      <div className="p-3">
        <button
          className="bg-amber-500 border-spacing-1
           border-gray-400 text-white hover:bg-amber-400
            duration-150 delay-75"
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
