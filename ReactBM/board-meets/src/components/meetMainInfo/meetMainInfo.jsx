import style from "./meetMainInfo.module.css";
import { useData } from "../../hooks/useData";

export const MeetMainInfo = ({moreInfoHandler,meet}) => {
    const img = useData("https://jsonplaceholder.typicode.com/photos/" + meet.id); //Это заглушка 
    return(
        <section className={style.mainInfo}>
            <div className={style.userInfo}>
                <p className={style.userName}>@Fawn_Vivin</p>
                <img src={img?.url} className={style.userPhoto}></img>
            </div>
            <div className={style.textInfo} onClick={moreInfoHandler}>
                <div  className={style.textInfoItem}>
                    <p className={style.date}>{meet.id} Ноября</p>
                    <p className={style.location}> {meet.email}</p>
                    <p className={style.time}>{meet.id}:0{meet.postId}</p>
                </div>
                <div className={style.verticalLine}></div>
                <div  className={style.textInfoItem}>
                    <p className={style.name}>Lorem Ipsum</p>
                    <p className={style.games}> {meet.body}</p>
                </div>
            </div>
        </section>
    );
}
