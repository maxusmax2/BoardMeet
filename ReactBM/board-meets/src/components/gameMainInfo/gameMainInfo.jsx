import { Age, Genre, Players, TimeBold } from "../icons/icons";
import style from "./gameMainInfo.module.css";
export const GameMainInfo = ({game, url}) => {
	return (
		<div className={style.mainInfo}>
			<img className={style.gameImg} src={url + game?.gameAvatar} alt="game" />
			<div className={style.gameInfo}>
				<p className={style.gameName}>{game?.name}</p>
				<ul>
					<li className={style.gameItem}>
						<p className={style.gameItemInfo}>{game?.rangeOfPlayersMin}-{game?.rangeOfPlayersMax}</p>
						<Players />
					</li>
					<li className={style.gameItem}>
						<p className={style.gameItemInfo}>{game?.gameTime}+ минут</p>
						<TimeBold />
					</li>
					<li className={style.gameItem}>
						<p className={style.gameItemInfo}>{game?.agePlayer}+</p>
						<Age />
					</li>
					<li className={style.gameItem}>
						<p className={style.gameItemInfo}>{game?.genre}</p>
						<Genre />
					</li>
				</ul>
			</div>
		</div>
	);
}