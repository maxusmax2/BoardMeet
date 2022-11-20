
import { Date } from "../../components/icons/icons";
import { MeetForm } from "../../components/meetForm/meetForm";
import { Title } from "../../components/title/title";
import style from "./createMeetPage.module.css";

export const CreateMeetPage = () => {

    return(
        <div className={style.container}>
            <Title content="Create Meet"/>
            <MeetForm/>
        </div>
    );
}