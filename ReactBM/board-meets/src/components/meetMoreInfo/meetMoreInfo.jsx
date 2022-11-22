import style from "./meetMoreInfo.module.css";
import { Change, Communication, LightMaxTime, Participants, Time } from "../icons/icons";
import { NavLink } from "react-router-dom";
import { MeetButton } from "../meetButton/meetButton";
export const MeetMoreInfo = ({meet, userId,role}) => {
    
    userId = parseInt(userId);
    let playersIdList = meet.players?.length&&meet.players.map((player) => player.id);

    let linkChange = null;
    let gameList = JSON.parse(meet.games);

               
    if(userId==meet.authorId){
        linkChange = <NavLink to={`/user/${meet.authorId}/changeMeet/${meet.id}`} className={style.linkChange}><Change/></NavLink>
    }

    return(
        <section  className={style.moreInfo}>
            {linkChange}
            <ul className={style.otherInfoList}>
                <li className={style.infoItem}>
                    <Participants/>
                    <p className={style.otherInfoText}>{meet.peopleCount}/{meet.peopleCountMax}</p>
                </li>
                <li className={style.infoItem}>
                    <LightMaxTime/>
                    <p className={style.otherInfoText}>{meet.duration} ч.</p>
                </li>
                <li className={style.infoItem}>
                    <Communication/>
                    <p className={style.otherInfoText}>{meet.link}</p>
                </li>
            </ul>
            <div className={style.horisontLine}/>
            <ul className={style.gamesList}>
                <li className={style.infoItem}> <p className={style.infoTitle}>Games:</p></li>
                {gameList?.length&&gameList.map((game) => 
                    <li className={style.gamesListItem}>{game}</li>      
                )}
            </ul>
            <div className={style.horisontLine}/>
            <ul className={style.otherInfoList}>
            <li className={style.infoItem}> <p className={style.infoTitle}>Participants:</p></li>
                {meet.players.map((player) => 
                    <li className={style.infoItem}><NavLink to = {playersIdList.includes(userId)?`/user/${player.id}/${player.role}`:`/user/${player.id}`}>@{player.userName}</NavLink></li>      
                )}
            </ul>
            <MeetButton meet = {meet} userId={userId} role= {role} />
        </section>
    );
}
