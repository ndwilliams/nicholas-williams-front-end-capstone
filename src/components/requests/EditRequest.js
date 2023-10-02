import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editRequest, getRequestById } from "../../services/requestsService";
import { getAllDays } from "../../services/daysServices";
import { getTimeOfDayEnd, getTimeOfDayStart } from "../../services/timeOfDay";

export const EditRequest = () => {
  const [request, setRequest] = useState({});
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [timeOfDayStarts, setTimeOfDayStarts] = useState([]);
  const [timeOfDayEnds, setTimeOfDayEnds] = useState([]);

  const { requestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRequestById(requestId).then((requestObj) => setRequest(requestObj));
  }, [requestId]);

  useEffect(() => {
    getAllDays().then((daysArray) => setDaysOfWeek(daysArray));
    getTimeOfDayStart().then((timesArray) => setTimeOfDayStarts(timesArray));
    getTimeOfDayEnd().then((timesArray) => setTimeOfDayEnds(timesArray));
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    const updatedRequest = {
      id: request.id,
      userId: request.userId,
      timeOfDayStartId: request.timeOfDayStartId,
      timeOfDayEndId: request.timeOfDayEndId,
      completed: request.completed,
      dayOfWeekId: request.dayOfWeekId,
      notes: request.notes,
    };

    editRequest(updatedRequest).then(() => {
      navigate(`/myRequests/${request.id}`);
    });
  };

  return (
    <form
      className="text-center p-4 w-2/3 mx-auto my-20
     bg-sky-500 rounded-xl font-sans bg-opacity-75"
    >
      <fieldset className="m-2">
        <label>Pickup Day:</label>
        <select
          name="dayOfWeekId"
          value={request.dayOfWeekId}
          className="text-center"
          onChange={(event) => {
            const requestCopy = { ...request };
            requestCopy.dayOfWeekId = event.target.value;
            setRequest(requestCopy);
          }}
        >
          <option value={0}>Please select a day</option>
          {daysOfWeek.map((dayObject) => {
            return (
              <option key={dayObject.id} value={dayObject.id}>
                {dayObject.name}
              </option>
            );
          })}
        </select>
      </fieldset>

      <fieldset className="m-2">
        <label>Pickup Start Time: </label>
        <select
          name="timeOfDayStart.timeOfDay"
          value={request.timeOfDayStartId}
          className="text-center"
          onChange={(event) => {
            const requestCopy = { ...request };
            requestCopy.timeOfDayStartId = event.target.value;
            setRequest(requestCopy);
          }}
        >
          <option value={0}>Please select a pickup start time </option>
          {timeOfDayStarts.map((timeObj) => {
            return (
              <option key={timeObj.id} value={timeObj.id}>
                {timeObj.timeOfDay}
              </option>
            );
          })}
        </select>
      </fieldset>

      <fieldset className="m-2">
        <label>Pickup End Time: </label>
        <select
          name="timeOfDayEndId"
          value={request.timeOfDayEndId}
          className="text-center"
          onChange={(event) => {
            const requestCopy = { ...request };
            requestCopy.timeOfDayEndId = event.target.value;
            setRequest(requestCopy);
          }}
        >
          <option value={0}>Please select a pickup end time </option>
          {timeOfDayEnds.map((timeObj) => {
            return (
              <option key={timeObj.id} value={timeObj.id}>
                {timeObj.timeOfDay}
              </option>
            );
          })}
        </select>
      </fieldset>
      <fieldset>
        <div className="m-2">
          <label htmlFor="additional-notes">Additional Notes </label>
          <input
            name="request.notes"
            value={request.notes ? request.notes : ""}
            type="text"
            className="placeholder:italic placeholder:text-slate-400 block
            bg-white w-full border
            border-slate-300 rounded-md py-2 pl-9 pr-3 
            shadow-sm focus:outline-none focus:border-sky-500
             focus:ring-sky-500 focus:ring-1 sm:text-sm my-5"
            placeholder="Additional Notes"
            onChange={(event) => {
              const requestCopy = { ...request };
              requestCopy.notes = event.target.value;
              setRequest(requestCopy);
            }}
          />
        </div>
      </fieldset>
      <button
        className="bg-cyan-400 border-spacing-1
           border-gray-400 text-white hover:bg-cyan-500
            duration-150 delay-75 active:bg-cyan-600 focus:ring
             focus:ring-cyan-200 m-3"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </form>
  );
};
