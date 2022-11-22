import { useState } from "react";
import { Communication, Date, LightMaxTime, LightPlayers, Location, MinusButton, PlusButton, Time, Write } from "../icons/icons";
import style from "./createMeetForm.module.css";

export const CreateMeetForm = () => {

    const [formValue,setFormValue] = useState({name:null,players:null,maxTime:null,date:null,time:null,location:null,communication:null,game:null}); 
    const [gameList,setGameList] = useState([]); 

    const inputHandler = (event) =>{
        const name = event.target.name;
        setFormValue({[name]: event.target.value});
    }

    const plusButtonHandler = () => {
        if(formValue.game && gameList.indexOf(formValue.game)==-1){
            setGameList([...gameList, formValue.game]);
        }
    }

    const minusButtonHandler = (value) => {
        setGameList(gameList.filter(p => p !== value));
    }

    return(
        <form className={style.container}>
            <div className={style.mainInfo}>
                <div className={style.namePlayersTime}>

                    <label className={style.inputLabel} htmlFor ="name">Название мероприятия</label>
                    <div className={style.inputName} id = "name">
                        <label className={style.inputIcon}><Write/></label>
                        <input type="text" name="name" className={style.input} placeholder = "Название мероприятия" maxLength="25" defaultValue={formValue.name} onChange= {inputHandler} required></input>
                    </div>

                    <label className={style.inputLabel} htmlFor ="playersTime">Кол-во игроков и продолжительность(ч.)</label>
                    <div className={style.playersTime} id = "playersTime">
                        <div className={style.inputPlayers}>
                            <label className={style.inputIcon}><LightPlayers/></label>
                            <input type="number" name="players" className={style.input} placeholder = "10" min="2" max = "250" defaultValue={formValue.players} onChange= {inputHandler} required></input>
                        </div>
                        <div className={style.inputMaxTime}>
                            <label className={style.inputIcon}><LightMaxTime/></label>
                            <input type="number" name="maxTime" className={style.input} placeholder = "1" min="1" defaultValue={formValue.maxTime} onChange = {inputHandler} required></input>
                        </div>
                    </div>

                </div>
                <div className={style.verticalLine}></div>
                <div className={style.dateTimeLocation}>
                    <label className={style.inputLabel}>Время и место проведения</label>
                        <div className={style.dateTime}>
                            <div className={style.inputDate}>
                                    <label className={style.inputIcon}><Date/></label>
                                    <input type="date" name="date" className={style.date} defaultValue={formValue.name} onChange= {inputHandler} required></input>
                            </div>
                            <div className={style.inputTime}>
                                <label className={style.inputIcon}><Time/></label>
                                <input type="time" name="time" className={style.time} defaultValue={formValue.time} onChange= {inputHandler} required></input>
                            </div>
                        </div>
                        <div className={style.inputLocation}>
                            <label className={style.inputIcon}><Location/></label>
                            <input type="text" name="location" className={style.input} placeholder = "ул.Лакина, д.171, кв. 15" defaultValue={formValue.location} onChange= {inputHandler} required/>
                        </div>

                </div>
            </div>
            <div className={style.moreInfo}>
                <div className={style.communicationGames}>
                    <div className={style.communication}>
                        <label className={style.inputGreenLabel}>Время и место проведения</label>
                        <div className={style.communicationInput}>
                            <label className={style.inputIcon}><Communication/></label>
                            <input type="text" name="communication" className={style.input} placeholder = "https://t.me/channelname" maxLength="25"  defaultValue={formValue.communication} onChange = {inputHandler}></input>
                        </div>
                    </div>
                    <div className={style.games}>
                        <label className={style.inputGreenLabel}>Время и место проведения</label>
                        <div className={style.gamesInput}>
                            <label className={style.inputIcon}><button type="button" className={style.plusButton} onClick = {plusButtonHandler}><PlusButton /></button></label>
                            <input type="text" name="game" className={style.input} placeholder = "Название игры" maxLength="25"  defaultValue={formValue.game} onChange= {inputHandler} required></input>
                        </div>
                        <ul className = {style.gamesList}>
                            {gameList?.length!=0&&gameList?.length&&gameList.map((game) => 
                                <li key={gameList.indexOf(game)} className={style.gameItem}>
                                    <button type="button" className={style.minusButton} onClick={()=>minusButtonHandler(game)}><MinusButton/></button>
                                    {game}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <button className={style.buttonCreateMeet}>Create Meet</button>
            </div>
        </form>
    );
}