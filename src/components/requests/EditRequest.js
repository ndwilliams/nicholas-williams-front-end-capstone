import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editRequest, getRequestById } from "../../services/requestsService";
import { getAllDays } from "../../services/daysServices";

export const EditRequest = () => {
  const [request, setRequest] = useState({});
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  const { requestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRequestById(requestId).then((requestObj) => setRequest(requestObj));
  }, [requestId]);

  useEffect(() => {
    getAllDays().then((daysArray) => setDaysOfWeek(daysArray));
  }, []);

  //   const handleSave = (event) => {
  //     event.preventDefault();

  //     const updatedRequest = {
  //       id: request.id,
  //       userId: request.userId,
  //       timeOfDayStartId: request.timeOfDayStartId,
  //       timeOfDayEndId: request.timeOfDayEndId,
  //       completed: request.completed,
  //       dayOfWeek: {
  //         id: request.dayOfWeek.id,
  //         name: request?.dayOfWeek.name,
  //       },
  //     };

  //     editRequest(updatedRequest).then(() => {
  //       navigate(`/myRequests/${request.id}`);
  //     });
  //   };

  return (
    <form className="profile-form">
      <fieldset className="form-group">
        <label>Pickup Day:</label>
        <select
          name="dayOfWeek.name"
          value={request.dayOfWeek?.name}
          onChange={(event) => {
            const requestCopy = { ...request };
            requestCopy.dayOfWeek.name = event.target.value;
            setRequest(requestCopy);
          }}
        >
          <option value={0}>Please select a day</option>
          {daysOfWeek.map((dayObject) => {
            return (
              <option key={dayObject.id} value={dayObject.name}>
                {dayObject.name}
              </option>
            );
          })}
        </select>
      </fieldset>
    </form>
  );
};
