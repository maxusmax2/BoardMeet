import { Filter } from "../../components/filter/filter";
import { MeetCard } from "../../components/meetCard/meetCard";
import { useData } from "../../hooks/useData";
import style from "./meetsList.module.css";

export const MeetsList = ({user}) => {
    console.log(user);
    const meets = useData("http://192.168.1.56:5057/api/Meet");
      console.log(meets);
    return(
        <div className={style.container}>
            <div className={style.filter}>
                <Filter/>
            </div>

            <ul className = {style.meetsList}>
                {!!meets?.length && meets.map((meet) => 
                    <li key={meet.id} className={style.meetsItem}><MeetCard meet={meet} typeMeet = {user?.id === meet.authorId?"Created": user?.id === meet.playerId? "Joined": "NonJoined"}/></li>
                )}
            </ul>
        </div>
    );
}