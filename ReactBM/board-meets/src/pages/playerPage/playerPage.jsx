import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AddButton } from "../../components/addButton/addButton";
import { MeetCard } from "../../components/meetCard/meetCard";
import { Switch } from "../../components/switch/switch";
import { useData } from "../../hooks/useData";
import style from "./playerPage.module.css";

export const PlayerPage = () => {

    let {userId} = useParams();

    const [typeMeet,setTypeMeet] = useState({type:"Created",url:"http://192.168.1.56:5057/api/User/CreatedMeet/"+userId});

    const meets = useData(typeMeet.url);

    let linkAdd =null;

    if (typeMeet.type === "Created"){
        linkAdd = 
        <NavLink to ={ `/user/${userId}/createMeet`}> <AddButton/></NavLink>
    }

    const radioHandler = (value) => {
        switch(value){
            case "1":{}
                setTypeMeet({type:"Created",url:"http://192.168.1.56:5057/api/User/CreatedMeet/"+userId});
                break;
            case "2":
                setTypeMeet({type:"Joined",url:"http://192.168.1.56:5057/api/User/JoinedMeet/"+userId});
                break;
        }
    }
    return(
        <>
            <div className={style.switch}>
                <Switch label1 = "Created meets" label2 = "Joined meets" radioHandler = {radioHandler}/>
            </div>

            {linkAdd}
            <ul className = {style.meetsList}>
                {!!meets?.length && meets.map((meet) => 
                    <li key={meet.id} className={style.meetsItem}><MeetCard meet={meet} typeMeet = {typeMeet.type}/></li>
                )}
            </ul>
        </>
    );
}