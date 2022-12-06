import { GameMainInfo } from "../gameMainInfo/gameMainInfo";
import { Age, Change, Genre, Players, TimeBold, Write } from "../icons/icons";
import style from "./gameCard.module.css";
import { useNavigate} from "react-router-dom";
export const GameCard = ({ meet, url, userId, role }) => {
    const navigate = useNavigate();
    const readHandler = () => {
        navigate("/game/1");
    }
    return (
        

            <div className={style.container}>
               <GameMainInfo/>
                <div className={style.moreInfo}>
                    <p className={style.author}>@gaga_games</p>
                    <button className={style.buttonChange}><Change width="35" height="35" /></button>
                    <p className={style.shortDesription}>Итак, представьте, что вы являетесь мэром крошечного городка в лесной чаще, что расположен в самом сердце маленькой страны, надёжно укрытой от хищников. К сожалению, земли здесь недостаточно, да и ресурсов маловато...Итак, представьте, что вы являетесь мэром крошечного городка в лесной чаще, что расположен в самом сердце маленькой страны, надёжно укрытой от хищников. К сожалению, земли здесь недостаточно, да и ресурсов маловато...</p>
                    <button className={style.buttonRead} onClick={readHandler}>Read</button>
                </div>

            </div>
       
    );
}