export const RequestsFilterBar = ({
  setRequestsByDay,
  daysOfWeek,
  setSearchTerm,
}) => {
  return (
    <div className="filter-bar">
      <select
        id="days"
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
        className="request-search"
      />
    </div>
  );
};
