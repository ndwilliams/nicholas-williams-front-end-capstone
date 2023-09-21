export const getAllRequests = () => {
  return fetch(
    `http://localhost:8088/requests?_expand=user&_expand=dayOfWeek`
  ).then((res) => res.json());
};

export const getRequestsByUser = (user) => {
  return fetch(
    `http://localhost:8088/requests?userId=${user.id}&_expand=dayOfWeek&_expand=timeOfDayStart&_expand=timeOfDayEnd`
  ).then((res) => res.json());
};

export const getRequestById = (requestId) => {
  return fetch(
    `http://localhost:8088/requests/${requestId}?_expand=dayOfWeek&_expand=timeOfDayStart&_expand=timeOfDayEnd&_expand=user`
  ).then((res) => res.json());
};

export const editRequest = (request) => {
  return fetch(`http://localhost:8088/requests/${request.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
};

export const postRequest = (request) => {
  return fetch(`http://localhost:8088/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
};
