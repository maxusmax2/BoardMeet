import { NavLink, useParams } from "react-router-dom";
import { AddButton } from "../../components/addButton/addButton";
import { MeetCard } from "../../components/meetCard/meetCard";
import { Title } from "../../components/title/title";
import { useData } from "../../hooks/useData";
import style from "./organizationPage.module.css";

export const OrganizationPage = () => {

    let {userId} = useParams();

    const meets = useData("https://jsonplaceholder.typicode.com/comments?postId=1");

    return(
        <>
            <div className={style.title}>
                <Title content = "Created Meets"/>
            </div>

            <NavLink to = { `/user/${userId}/createMeet`}> <AddButton/></NavLink>
            <ul className = {style.meetsList}>
                {!!meets?.length && meets.map((meet) => 
                    <li key={meet.id} className={style.meetsItem}><MeetCard meet={meet} typeMeet = "Created"/></li>
                )}
            </ul>
        </>
    );
}