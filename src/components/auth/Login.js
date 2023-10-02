import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userService";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "glass_user",
          JSON.stringify({
            id: user.id,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <div class="fixed flex justify-center content-around text-center h-screen w-screen bg-cover bg-[url('https://www.recycleannarbor.org/sites/default/files/2020-11/AdobeStock_231362035_0.jpeg')]">
      <section class="grid fixed w-3/4 h-2/5 top-1/4 content-center bg-green-100 border-black bg-opacity-70 border-4 rounded-2xl shadow-md">
        <form class="my-3 mx-5" onSubmit={handleLogin}>
          <h1 class="text-5xl m-3 pb-3">Welcome to Pass the Glass</h1>
          <h2 class="text-3xl m-2 p-1">Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                class="p-1 rounded-md shadow placeholder:italic border border-slate-400 focus:border-sky-500"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div class="my-4">
              <button
                class="outline-1 bg-green-600 transition-color hover:bg-green-400  duration-200 delay-50"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
        <section class="text-center font-bold text-blue-900 underline hover:no-underline duration-100 delay-50">
          <Link to="/register">Not a member yet?</Link>
        </section>
      </section>
    </div>
  );
};
