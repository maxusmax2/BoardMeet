import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/mainLayout/mainLayout";
import { GamesList } from "./pages/gamesList/meetsList";
import { LogIn } from "./pages/logIn/logIn";
import { MeetsList } from "./pages/meetsList/meetsList";
import { UserPageLayout } from "./layouts/userPageLayout/userPageLayout.jsx";
import { PlayerPage } from "./pages/playerPage/playerPage";
import { OrganizationPage } from "./pages/organizationPage/organizationPage";
import { useData } from "./hooks/useData";
import { CreateMeetPage } from "./pages/createMeetPage/createMeetPage";

export const App = () => {
  const [auth,setAuth] = useState(false);
  const [user,setUser] = useState(null);
  const buttonHandler = (user) => {
      setAuth(true);
      setUser(user);

  }

  const url = "http://192.168.1.56:5057/api/User/4";
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout auth={auth} user = {user}/>}>
          <Route path="/meets" element={<MeetsList user = {user}/>}/>
          <Route path="/games" element={<GamesList/>}/>
          <Route path="/user/:userId" element={<UserPageLayout/>}>
            <Route path="createMeet" element={<CreateMeetPage/>}/>
            <Route path="changeMeet/:meetId" element={<MeetsList/>}/>
            <Route path="player" element={<PlayerPage/>}/>
            <Route path="organization" element={<OrganizationPage/>}/>
            <Route path="publisher" element={<MeetsList/>}/>
            <Route path="administrator" element={<MeetsList/>}/>
          </Route>
        </Route>
        <Route path="/logIn" element={<LogIn buttonHandler={buttonHandler}/>}></Route>
      </Routes>
    </>
  );
}

