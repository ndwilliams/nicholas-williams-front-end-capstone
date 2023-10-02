import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequestById } from "../../services/requestsService";

export const RequestDetails = () => {
  const { requestId } = useParams();
  const [request, setRequest] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getRequestById(requestId).then((requestObj) => setRequest(requestObj));
  }, [requestId]);

  return (
    <section
      key={request.id}
      className="mx-auto w-1/2 text-center font-sans text-lg content-center
       my-10 bg-blue-400 bg-opacity-80 rounded-3xl"
    >
      <div className="p-1">{request?.dayOfWeek?.name}</div>
      <div className="p-1">
        {" "}
        <span>{request?.timeOfDayStart?.timeOfDay} to</span>
        <span> {request?.timeOfDayEnd?.timeOfDay}</span>
      </div>
      <div className="p-1">{request.user?.address}</div>
      <div className="p-1">{request.user?.phoneNumber}</div>
      {!request.notes ? (
        ""
      ) : (
        <div className="p-2">
          Notes:{" "}
          <span className="p-1 bg-slate-200 border-2 rounded-xl">
            {request.notes}
          </span>
        </div>
      )}
    </section>
  );
};
