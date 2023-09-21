import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../services/userService";

export const ViewProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    currentUser.id &&
      getUserById(currentUser.id).then((userObj) => setUser(userObj));
  }, [currentUser]);

  return (
    <section className="profile-container">
      <div className="profile-info-name">Name: {user.fullName}</div>
      <div className="profile-info-email">Email: {user.email}</div>
      <div className="profile-info-address">Address: {user.address}</div>
      <div className="profile-info-phone">Phone Number: {user.phoneNumber}</div>
      <button
        className="btn-edit-profile"
        onClick={() => {
          navigate("../edit");
        }}
      >
        Edit
      </button>
    </section>
  );
};
