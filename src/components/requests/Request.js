export const Request = ({ currentUser, request }) => {
  return (
    <section className="request">
      <div className="request-info">{request.dayOfWeek?.day}</div>
      <div className="request-info">{request.user.address}</div>
      <div className="btn-container">
        <button className="button-view-details">View Details</button>
      </div>
      <div className="btn-container">
        {currentUser.id === request.userId ? (
          <button className="button-completed">Completed?</button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};
