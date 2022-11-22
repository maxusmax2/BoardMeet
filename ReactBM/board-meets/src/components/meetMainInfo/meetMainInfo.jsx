import style from "./meetMainInfo.module.css";
import { useDataGet } from "../../hooks/useDataGet";
import { getMonthDay, getTime } from "../../helpers/date";

export const MeetMainInfo = ({moreInfoHandler,meet, url}) => {
    let games = JSON.parse(meet.games).join(", ");
    return(
        <section className={style.mainInfo}>
            <div className={style.userInfo}>
                <p className={style.userName}>@{meet.author.userName}</p>
                <img src={url + meet.author.avatarUrl} alt="userPhoto" className={style.userPhoto}></img>
            </div>
            <div className={style.textInfo} onClick={moreInfoHandler}>
                <div  className={style.textInfoItem}>
                    <p className={style.date}>{getMonthDay(meet.date)}</p>
                    <p className={style.location}> {meet.location}</p>
                    <p className={style.time}>{getTime(meet.date)}</p>
                </div>
                <div className={style.verticalLine}></div>
                <div  className={style.textInfoItem}>
                    <p className={style.name}>{meet.name}</p>
                    <p className={style.games}> {games}</p>
                </div>
            </div>
        </section>
    );
}
