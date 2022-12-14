import { useParams } from "react-router-dom";
import { ChangeMeetForm } from "../../components/changeMeetForm/changeMeetForm";
import { Title } from "../../components/title/title";
import { getUser } from "../../helpers/getUser";
import { useCheckAuthorization } from "../../hooks/useCheckAuthorization";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./changeMeetPage.module.css";

export const ChangeMeetPage = ({ url }) => {

  let { userId } = useParams();
  let { meetId } = useParams();
  const user = getUser();
  useCheckAuthorization(user?.id, userId);

  const meet = useDataGet(url + `Meets/${meetId}`)
  
  return (
    <div className={style.container}>
      <div className={style.title}>
        <Title content="Изменить мероприятие" />
      </div>
      <ChangeMeetForm userId={userId} url={url} meet={meet} />
    </div>
  );
}