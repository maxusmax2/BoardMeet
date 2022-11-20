import style from "./meetMoreInfo.module.css";
import { Change, Communication, Participants, Time } from "../icons/icons";
import { NavLink } from "react-router-dom";
export const MeetMoreInfo = ({meet, typeMeet}) => {
    let buttonValue = typeMeet==="Joined"?"Leave":typeMeet==="Created"?"Delete Meet":"Join";
    let linkChange = null;
    if(typeMeet === "Created"){
        linkChange = <NavLink to="changeMeet" className={style.linkChange}><Change/></NavLink>
    }
    return(
        <section  className={style.moreInfo}>
            {linkChange}
            <ul className={style.otherInfoList}>
                <li className={style.infoItem}>
                    <Participants/>
                    <p className={style.otherInfoText}>{meet.postId}/{meet.id}</p>
                </li>
                <li className={style.infoItem}>
                    <Time/>
                    <p className={style.otherInfoText}>{meet.postId} ч.</p>
                </li>
                <li className={style.infoItem}>
                    <Communication/>
                    <p className={style.otherInfoText}>{meet.email}</p>
                </li>
            </ul>
            <div className={style.horisontLine}/>
            <ul className={style.gamesList}>
                <li className={style.infoItem}> <p className={style.infoTitle}>Games:</p></li>
                <li className={style.gamesListItem}>Ticket to Ride</li>
                <li className={style.gamesListItem}>UNO</li>
                <li className={style.gamesListItem}>Jenga</li>
                <li className={style.gamesListItem}>Ticket to Ride</li>
                <li className={style.gamesListItem}>UNO</li>
                <li className={style.gamesListItem}>Jenga</li>
            </ul>
            <div className={style.horisontLine}/>
            <ul className={style.otherInfoList}>
                <li className={style.infoItem}><p className={style.infoTitle}>Participants:</p></li>
                <li className={style.infoItem}>@ffffff</li>
                <li className={style.infoItem}>@UNO</li>
                <li className={style.infoItem}>@Jenga</li>
                <li className={style.infoItem}>@Ticket_to_Ride</li>
                <li className={style.infoItem}>@UNO</li>
                <li className={style.infoItem}>@Jenga</li>
                <li className={style.infoItem}>@Rumicub</li>
            </ul>
            <input type="button" className={style.buttonMoreInfo}value={buttonValue}></input>
        </section>
    );
}
