export const getTimeOfDayStart = () => {
  return fetch(`http://localhost:8088/timeOfDayStarts`).then((res) =>
    res.json()
  );
};

export const getTimeOfDayEnd = () => {
  return fetch(`http://localhost:8088/timeOfDayEnds`).then((res) => res.json());
};
