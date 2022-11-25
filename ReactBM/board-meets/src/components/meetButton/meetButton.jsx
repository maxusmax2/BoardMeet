import axios from "axios";
import { getConfig } from "../../helpers/getConfig";
import style from "./meetButton.module.css";
import { useNavigate } from "react-router-dom";

export const MeetButton = ({ userId, role, meet, url }) => {
    userId=parseInt(userId);
    const navigate = useNavigate();
    let playersIdList = meet.players.length && meet.players.map((player) => player.id);
    console.log(playersIdList);
    
    let typeMeet = userId !=null ? "NotJoined":null;
    if (playersIdList){
        if(playersIdList.includes(userId)){
            typeMeet="Joined";
        }
    }   
    if(userId == meet.authorId){
        typeMeet="Created";
    }
    
    const leaveHander = () => {

        axios.delete(url + `Meet/ExitMeet/${meet.id}/user/${userId}`, getConfig())
            .then((response) => {
                console.log(response.data);
            })
            .then(() => window.location.reload())
            .catch((err) => {
                if (err.response) {
                    console.log("a");
                }
                else if (err.request) {
                    console.log("b");
                }
                else {
                    console.log("c");
                }
            });
    }

    const deleteHander = () => {
        axios.delete(url + `Meet/${meet.id}`, getConfig())
            .then((response) => {
                console.log(response.data);
            })
            .then(() => window.location.reload())
            .catch((err) => {
                if (err.response) {
                    console.log("a");
                }
                else if (err.request) {
                    console.log("b");
                }
                else {
                    console.log("c");
                }
            });
    }
    const joinHander = () => {
        axios.post(url + `Meet/JoinMeet/${meet.id}/User/${userId}`, getConfig())
            .then((response) => {
                console.log(response.data);
            })
            .then(() => window.location.reload())
            .catch((err) => {
                if (err.response) {
                    console.log("a");
                }
                else if (err.request) {
                    console.log("b");
                }
                else {
                    console.log("c");
                }
            });
    }

    switch (typeMeet) {
        case "Joined":
            return <input type="button" className={style.meetButton} value="Покинуть" onClick={leaveHander} />
        case "Created":
            return <input type="button" className={style.meetButton} value="Удалить" onClick={deleteHander} />
        case "NotJoined":
            return role == "player" ? <input type="button" className={style.meetButton} value="Присоединиться" onClick={joinHander} /> : null;
    }

}