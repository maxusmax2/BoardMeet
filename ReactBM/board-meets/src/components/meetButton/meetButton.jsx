import axios from "axios";
import { getConfig } from "../../helpers/getConfig";
import style from "./meetButton.module.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../helpers/getUser";

export const MeetButton = ({ meet, url }) => {
  const user = getUser();
  const userId = parseInt(user.id);
  const navigate = useNavigate();
  let playersIdList = meet.players.length && meet.players.map((player) => player.id);
  let typeMeet = userId != null ? "NotJoined" : null;
  if (playersIdList) {
    if (playersIdList.includes(userId)) {
      typeMeet = "Joined";
    }
  }
  if (userId == meet.authorId || user.role=="admin") {
    typeMeet = "Created";
  }

  const leaveHander = () => {

    axios.delete(url + `Meets/ExitMeet/${meet.id}/user/${userId}`, getConfig())
      .then(() => window.location.reload())
      .catch((err) => {
        if (err.response) {console.log("a");}
        else if (err.request) {console.log("b");}
        else {console.log("c");}
      });
  }

  const deleteHander = () => {
    axios.delete(url + `Meets/${meet.id}`, getConfig())
      .then(() => window.location.reload())
      .catch((err) => {
        if (err.response) {console.log("a");}
        else if (err.request) {console.log("b");}
        else {console.log("c");}
      });
  }
  const joinHander = () => {
    axios.post(url + `Meets/JoinMeet/${meet.id}/User/${userId}`, {}, getConfig())
      .then(() => window.location.reload())
      .catch((err) => {
        if (err.response) {console.log("a");}
        else if (err.request) {console.log("b");}
        else {console.log("c");}
      });
  }

  switch (typeMeet) {
    case "Joined":
      return <input type="button" className={style.meetButton} value="Покинуть" onClick={leaveHander} />
    case "Created":
      return <input type="button" className={style.meetButton} value="Удалить" onClick={deleteHander} />
    case "NotJoined":
      return user.role == "player" ? <input type="button" className={style.meetButton} value="Присоединиться" onClick={joinHander} /> : null;
  }

}