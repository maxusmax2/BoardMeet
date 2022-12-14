import { NavLink, useParams } from "react-router-dom";
import { AddButton } from "../../components/addButton/addButton";
import { GameCard } from "../../components/gameCard/gameCard";
import { Title } from "../../components/title/title";
import { getUser } from "../../helpers/getUser";
import { useCheckAuthorization } from "../../hooks/useCheckAuthorization";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./publisherPage.module.css";

export const PublisherPage = ({ url }) => {

  let { userId } = useParams();
  const user = getUser();
  useCheckAuthorization(user?.id, userId)

  const games = useDataGet(url + "BoardGames/CreatedBoardGames/" + userId);

  return (
    <>
      <div className={style.titleContainer}>
        <Title content="Созданные статьи" />
      </div>
      <NavLink to={`/user/${userId}/createGame`}><AddButton /></NavLink>
      <ul className={style.gamesList}>
        {!!games?.length && games.map((game) =>
          <li key={game.id} className={style.gamesItem}><GameCard game={game} userId={userId} url={url} /></li>
        )}
      </ul>

    </>
  );
}