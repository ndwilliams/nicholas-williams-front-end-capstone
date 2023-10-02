export const RequestsFilterBar = ({
  setRequestsByDay,
  daysOfWeek,
  setSearchTerm,
}) => {
  return (
    <div className="flex justify-between mx-20 my-4">
      <select
        id="days"
        className="text-center text-xl w-48 border-2 border-red-400 rounded-xl"
        onChange={(event) => {
          setRequestsByDay(event.target.value);
        }}
      >
        <option value={0}>Filter By Day</option>
        {daysOfWeek.map((dayObj) => {
          return (
            <option key={dayObj.id} value={dayObj.id}>
              {dayObj.name}
            </option>
          );
        })}
      </select>
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Requests"
        className="h-10 w-56 p-3 text-xl text-center rounded-md placeholder:text-center border-gray-600 border-2 bg-green-100"
      />
    </div>
  );
};
