import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FilterGames } from "../../components/filterGames/filterGames";
import { GameCard } from "../../components/gameCard/gameCard";
import { getConfig } from "../../helpers/getConfig";
import { getUser } from "../../helpers/getUser";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./gamesList.module.css";

export const GamesList = ({ url }) => {
  const [games,setGames] = useState();
  const { handleSubmit, register } = useForm();
  const user = getUser();

  let gameList = useDataGet(url + "BoardGames");
  useEffect(() => {
    if (gameList) {
      setGames(gameList);
    }
  }, [gameList]);

  const searchHandler = (data) => {
    axios.get(url + `BoardGames/Filter/${data.genre}`, getConfig())
    .then((response) => {
      setGames(response.data);
     ;
    })
  }

  return (
    <div className={style.container}>
      <div className={style.filter}>
        <FilterGames register={register} handleSubmit={handleSubmit} searchHandler={searchHandler}/>
      </div>

      <ul className={style.gameList}>
        {!!games?.length && games.map((game) =>
          <li key={game.id} className={style.meetsItem}><GameCard url={url} game={game} userId={user.id} role={user.role} /></li>
        )}
      </ul>
    </div>
  );
}