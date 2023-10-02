import { useEffect, useState } from "react";
import { getAllRequests } from "../../services/requestsService";
import { Request } from "./Request";
import { getAllDays } from "../../services/daysServices";
import { RequestsFilterBar } from "./RequestsFilterBar";
import { useNavigate } from "react-router-dom";

export const RequestList = ({ currentUser }) => {
  const [allRequests, setAllRequests] = useState([]);
  const [requestsByDay, setRequestsByDay] = useState(0);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllDays().then((daysArray) => {
      setDaysOfWeek(daysArray);
    });
    getAndSetRequests();
  }, []);

  const getAndSetRequests = () => {
    getAllRequests().then((requestsArray) => {
      setAllRequests(requestsArray);
    });
  };

  useEffect(() => {
    if (requestsByDay > 0) {
      const dayRequests = allRequests.filter(
        (requestObj) => requestObj.dayOfWeekId === parseInt(requestsByDay)
      );
      setFilteredRequests(dayRequests);
    } else {
      setFilteredRequests(allRequests);
    }
  }, [allRequests, requestsByDay]);

  useEffect(() => {
    const foundRequests = allRequests.filter((request) =>
      request.user.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(foundRequests);
  }, [allRequests, searchTerm]);

  return (
    <div className="py-3">
      <h2 className="bg-zinc-400 bg-opacity-80 m-auto max-w-min rounded-md text-center text-3xl font-sans underline font-extrabold">
        All Requests
      </h2>
      <RequestsFilterBar
        setRequestsByDay={setRequestsByDay}
        daysOfWeek={daysOfWeek}
        setSearchTerm={setSearchTerm}
      />
      <article className="">
        {filteredRequests.map((requestObj) => {
          return (
            <Request
              request={requestObj}
              key={requestObj.id}
              getAndSetRequests={getAndSetRequests}
              currentUser={currentUser}
            />
          );
        })}
      </article>
      <footer className="flex text-center justify-center">
        <button
          className="my-5 text-xl font-serif font-extrabold bg-yellow-700 
          shadow-xl border-black rounded-lg shadow-yellow-500 hover:bg-yellow-500 duration-100 delay-75"
          onClick={() => {
            navigate(`/makeNewRequest`);
          }}
        >
          Make New Request
        </button>
      </footer>
    </div>
  );
};
