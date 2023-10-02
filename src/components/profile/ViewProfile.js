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
    <section
      className="mx-auto p-4 m-20 w-1/2 text-center font-sans
     text-lg content-center bg-indigo-400 rounded-xl"
    >
      <div className="m-1">{user.fullName}</div>
      <div className="m-1">Email: {user.email}</div>
      <div className="m-1">Address: {user.address}</div>
      <div className="m-1">Phone Number: {user.phoneNumber}</div>
      <button
        className="bg-emerald-500 m-2 text-white
         hover:bg-emerald-300 duration-150 delay-75"
        onClick={() => {
          navigate("../edit");
        }}
      >
        Edit Profile
      </button>
    </section>
  );
};
