import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-400 bg-opacity-70">
      <ul className="flex content-between justify-around text-center py-4 mt-2 align-center">
        <li className="navbar-item">
          <Link to="/requests/viewAll">All Requests</Link>
        </li>
        <li className="navbar-item">
          <Link to="/MyRequests/all">My Requests</Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile/view">Profile</Link>
        </li>
        {localStorage.getItem("glass_user") ? (
          <li className="navbar-item">
            <Link
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
    </div>
  );
};
