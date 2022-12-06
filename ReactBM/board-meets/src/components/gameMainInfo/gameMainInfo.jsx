import { Age, Change, Genre, Players, TimeBold, Write } from "../icons/icons";
import style from "./gameMainInfo.module.css";
export const GameMainInfo = () => {

    return (
        <div className={style.mainInfo}>
            <img className={style.gameImg} src="assets/images/background.png" alt="game" />
            <div className={style.gameInfo}>
                <p className={style.gameName}>Tiny Town</p>
                <ul>
                    <li className={style.gameItem}>
                        <p className={style.gameItemInfo}>2-5</p>
                        <Players />
                    </li>
                    <li className={style.gameItem}>
                        <p className={style.gameItemInfo}>90+ минут</p>
                        <TimeBold />
                    </li>
                    <li className={style.gameItem}>
                        <p className={style.gameItemInfo}>13+</p>
                        <Age />
                    </li>
                    <li className={style.gameItem}>
                        <p className={style.gameItemInfo}>Card Game</p>
                        <Genre />
                    </li>
                </ul>
            </div>
        </div>
    );
}