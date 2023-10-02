import { useEffect, useState } from "react";
import { editUser, getUserById } from "../../services/userService";
import { useNavigate } from "react-router-dom";

export const EditProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    currentUser.id &&
      getUserById(currentUser.id).then((userObj) => {
        setUser(userObj);
      });
  }, [currentUser]);

  const handleSave = (event) => {
    event.preventDefault();

    const updatedUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
    };

    editUser(updatedUser).then(() => {
      navigate(`/profile/view`);
    });
  };

  return (
    <form className="text-center p-4 w-2/3 mx-auto my-20 bg-indigo-400
     rounded-xl font-sans">
      <fieldset>
        <div className="m-2">
          <label htmlFor="name">Name: </label>
          <input
            name="fullName"
            value={user.fullName ? user.fullName : ""}
            type="text"
            placeholder="Full Name"
            className="text-center"
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.fullName = event.target.value;
              setUser(userCopy);
            }}
          ></input>
        </div>
      </fieldset>
      <fieldset>
        <div className="m-2">
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            value={user.email ? user.email : ""}
            type="email"
            placeholder="email"
            className="text-center"
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.email = event.target.value;
              setUser(userCopy);
            }}
          ></input>
        </div>
      </fieldset>
      <fieldset>
        <div className="m-2">
          <label htmlFor="address">Home Address: </label>
          <input
            name="address"
            value={user.address ? user.address : ""}
            type="text"
            className="w-full max-w-xs mx-2"
            placeholder="Home Address"
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.address = event.target.value;
              setUser(userCopy);
            }}
          ></input>
        </div>
      </fieldset>
      <fieldset>
        <div className="m-2">
          <label htmlFor="phone-number">Telephone Number: </label>
          <input
            name="phone-number"
            value={user.phoneNumber ? user.phoneNumber : ""}
            type="tel"
            className="text-center"
            placeholder="telephone number"
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.phoneNumber = event.target.value;
              setUser(userCopy);
            }}
          ></input>
        </div>
      </fieldset>
      <button
        className="bg-amber-500 border-spacing-1
           border-gray-400 text-white hover:bg-amber-400
            duration-150 delay-75"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </form>
  );
};
