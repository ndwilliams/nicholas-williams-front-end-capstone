export const getAllDays = () => {
  return fetch(`http://localhost:8088/dayOfWeeks`).then((res) => res.json());
};
