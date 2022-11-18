import { useState } from "react";
import { useParams } from "react-router-dom";
import { MeetCard } from "../../components/meetCard/meetCard";
import { Switch } from "../../components/switch/switch";
import { UserMainInfo } from "../../components/userMainInfo/userMainInfo";
import { useData } from "../../hooks/useData";
import { NavLink } from "react-router-dom";
import { AddButton } from "../../components/addButton/addButton";
import style from "./playerPage.module.css";

export const PlayerPage = () => {
    let {id} =useParams();

    const [typeMeet,setTypeMeet] = useState({type:"Created",url:"https://jsonplaceholder.typicode.com/comments?postId=1"});

    const meets = useData(typeMeet.url);

    let linkAdd =null;

    if (typeMeet.type == "Created"){
        linkAdd = 
        <NavLink to = "user/createMeet"> <AddButton/></NavLink>
    }

    const radioHandler = (value) => {
        switch(value){
            case "1":{}
                setTypeMeet({type:"Created",url:"https://jsonplaceholder.typicode.com/comments?postId=1"});
                break;
            case "2":
                setTypeMeet({type:"Joined",url:"https://jsonplaceholder.typicode.com/comments?postId=2"});
                break;
        }
    }

    return(
        <div className={style.container}>
            <UserMainInfo id = {id}/>
            <Switch label1 = "Created meets" label2 = "Joined meets" radioHandler = {radioHandler}/>
            {linkAdd}
            <ul>
            {!!meets?.length && meets.map((meet) => 
                <li key={meet.id}><MeetCard meet={meet} typeMeet = {typeMeet.type}/></li>
            )}
            </ul>
           
        </div>
    );
}