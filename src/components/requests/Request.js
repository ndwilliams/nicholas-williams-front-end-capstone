import { useNavigate } from "react-router-dom";

export const Request = ({ request }) => {
  const navigate = useNavigate();

  const showRequest = (request) => {
    return (
      <section
        className="flex justify-between p-5 mx-8 my-5 border-4
       bg-green-100 bg-opacity-90 border-green-500 rounded-xl "
      >
        <div className="pt-1.5">{request.dayOfWeek?.name}</div>
        <div className="pt-2">{request.user.address}</div>
        <div className="">
          <button
            className="p-2 bg-green-400 border-2 border-green-500 rounded-2xl
             hover:bg-green-300 duration-150 delay-50"
            onClick={() => {
              navigate(`/requests/${request.id}`);
            }}
          >
            View Details
          </button>
        </div>
      </section>
    );
  };

  return <div>{!request.completed ? showRequest(request) : ""}</div>;
};
