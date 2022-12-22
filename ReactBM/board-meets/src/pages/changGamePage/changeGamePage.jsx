import { useParams } from "react-router-dom";
import { ChangeGameForm } from "../../components/changeGameForm/changeGameForm";
import { Title } from "../../components/title/title";
import { getUser } from "../../helpers/getUser";
import { useCheckAuthorization } from "../../hooks/useCheckAuthorization";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./changeGamePage.module.css";

export const ChangeGamePage = ({ url }) => {
  let { userId } = useParams();
  let { gameId } = useParams();
  const user = getUser();
  useCheckAuthorization(user?.id, userId);

  const game = useDataGet(url + `BoardGames/${gameId}`)
  
  return (
    <div className={style.container}>
      <div className={style.title}>
        <Title content="Изменить статью" />
      </div>
      <ChangeGameForm userId={userId} url={url} game={game} /> 
    </div>
  );
}