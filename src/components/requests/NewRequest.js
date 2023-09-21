import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDays } from "../../services/daysServices";
import { getTimeOfDayEnd, getTimeOfDayStart } from "../../services/timeOfDay";
import { postRequest } from "../../services/requestsService";

export const NewRequest = ({ currentUser }) => {
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [timeOfDayStarts, setTimeOfDayStarts] = useState([]);
  const [timeOfDayEnds, setTimeOfDayEnds] = useState([]);
  const [newRequest, setNewRequest] = useState({
    userId: currentUser.id,
    dayOfWeekId: 0,
    timeOfDayStartId: 0,
    timeOfDayEndId: 0,
    completed: false,
    notes: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAllDays().then((daysArray) => {
      setDaysOfWeek(daysArray);
    });

    getTimeOfDayStart().then((timesArray) => {
      setTimeOfDayStarts(timesArray);
    });

    getTimeOfDayEnd().then((timesArray) => {
      setTimeOfDayEnds(timesArray);
    });
  }, []);

  const handleInputChange = (event) => {
    const requestCopy = { ...newRequest };
    requestCopy[event.target.name] = event.target.value;
    setNewRequest(requestCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const newPickupRequest = {
      userId: currentUser.id,
      dayOfWeekId: parseInt(newRequest.dayOfWeekId),
      timeOfDayStartId: parseInt(newRequest.timeOfDayStartId),
      timeOfDayEndId: parseInt(newRequest.timeOfDayEndId),
      completed: false,
      notes: newRequest.notes,
    };
    if (
      currentUser.id &&
      newRequest.dayOfWeekId > 0 &&
      newRequest.timeOfDayStartId > 0 &&
      newRequest.timeOfDayEndId > 0 &&
      parseInt(newRequest.timeOfDayEndId) >=
        parseInt(newRequest.timeOfDayStartId)
    ) {
      postRequest(newPickupRequest).then(() => {
        navigate(`/MyRequests/all`);
      });
    } else {
      window.alert(`Please select a day and valid times`);
    }
  };

  return (
    <form className="request-form">
      <h2 className="request-form-title">Add Pickup Request</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="pickupDay">Pickup Day</label>
          <select
            name="dayOfWeekId"
            onChange={handleInputChange}
            value={newRequest.dayOfWeekId}
            required
          >
            <option value={0}>Please select a day</option>
            {daysOfWeek.map((dayObj) => {
              return (
                <option key={dayObj.id} value={dayObj.id}>
                  {dayObj.name}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="pickUpStartTime">Pickup Window Start</label>
          <select
            name="timeOfDayStartId"
            onChange={handleInputChange}
            value={newRequest.timeOfDayStartId}
          >
            <option value={0}>Please select a time</option>
            {timeOfDayStarts.map((timeObj) => {
              return (
                <option key={timeObj.id} value={timeObj.id}>
                  {timeObj.timeOfDay}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="pickUpEnd">Pickup Window End</label>
          <select
            name="timeOfDayEndId"
            onChange={handleInputChange}
            value={newRequest.timeOfDayEndId}
          >
            <option value={0}>Please select a time</option>
            {timeOfDayEnds.map((timeObj) => {
              return (
                <option key={timeObj.id} value={timeObj.id}>
                  {timeObj.timeOfDay}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group"></div>
        <label htmlFor="notes">Additional Notes</label>
        <input
          name="notes"
          type="text"
          value={newRequest.notes}
          className="form-control"
          placeholder="Additional Notes"
          onChange={handleInputChange}
        ></input>
      </fieldset>
      <button className="btn" onClick={handleSave}>
        Make New Request
      </button>
    </form>
  );
};
