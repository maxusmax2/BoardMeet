import { Filter } from "../../components/filter/filter";
import { MeetCard } from "../../components/meetCard/meetCard";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./meetsList.module.css";

export const MeetsList = ({userId,url,role}) => {
    const meets = useDataGet(url + "Meet");
    return(
        <div className={style.container}>
            <div className={style.filter}>
                <Filter/>
            </div>

            <ul className = {style.meetsList}>
                {!!meets?.length && meets.map((meet) => 
                    <li key={meet.id} className={style.meetsItem}><MeetCard url = {url} meet={meet} userId={userId} role={role}/></li>
                )}
            </ul>
        </div>
    );
}