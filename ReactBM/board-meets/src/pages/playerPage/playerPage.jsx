import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AddButton } from "../../components/addButton/addButton";
import { MeetCard } from "../../components/meetCard/meetCard";
import { Switch } from "../../components/switch/switch";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./playerPage.module.css";

export const PlayerPage = ({url}) => {

    let {userId} = useParams();
    const [typeMeet,setTypeMeet] = useState({type:"Created",url:url+"User/CreatedMeet/"+userId});

    const meets = useDataGet(typeMeet.url);

    let linkAdd =null;

    if (typeMeet.type === "Created"){
        linkAdd = 
        <NavLink to ={ `/user/${userId}/createMeet`}> <AddButton/></NavLink>
    }

    const radioHandler = (value) => {
        switch(value){
            case "1":
                setTypeMeet({type:"Created",url:url+"User/CreatedMeet/"+userId});
                break;
            case "2":
                setTypeMeet({type:"Joined",url:url+"User/JoinedMeet/"+userId});
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
                    <li key={meet.id} className={style.meetsItem}><MeetCard meet={meet} userId={userId} url = {url}/></li>
                )}
            </ul>
        </>
    );
}