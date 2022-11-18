import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/layout";
import { GamesList } from "./pages/gamesList/meetsList";
import { LogIn } from "./pages/logIn/logIn";
import { MeetsList } from "./pages/meetsList/meetsList";
import { PlayerPage } from "./pages/playerPage/playerPage.jsx";

export const App = () => {
  const [auth,setAuth] = useState(false);
  const url = "http://192.168.1.56:7192";
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout auth={auth}/>}>
          <Route path="/meets" element={<MeetsList/>}></Route>
          <Route path="/games" element={<GamesList/>}></Route>
          <Route path="/user/:id" element={<PlayerPage/>}></Route>
        </Route>
        <Route path="/logIn" element={<LogIn/>}></Route>
      </Routes>
    </>
  );
}

