import { useEffect, useState } from "react";
import { editRequest, getRequestsByUser } from "../../services/requestsService";
import { useNavigate } from "react-router-dom";

export const MyRequests = ({ currentUser }) => {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    currentUser.id &&
      getRequestsByUser(currentUser).then((myRequestsArray) => {
        setRequests(myRequestsArray);
      });
  }, [currentUser]);

  const handleCompleted = (request) => {
    const closedRequest = {
      id: request.id,
      userId: request.userId,
      dayOfWeekId: request.dayOfWeekId,
      timeOfDayStartId: request.timeOfDayStartId,
      timeOfDayEndId: request.timeOfDayEndId,
      completed: true,
      notes: request.notes,
    };

    editRequest(closedRequest).then(() => {
      getRequestsByUser(currentUser).then((requestsArray) => {
        setRequests(requestsArray);
      });
    });
  };

  const showRequest = (requestObj) => {
    return (
      <section
        key={requestObj.id}
        className="flex justify-between p-5 mx-8 my-5 border-4
      bg-green-100 bg-opacity-90 border-green-500 rounded-xl"
      >
        <div className="pt-1.5">
          <span>{requestObj.dayOfWeek.name}</span>
        </div>
        <div className="pt-2">
          {" "}
          <span className="">{requestObj.timeOfDayStart.timeOfDay} to</span>
          <span className=""> {requestObj.timeOfDayEnd.timeOfDay}</span>
        </div>
        <div className="">
          <button
            className="p-2 bg-red-400 border-2 border-red-500 rounded-2xl
            hover:bg-red-300 duration-150 delay-50"
            onClick={() => {
              handleCompleted(requestObj);
              navigate(`/myRequests/all`);
            }}
          >
            Delete
          </button>
        </div>
        <div className="">
          <button
            className="p-2 bg-green-400 border-2 border-green-500 rounded-2xl
            hover:bg-green-300 duration-150 delay-50"
            onClick={() => {
              navigate(`/MyRequests/${requestObj.id}`);
            }}
          >
            Edit Request
          </button>
        </div>
      </section>
    );
  };

  return (
    <article>
      {requests.map((requestObj) =>
        !requestObj.completed ? showRequest(requestObj) : ""
      )}
      <footer className="flex text-center justify-center">
        <button
          className="p-2 text-xl font-serif font-extrabold bg-yellow-700 
          shadow-xl border-black rounded-lg shadow-yellow-500 hover:bg-yellow-500 duration-100 delay-75"
          onClick={() => {
            navigate(`/makeNewRequest`);
          }}
        >
          Make New Request
        </button>
      </footer>
    </article>
  );
};
