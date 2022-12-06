import { useParams } from "react-router-dom";
import { ChangeMeetForm } from "../../components/changeMeetForm/changeMeetForm";
import { Title } from "../../components/title/title";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./changeMeetPage.module.css";

export const ChangeMeetPage = ({url}) => {
    let {userId} = useParams();
    let {meetId} = useParams();
    const meet = useDataGet(url + `Meet/${meetId}`)
    return(
        <div className={style.container}>
            <div className={style.title}>
                <Title content="Change Meet"/>
            </div>
                <ChangeMeetForm userId={userId} url={url} meet={meet}/>
        </div>
    );
}