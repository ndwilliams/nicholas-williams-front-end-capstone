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
    <form className="profile-form">
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            name="fullName"
            value={user.fullName ? user.fullName : ""}
            type="text"
            className="form-control"
            placeholder="Full Name"
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.fullName = event.target.value;
              setUser(userCopy);
            }}
          ></input>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            value={user.email ? user.email : ""}
            type="email"
            className="form-control"
            placeholder="email"
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.email = event.target.value;
              setUser(userCopy);
            }}
          ></input>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="address">Home Address:</label>
          <input
            name="address"
            value={user.address ? user.address : ""}
            type="text"
            className="form-control"
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
        <div className="form-group">
          <label htmlFor="phone-number">Telephone Number:</label>
          <input
            name="phone-number"
            value={user.phoneNumber ? user.phoneNumber : ""}
            type="tel"
            className="form-control"
            placeholder="telephone number"
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.phoneNumber = event.target.value;
              setUser(userCopy);
            }}
          ></input>
        </div>
      </fieldset>
      <button className="btn" onClick={handleSave}>
        Save Changes
      </button>
    </form>
  );
};
