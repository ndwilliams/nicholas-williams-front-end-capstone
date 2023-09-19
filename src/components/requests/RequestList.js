import { useEffect, useState } from "react";
import { getAllRequests } from "../../services/requestsService";
import { Request } from "./Request";
import { getAllDays } from "../../services/daysServices";
import { RequestsFilterBar } from "./RequestsFilterBar";

export const RequestList = ({ currentUser }) => {
  const [allRequests, setAllRequests] = useState([]);
  const [requestsByDay, setRequestsByDay] = useState(0);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="requests-container">
      <h2>All Requests</h2>
      <RequestsFilterBar
        setRequestsByDay={setRequestsByDay}
        daysOfWeek={daysOfWeek}
        setSearchTerm={setSearchTerm}
      />
      <article className="requests">
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
    </div>
  );
};
