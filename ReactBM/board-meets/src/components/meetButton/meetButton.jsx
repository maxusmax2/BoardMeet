import axios from "axios";
import { getConfig } from "../../helpers/getConfig";
import style from "./meetButton.module.css";
import { useNavigate} from "react-router-dom";

export const MeetButton = ({userId,role,meet,url}) => {
    const navigate = useNavigate();
    let playersIdList = meet.players.length&&meet.players.map((player) => player.id);
    let typeMeet = playersIdList?playersIdList.includes(userId)?"Joined":userId==meet.authorId?"Created":"NotJoined":null;

    const leaveHander = () => {

        axios.delete(url + `Meet/ExitMeet/${meet.id}/user/${userId}`,getConfig())
        .then((response) => {
            console.log(response.data);
        })
        .then(()=>navigate("/"))
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
        
    }
    const joinHander = () => {
        
    }

    switch(typeMeet){
        case "Joined" :
            return <input type="button" className={style.meetButton} value = "Leave" onClick={leaveHander}/>
        case "Created" :
            return <input type="button" className={style.meetButton} value = "Delete Meet" onClick={deleteHander}/>
        case "Other" :
            return role == "player"?<input type="button" className={style.meetButton} value = "Join" onClick={joinHander}/>:null;
    }
    
}