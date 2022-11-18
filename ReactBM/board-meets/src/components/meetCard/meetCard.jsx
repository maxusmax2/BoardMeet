import { useState } from "react";
import { MeetMainInfo } from "../meetMainInfo/meetMainInfo";
import { MeetMoreInfo } from "../meetMoreInfo/meetMoreInfo";
import style from "./meetCard.module.css";
export const MeetCard = ({meet,typeMeet}) => {

    const[moreInfo,setMoreInfo] = useState(false);

    let moreInfoSection = null;
    if (moreInfo){
        moreInfoSection = <MeetMoreInfo typeMeet={typeMeet} meet={meet}/>;
    }
    
    const moreInfoHandler = () => {
        setMoreInfo(!moreInfo); 
    }
    
    return(
        <>
            <div className={style.container}>
                <MeetMainInfo moreInfoHandler={moreInfoHandler} meet={meet}/>
                {moreInfoSection}
            </div>
        </>
    );
}