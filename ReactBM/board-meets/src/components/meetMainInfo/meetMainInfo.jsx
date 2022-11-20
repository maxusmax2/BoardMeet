import style from "./meetMainInfo.module.css";
import { useData } from "../../hooks/useData";

export const MeetMainInfo = ({moreInfoHandler,meet}) => {
    const img = useData("https://jsonplaceholder.typicode.com/photos/" + meet.id); //Это заглушка 
    
    return(
        <section className={style.mainInfo}>
            <div className={style.userInfo}>
                <p className={style.userName}>@{meet.name}</p>
                <img src={img?.url} alt="userPhoto" className={style.userPhoto}></img>
            </div>
            <div className={style.textInfo} onClick={moreInfoHandler}>
                <div  className={style.textInfoItem}>
                    <p className={style.date}>{meet.date}</p>
                    <p className={style.location}> {meet.location}</p>
                    <p className={style.time}>{meet.date}</p>
                </div>
                <div className={style.verticalLine}></div>
                <div  className={style.textInfoItem}>
                    <p className={style.name}>{meet.name}</p>
                    <p className={style.games}> {meet.games}</p>
                </div>
            </div>
        </section>
    );
}
