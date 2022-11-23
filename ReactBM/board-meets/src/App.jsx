import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/mainLayout/mainLayout";
import { GamesList } from "./pages/gamesList/meetsList";
import { LogIn } from "./pages/logIn/logIn";
import { MeetsList } from "./pages/meetsList/meetsList";
import { UserPageLayout } from "./layouts/userPageLayout/userPageLayout.jsx";
import { PlayerPage } from "./pages/playerPage/playerPage";
import { OrganizationPage } from "./pages/organizationPage/organizationPage";
import { NotFoundPage } from "./pages/notFoundPage/notFoundPage";
import { CreateMeetPage } from "./pages/createMeetPage/createMeetPage";
import { Registration } from "./pages/registration/registration";


export const App = () => {

  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);
  
  const url = "http://25.43.153.92:5057/api/";

  const buttonHandler = (user,token) => {
      setUser(user);
      setToken(token);
  }
 
  return (
    <>
      <Routes>
        <Route path="/" exact element={<MainLayout user = {user}/>}>
          <Route path="/" element={<MeetsList userId = {user?.id} url = {url} role = {user?.role}/>}/>
          <Route path="/games" element={<GamesList/>}/>
          <Route path="/user/:userId" element={<UserPageLayout url = {url}/>}>
            <Route path="createMeet" element={<CreateMeetPage url ={url}/>}/>
            <Route path="changeMeet/:meetId" element={<MeetsList/>}/>
            <Route path="player" element={<PlayerPage url = {url} />}/>
            <Route path="organization" element={<OrganizationPage url = {url} />}/>
            <Route path="publisher" element={<MeetsList/>}/>
            <Route path="administrator" element={<MeetsList/>}/>
          </Route>
        </Route>
        <Route path="/logIn" element={<LogIn buttonHandler={buttonHandler} url = {url}/>}></Route>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  );
}

