import { GameMainInfo } from "../gameMainInfo/gameMainInfo";
import { Age, Genre, Players, Rating, TimeBold, Сomplexity } from "../icons/icons";
import style from "./gameReadCard.module.css";

export const GameReadCard = () => {

    return (
        <div className={style.container}>
            <GameMainInfo />
            <div className={style.moreInfo}>
                <div className={style.infoBlock}>
                    <p className={style.author}>@gaga_games</p>
                    <div className={style.rating}><Rating/>4.25</div>
                    <div className={style.community}>
                        <p>Community</p>
                        <div className={style.infoList}>
                            <div className={style.infoItemBlock}>
                                <div className={style.infoItem}>
                                    <span>Best</span>
                                    <Players fill="#057402" />
                                    <p className={style.gameItemInfo}>4-5</p>
                                </div>
                                <div className={style.infoItem}>
                                    <TimeBold fill="#057402" />
                                    <p className={style.gameItemInfo}>15+ минут</p>
                                </div>
                            </div>
                            <div className={style.infoItemBlock}>
                                <div className={style.infoItem}>
                                    <Сomplexity />
                                    <p className={style.gameItemInfo}>2.2/5</p>
                                </div>
                                <div className={style.infoItem}>
                                    <Age fill="#057402" />
                                    <p className={style.gameItemInfo}>10+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.verticalLine}></div>
                    <div className={style.creators}>
                        <ul className={style.creatorsList}>
                            <li className={style.creatorsItem}>
                                <p>Автор(-ы) <span>Аня, Соня, Лиза</span></p>
                            </li>
                            <li className={style.creatorsItem}>
                                <p>Художник(-и) <span>Аня, Соня, Лиза</span></p>
                            </li>
                            <li className={style.creatorsItem}>
                                <p>Издатель(-ли) <span>Аня, Соня, Лиза</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    );
}