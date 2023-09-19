export const getAllRequests = () => {
  return fetch(
    `http://localhost:8088/requests?_expand=user&_expand=dayOfWeek`
  ).then((res) => res.json());
};

// export const getRequestsByDay = (dayOfWeekId) => {
//   return fetch(`http://localhost:8088/requests?dayOfWeek=${dayOfWeekId}&_expand=dayOfWeek
//     `).then((res) => res.json());
// };
