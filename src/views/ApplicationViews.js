import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/navbar/NavBar";
import { Welcome } from "../components/welcome/Welcome";
import { RequestList } from "../components/requests/RequestList";
import { Profile } from "../components/Profile";
import { MyRequests } from "../components/requests/MyRequests";
import { EditRequest } from "../components/requests/EditRequest";
import { RequestDetails } from "../components/requests/RequestDetails";

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
          path="AllRequests"
          element={<RequestList currentUser={currentUser} />}
        />
        <Route path="MyRequests">
          <Route
            path="all"
            element={<MyRequests currentUser={currentUser} />}
          />
          <Route path=":requestId" element={<RequestDetails />} />
          <Route path=":requestId/edit" element={<EditRequest />} />
        </Route>
        <Route path="profile" element={<Profile currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};
