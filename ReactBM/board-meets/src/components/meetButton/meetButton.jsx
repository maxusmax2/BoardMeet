import axios from "axios";
import { getConfig } from "../../helpers/getConfig";
import style from "./meetButton.module.css";
import { getUser } from "../../helpers/getUser";
import { useContext } from "react";
import { MeetsContext } from "../../helpers/meetsContext";


export const MeetButton = ({ meet, url }) => {
  const user = getUser();
  const {deleteMeet, changeMeet, userPage} = useContext(MeetsContext);
  const userId = parseInt(user.id);
  let typeMeet = userId != null ? "NotJoined" : null;
  let playersIdList = meet.players.length && meet.players.map((player) => player.id);

  if (playersIdList && playersIdList.includes(userId)) {
    typeMeet = "Joined";
  }

  switch (meet.state) {
    case "RecruitingFull":
    case "Finished":
    case "Recruiting": {
      if (userId == meet.authorId || user.role == "admin") {
        typeMeet = "Created";
      }
      break;
    }
    case "StartOpen": {
      if (userId == meet.authorId) {
        typeMeet = "StartOpen";
      }
      break;
    }
    case "StartLock": {
     if (userId == meet.authorId) {
        typeMeet = "StartLock";
      }
      break;
    }
    case "StartFull": typeMeet = null;
      break;
  }


  const leaveHander = () => {

    axios.delete(url + `Meets/ExitMeet/${meet.id}/user/${userId}`, getConfig())
      .then((resp) => {changeMeet(resp.data);})
      .catch((err) => {
        if (err.response) { console.log("a"); }
        else if (err.request) { console.log("b"); }
        else { console.log("c"); }
      });
  }

  const deleteHander = () => {

    axios.delete(url + `Meets/${meet.id}`, getConfig())
      .then(() => deleteMeet(meet))
      .catch((err) => {
        if (err.response) { console.log("a"); }
        else if (err.request) { console.log("b"); }
        else { console.log("c"); }
      });
  }
  const joinHander = () => {
    axios.post(url + `Meets/JoinMeet/${meet.id}/User/${userId}`, {}, getConfig())
      .then((resp) => changeMeet(resp.data))
      .catch((err) => {
        if (err.response) { console.log("a"); }
        else if (err.request) { console.log("b"); }
        else { console.log("c"); }
      });
  }
  const closeHander = () => {
    axios.post(url + `Meets/Lock/${meet.id}`, {}, getConfig())
      .then((resp) => userPage?changeMeet(resp.data):deleteMeet(meet))
      .catch((err) => {
        if (err.response) { console.log("a"); }
        else if (err.request) { console.log("b"); }
        else { console.log("c"); }
      });
  }
  const openHander = () => {
    axios.post(url + `Meets/Open/${meet.id}`, {}, getConfig())
      .then((resp) => changeMeet(resp.data))
      .catch((err) => {
        if (err.response) { console.log("a"); }
        else if (err.request) { console.log("b"); }
        else { console.log("c"); }
      });
  }

  switch (typeMeet) {
    case "Joined":
      return <input type="button" className={style.meetButton} value="Покинуть" onClick={leaveHander} />
    case "Created":
      return <input type="button" className={style.meetButton} value="Удалить" onClick={deleteHander} />
    case "StartOpen":
      return <input type="button" className={style.meetButton} value="Закрыть набор" onClick={closeHander} />;
    case "StartLock":
      return <input type="button" className={style.meetButton} value="Открыть набор" onClick={openHander} />;
    case "NotJoined":
      return user.role == "player" ? <input type="button" className={style.meetButton} value="Присоединиться" onClick={joinHander} /> : null;
  }

}