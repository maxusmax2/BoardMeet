import style from "./meetMoreInfo.module.css";
import { Change, Communication, LightMaxTime, Participants } from "../icons/icons";
import { NavLink } from "react-router-dom";
import { MeetButton } from "../meetButton/meetButton";
import { getUser } from "../../helpers/getUser";
export const MeetMoreInfo = ({ meet, url}) => {
  const user = getUser();
  let playersIdList = meet.players.length && meet.players.map((player) => player.id);

  let linkChange = null;
  let gameList = JSON.parse(meet.games);

  if (user?.id == meet.authorId) {
    linkChange = <NavLink to={`/user/${meet.authorId}/changeMeet/${meet.id}`} className={style.linkChange}><Change /></NavLink>
  }

  return (
    <section className={style.moreInfo}>
      {linkChange}
      <ul className={style.otherInfoList}>
        <li className={style.infoItem}>
          <Participants />
          <p className={style.otherInfoText}>{meet.peopleCount}/{meet.peopleCountMax}</p>
        </li>
        <li className={style.infoItem}>
          <LightMaxTime />
          <p className={style.otherInfoText}>{Math.trunc(meet.duration/60)} ч. {meet.duration%60} мин.</p>
        </li>
        <li className={style.infoItem}>
          <Communication />
          <p className={style.otherInfoText}>{meet.link ? meet.link : "Ссылка не указана"}</p>
        </li>
      </ul>
      <div className={style.horisontLine} />
      <ul className={style.gamesList}>
        <li className={style.infoItem}> <p className={style.infoTitle}>Игры:</p></li>
        {gameList?.length && gameList.map((game) =>
          <li key={game} className={style.gamesListItem}>{game}</li>
        )}
      </ul>
      <div className={style.horisontLine} />
      <ul className={style.otherInfoList}>
        <li className={style.infoItem}> <p className={style.infoTitle}>Участники:</p></li>
        {meet.players.length ? meet.players.map((player) =>
          <li className={style.infoItem} key={player.id}><NavLink to={playersIdList?.includes(user.id) ? `/user/${player.id}/${player.role}` : `/user/${player.id}`}>@{player.userName}</NavLink></li>
        ) : <li className={style.infoItem}>Участников пока нет(</li>}
      </ul>
      <MeetButton meet={meet} url={url}/>
    </section>
  );
}
