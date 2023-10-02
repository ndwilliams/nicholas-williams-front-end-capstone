import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = {
      ...user,
    };

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "glass_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.isStaff,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main className="fixed flex content-around justify-center text-center h-screen w-screen bg-cover bg-[url('https://www.recycleannarbor.org/sites/default/files/2020-11/AdobeStock_231362035_0.jpeg')]">
      <form
        className="grid fixed bg-green-100 bg-opacity-70 w-3/4 h-1/2 top-1/4 content-around rounded-xl border-black border-4 shadow-lg"
        onSubmit={handleRegister}
      >
        <h1 className="text-5xl my-2 -mb-2 p-1">Pass the Glass</h1>
        <h2 className="text-4xl my-3">Registration</h2>
        <fieldset class="-m-1">
          <input
            onChange={updateUser}
            type="text"
            id="fullName"
            className="register-input"
            placeholder="Enter your full name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="-m-1">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="register-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="-m-1">
          <div>
            <input
              onChange={updateUser}
              type="tel"
              id="phone-number"
              className="register-input"
              placeholder="Phone number"
              required
            />
          </div>
        </fieldset>
        <fieldset className="-m-1">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="address"
              class="w-1/2 border-4 bg-green-200 border-green-500 
              rounded-md px-3 py-1"
              placeholder="Enter your full address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <button
              className="outline-1 bg-green-600 transition-color hover:bg-green-400 duration-200 delay-50"
              type="submit"
            >
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
