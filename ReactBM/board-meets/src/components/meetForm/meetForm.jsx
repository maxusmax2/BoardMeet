import { LightMaxTime, LightPlayers, Location, Time, Write } from "../icons/icons";
import { InputDate } from "../inputDate/inputDate";
import style from "./meetForm.module.css";
export const MeetForm = () => {
    return(
        <form className={style.container}>
            <div className={style.mainInfo}>
                <div className={style.namePlayersTime}>

                    <label className={style.inputLabel} htmlFor ="name">Название мероприятия</label>
                    <div className={style.inputName} id = "name">
                        <label className={style.inputIcon}><Write/></label>
                        <input type="text" className={style.input} placeholder = "Название мероприятия" maxlength="25" required></input>
                    </div>

                    <label className={style.inputLabel} htmlFor ="playersTime">Кол-во игроков и продолжительность(ч.)</label>
                    <div className={style.playersTime} id = "playersTime">
                        <div className={style.inputPlayers}>
                            <label className={style.inputIcon}><LightPlayers/></label>
                            <input type="number" className={style.input} placeholder = "10" min="2" max = "250" required></input>
                        </div>
                        <div className={style.inputMaxTime}>
                            <label className={style.inputIcon}><LightMaxTime/></label>
                            <input type="number" className={style.input} placeholder = "1" required></input>
                        </div>
                    </div>

                </div>
                <div className={style.verticalLine}></div>
                <div className={style.dateTimeLocation}>
                    <label className={style.inputLabel}>Время и место проведения</label>
                        <div className={style.dateTime}>
                            <div className={style.inputDate}>
                                <InputDate/>
                            </div>
                            <div className={style.inputTime}>
                                <label className={style.inputIcon}><Time/></label>
                                <input type="time" className={style.time} required></input>
                            </div>
                        </div>
                        <div className={style.inputLocation}>
                            <label className={style.inputIcon}><Location/></label>
                            <input type="text" className={style.input} placeholder = "ул.Лакина, д.171, кв. 15" required></input>
                        </div>

                </div>
            </div>
            <div className={style.moreInfo}>
                <div></div>
                <div></div>
                <button>vv</button>
            </div>
        </form>
    );
}