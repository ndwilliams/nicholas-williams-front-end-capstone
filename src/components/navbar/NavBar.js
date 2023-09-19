import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/requests">All Requests</Link>
      </li>
      <li className="navbar-item">
        <Link to="/myrequests">My Requests</Link>
      </li>
      <li className="navbar-item">
        <Link to="/profile">Profile</Link>
      </li>
      {localStorage.getItem("glass_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("glass_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
