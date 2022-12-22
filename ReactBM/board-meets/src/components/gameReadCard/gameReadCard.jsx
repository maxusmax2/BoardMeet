import { GameMainInfo } from "../gameMainInfo/gameMainInfo";
import { Age, Players, Rating, TimeBold, Сomplexity } from "../icons/icons";
import style from "./gameReadCard.module.css";

export const GameReadCard = ({game, url}) => {

  return (
    <div className={style.container}>
      <GameMainInfo game={game} url={url}/>
      <div className={style.moreInfo}>
        <div className={style.infoBlock}>
          <p className={style.author}>@{game?.author.userName}</p>
          <div className={style.rating}><Rating />{game?.ratingUser}</div>
          <div className={style.community}>
            <p>Community</p>
            <div className={style.infoList}>
              <div className={style.infoItemBlock}>
                <div className={style.infoItem}>
                  <span>Best</span>
                  <Players fill="#057402" />
                  <p className={style.gameItemInfo}>{game?.bestRangeOfPlayersMinUser}-{game?.bestRangeOfPlayersMaxUser}</p>
                </div>
                <div className={style.infoItem}>
                  <TimeBold fill="#057402" />
                  <p className={style.gameItemInfo}>{game?.gameTimeUser}+ минут</p>
                </div>
              </div>
              <div className={style.infoItemBlock}>
                <div className={style.infoItem}>
                  <Сomplexity />
                  <p className={style.gameItemInfo}>{game?.weightGameUser}/5</p>
                </div>
                <div className={style.infoItem}>
                  <Age fill="#057402" />
                  <p className={style.gameItemInfo}>{game?.agePlayerUser}+</p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.verticalLine}></div>
          <div className={style.creators}>
            <ul className={style.creatorsList}>
              <li className={style.creatorsItem}>
                <p>Автор(-ы) <span>{game?.authorsGame}</span></p>
              </li>
              <li className={style.creatorsItem}>
                <p>Художник(-и) <span>{game?.artists}</span></p>
              </li>
              <li className={style.creatorsItem}>
                <p>Издатель(-ли) <span>{game?.publishers}</span></p>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>

  );
}