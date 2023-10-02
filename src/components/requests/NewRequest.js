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
    <form
      className="mx-auto w-2/3 text-center font-sans text-lg
       content-center my-10 bg-blue-400 bg-opacity-80 rounded-3xl"
    >
      <h2 className="p-2 font-sans text-2xl italic ">Add Pickup Request </h2>
      <fieldset>
        <div className="p-2">
          <label htmlFor="pickupDay">Pickup Day </label>
          <select
            name="dayOfWeekId"
            onChange={handleInputChange}
            className="rounded-md px-2 py-1"
            value={newRequest.dayOfWeekId}
            required
          >
            <option value={0} className="">
              Please select a day{" "}
            </option>
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
        <div className="p-2">
          <label htmlFor="pickUpStartTime">Pickup Window Start </label>
          <select
            name="timeOfDayStartId"
            onChange={handleInputChange}
            className="rounded-md px-2 py-1"
            value={newRequest.timeOfDayStartId}
          >
            <option value={0}>Please select a time </option>
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
        <div className="p-2">
          <label htmlFor="pickUpEnd">Pickup Window End</label>
          <select
            name="timeOfDayEndId"
            onChange={handleInputChange}
            className="rounded-md px-2 py-1"
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
        <div className="p-2"></div>
        <label htmlFor="notes">Additional Notes</label>
        <input
          name="notes"
          type="text"
          value={newRequest.notes}
          className="placeholder:italic placeholder:text-slate-400 block
           bg-white w-full border
           border-slate-300 rounded-md py-2 pl-9 pr-3 
           shadow-sm focus:outline-none focus:border-sky-500
            focus:ring-sky-500 focus:ring-1 sm:text-sm my-5"
          placeholder="Additional Notes"
          onChange={handleInputChange}
        ></input>
      </fieldset>
      <button
        className="bg-cyan-400 border-spacing-1
           border-gray-400 text-white hover:bg-cyan-500
            duration-150 delay-75 active:bg-cyan-600 focus:ring
             focus:ring-cyan-200 m-3"
        onClick={handleSave}
      >
        Make New Request
      </button>
    </form>
  );
};
