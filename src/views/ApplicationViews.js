import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/navbar/NavBar";
import { Welcome } from "../components/welcome/Welcome";
import { RequestList } from "../components/requests/RequestList";
import { Profile } from "../components/Profile";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localGlassUser = localStorage.getItem("glass_user");
    const glassUserObject = JSON.parse(localGlassUser);

    setCurrentUser(glassUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route
          path="requests"
          element={<RequestList currentUser={currentUser} />}
        />
        <Route path="myrequests" element={<>My Requests</>} />
        <Route path="profile" element={<Profile currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};
