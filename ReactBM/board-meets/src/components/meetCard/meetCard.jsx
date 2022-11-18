import { useData } from "../../hooks/useData";
import style from "./meetCard.module.css";
export const MeetCard = ({meet}) => {
    const img = useData("https://jsonplaceholder.typicode.com/photos/" + meet.id); //Это заглушка 
    return(
        <>
        <div className={style.mainInfo}>
            <img src={img?.url} className={style.userPhoto}></img>
            <div className={style.textInfo}>
                <div  className={style.textInfoItem}>
                    <p className={style.date}>{meet.id} November</p>
                    <p className={style.location}> {meet.email}</p>
                    <p className={style.time}>{meet.id}:0{meet.postId}</p>
                </div>
                <div  className={style.textInfoItem}>
                    <p className={style.name}>Lorem Ipsum</p>
                    <p className={style.games}> {meet.body}</p>
                </div>
            </div>
        </div>
        <div  className={style.moreInfo}>
            
        </div>
        </>
    );
}