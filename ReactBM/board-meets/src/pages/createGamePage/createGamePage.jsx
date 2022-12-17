import { useParams } from "react-router-dom";
import { CreateGameForm } from "../../components/createGameForm/createGameForm";
import { Title } from "../../components/title/title";
import style from "./createGamePage.module.css";

export const CreateGamePage = ({ url }) => {
  let { userId } = useParams();

  return (
    <div className={style.container}>
      <div className={style.title}>
        <Title content="Создать статью" />
      </div>
      <CreateGameForm userId={userId} url={url} />
    </div>
  );
}