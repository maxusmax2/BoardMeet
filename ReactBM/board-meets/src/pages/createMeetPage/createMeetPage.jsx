
import { useParams } from "react-router-dom";
import { Date } from "../../components/icons/icons";
import { CreateMeetForm } from "../../components/createMeetForm/createMeetForm";
import { Title } from "../../components/title/title";
import style from "./createMeetPage.module.css";

export const CreateMeetPage = () => {

    let {userId} = useParams();

    return(
        <div className={style.container}>
            <div className={style.title}>
                <Title content="Create Meet"/>
            </div>
                <CreateMeetForm />
        </div>
    );
}