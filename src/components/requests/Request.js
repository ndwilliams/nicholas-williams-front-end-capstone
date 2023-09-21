import { useNavigate } from "react-router-dom";

export const Request = ({ request }) => {
  const navigate = useNavigate();
  return (
    <section className="request">
      <div className="request-info">{request.dayOfWeek?.name}</div>
      <div className="request-info">{request.user.address}</div>
      <div className="btn-container">
        <button
          className="btn-view-details"
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
