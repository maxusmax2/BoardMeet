import { useParams } from "react-router-dom";
import { MeetCard } from "../../components/meetCard/meetCard";
import { Switch } from "../../components/switch/switch";
import { UserMainInfo } from "../../components/userMainInfo/userMainInfo";
import { useData } from "../../hooks/useData";
import style from "./playerPage.module.css";

export const PlayerPage = () => {
    let {id} =useParams();
    const meets = useData("https://jsonplaceholder.typicode.com/comments?postId=" + id);

    const radioHandler = (value) => {
        if (value==1){
            console.log(1);
        }
        else  console.log(2);
    }

    return(
        <div className={style.container}>
            <UserMainInfo id = {id}/>
            <Switch label1 = "Created meets" label2 = "Joined meets" radioHandler = {radioHandler}/>
            <ul>
            {!!meets?.length && meets.map((meet) => 
                <MeetCard meet={meet}/>
            )}
            </ul>
        </div>
    );
}