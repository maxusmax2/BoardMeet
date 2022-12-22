import style from "./meetMainInfo.module.css";
import { getMonthDay, getTime } from "../../helpers/date";
import { getUser } from "../../helpers/getUser";
import { NavLink } from "react-router-dom";
import { MeetIndicator } from "../meetIndicate/meetIndicator";
export const MeetMainInfo = ({ moreInfoHandler, meet, url }) => {
  const user = getUser();
  let games = JSON.parse(meet.games).join(", ");
  return (
    <section className={style.mainInfo}>
      <div className={style.userInfo}>
        <NavLink to={meet.authorId==user?.id?`/user/${user?.id}/${user?.role}`:`/user/${meet.authorId}`} className={style.userName}>@{meet.author.userName}</NavLink>
        <img src={url + meet.author.avatarUrl} alt="userPhoto" className={style.userPhoto}></img>
      </div>
      <div className={style.textInfo} onClick={moreInfoHandler}>
        <div className={style.textInfoItem}>
          <p className={style.date}>{getMonthDay(meet.date)}</p>
          <p className={style.location}> г. {meet.city} | {meet.location}</p>
          <p className={style.time}>{getTime(meet.date)}</p>
        </div>
        <MeetIndicator meet={meet}/>
        <div className={style.textInfoItem}>
          <p className={style.name}>{meet.name}</p>
          <p className={style.games}> {games}</p>
        </div>
      </div>
    </section>
  );
}
