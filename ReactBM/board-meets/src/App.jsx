import { Route, Routes,  Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/mainLayout/mainLayout";
import { LogIn } from "./pages/logIn/logIn";
import { MeetsListPage } from "./pages/meetsListPage/meetsListPage";
import { UserPageLayout } from "./layouts/userPageLayout/userPageLayout.jsx";
import { PlayerPage } from "./pages/playerPage/playerPage";
import { OrganizationPage } from "./pages/organizationPage/organizationPage";
import { NotFoundPage } from "./pages/notFoundPage/notFoundPage";
import { CreateMeetPage } from "./pages/createMeetPage/createMeetPage";
import { Registration } from "./pages/registration/registration";
import Cookies from 'universal-cookie';
import { ChangeMeetPage } from "./pages/changeMeetPage/changeMeetPage";
import { GamesList } from "./pages/gamesList/gamesList";
import { GamePage } from "./pages/gamePage/gamePage";
import { PublisherPage } from "./pages/publisherPage/publisherPage";
import { CreateGamePage } from "./pages/createGamePage/createGamePage";
import { ChangeGamePage } from "./pages/changGamePage/changeGamePage";
import { useState } from "react";
import { getUser } from "./helpers/getUser";

export const App = () => {
  const cookies = new Cookies();
  const [user,setUser] = useState();

  const url = "http://25.43.153.92:5057/api/";

  const buttonHandler = (user,token) => {
    cookies.set('user', user, { path: '/' });
    cookies.set('token', token, { path: '/' });
    setUser(getUser());
  }
  const exitHandler = () => {
    cookies.set('user', 0, { path: '/' });
    cookies.set('token', 0, { path: '/' });
    setUser(getUser());
  }

  return (
    <>
      <Routes>
        <Route path="/" exact element={<MainLayout exitHandler={exitHandler}/>}>
          <Route path="/" element={<MeetsListPage url = {url} />}/>
          <Route path="/games" element={<GamesList url={url}/>}/>
          <Route path="/search/:gameName" element={<GamesList url={url}/>}/>
          <Route path="/game/:gameId" element={<GamePage url={url}/>}/>
          <Route path="/user/:userId" element={<UserPageLayout url = {url}/>}>
            <Route path="createMeet" element={<CreateMeetPage url ={url}/>}/>
            <Route path="changeMeet/:meetId" element={<ChangeMeetPage url={url}/>}/>
            <Route path="player" element={<PlayerPage url = {url} />}/>
            <Route path="organization" element={<OrganizationPage url = {url} />}/>
            <Route path="createGame" element={<CreateGamePage url ={url}/>}/>
            <Route path="changeGame/:gameId" element={<ChangeGamePage url={url}/>}/>
            <Route path="publisher" element={<PublisherPage url={url}/>}/>
            <Route path="admin" element={<Navigate to={`/user/${user?.id}`} />}/>
          </Route>
        </Route>
        <Route path="/logIn" element={<LogIn buttonHandler={buttonHandler} url = {url}/>}></Route>
        <Route path="/registration" element={<Registration url={url} buttonHandler={buttonHandler}/>}></Route>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  );
}

