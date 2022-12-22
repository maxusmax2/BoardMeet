
import { useParams } from "react-router-dom";
import { CreateMeetForm } from "../../components/createMeetForm/createMeetForm";
import { Title } from "../../components/title/title";
import { getUser } from "../../helpers/getUser";
import { useCheckAuthorization } from "../../hooks/useCheckAuthorization";
import style from "./createMeetPage.module.css";

export const CreateMeetPage = ({ url }) => {
  let { userId } = useParams();
  const user = getUser();
  useCheckAuthorization(user?.id, userId);
  
  return (
    <div className={style.container}>
      <div className={style.title}>
        <Title content="Создать мероприятие" />
      </div>
      <CreateMeetForm userId={userId} url={url} />
    </div>
  );
}