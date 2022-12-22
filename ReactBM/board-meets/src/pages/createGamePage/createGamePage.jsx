import { useParams } from "react-router-dom";
import { CreateGameForm } from "../../components/createGameForm/createGameForm";
import { Title } from "../../components/title/title";
import { getUser } from "../../helpers/getUser";
import { useCheckAuthorization } from "../../hooks/useCheckAuthorization";
import style from "./createGamePage.module.css";

export const CreateGamePage = ({ url }) => {
  let { userId } = useParams();
  const user = getUser();
  useCheckAuthorization(user?.id, userId);

  return (
    <div className={style.container}>
      <div className={style.title}>
        <Title content="Создать статью" />
      </div>
      <CreateGameForm userId={userId} url={url} />
    </div>
  );
}