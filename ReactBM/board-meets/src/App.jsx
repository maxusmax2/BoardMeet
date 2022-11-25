import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import Cookies from 'universal-cookie';

export const App = () => {
  
  const cookies = new Cookies();
  const [user,setUser] = useState(cookies.get('user')=="0"?parseInt(cookies.get('user')):cookies.get('user'));
  const [token,setToken] = useState(cookies.get('token')=="0"?parseInt(cookies.get('token')):cookies.get('token'));
  
  const url = "http://25.43.153.92:5057/api/";

  const buttonHandler = (user,token) => {
    cookies.set('user', user, { path: '/' });
    cookies.set('token', token, { path: '/' });
    console.log(cookies.get('user')); 
    setUser(cookies.get('user'));
    setToken(cookies.get('token'));
  }
  const exitHandler = () => {
    cookies.set('user', 0, { path: '/' });
    cookies.set('token', 0, { path: '/' });
    setUser(cookies.get('user'));
    setToken(cookies.get('token'));
    window.location.reload()
  }

  return (
    <>
      <Routes>
        <Route path="/" exact element={<MainLayout user = {user} exitHandler={exitHandler}/>}>
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
        <Route path="/registration" element={<Registration url={url} buttonHandler={buttonHandler}/>}></Route>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  );
}

