import { useDataGet } from "../../hooks/useDataGet";
import style from "./meetButton.module.css";

export const MeetButton = ({userId,role,meet}) => {
  
    let playersIdList = meet.players?.length&&meet.players.map((player) => player.id);
    let typeMeet = playersIdList.includes(userId)?"Joined":userId==meet.authorId?"Created":"NotJoined";

    switch(typeMeet){
        case "Joined" :
            return <input type="button" className={style.meetButton} value = "Leave"/>
            break;
        case "Created" :
            return <input type="button" className={style.meetButton} value = "Delete Meet"/>
            break;
        case "Other" :
            return role == "player"?<input type="button" className={style.meetButton} value = "Join"/>:null;
            break;
    }
    
}