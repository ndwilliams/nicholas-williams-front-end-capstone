import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/navbar/NavBar";
import { Welcome } from "../components/welcome/Welcome";
import { RequestList } from "../components/requests/RequestList";
import { EditProfile } from "../components/profile/EditProfile";
import { MyRequests } from "../components/requests/MyRequests";
import { EditRequest } from "../components/requests/EditRequest";
import { UserRequestDetails } from "../components/requests/UserRequestDetails";
import { ViewProfile } from "../components/profile/ViewProfile";
import { NewRequest } from "../components/requests/NewRequest";
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
        <Route path="requests">
          <Route
            path="viewAll"
            element={<RequestList currentUser={currentUser} />}
          />
          <Route path=":requestId" element={<RequestDetails />} />
        </Route>

        <Route
          path="makeNewRequest"
          element={<NewRequest currentUser={currentUser} />}
        />
        <Route path="MyRequests">
          <Route
            path="all"
            element={<MyRequests currentUser={currentUser} />}
          />
          <Route path=":requestId" element={<UserRequestDetails />} />
          <Route path=":requestId/edit" element={<EditRequest />} />
        </Route>
        <Route path="profile">
          <Route
            path="view"
            element={<ViewProfile currentUser={currentUser} />}
          />
          <Route
            path="edit"
            element={<EditProfile currentUser={currentUser} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
