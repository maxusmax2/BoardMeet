import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FilterGames } from "../../components/filterGames/filterGames";
import { GameCard } from "../../components/gameCard/gameCard";
import { getConfig } from "../../helpers/getConfig";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./gamesList.module.css";

export const GamesList = ({ url }) => {
  const [games, setGames] = useState();
  const { handleSubmit, register } = useForm();
  const { gameName } = useParams();
  const navigate = useNavigate();

  useEffect(
    () => {
      if (gameName) {
        axios.get(url + `BoardGames/Search/${gameName}`)
          .then((resp) => { setGames(resp.data) })
          .catch((er) => console.log(er))
      }
    }, [gameName])

  if (!games) {
    axios.get(url + "BoardGames")
      .then((resp) => {
        setGames(resp.data);
      })
      .catch((er) => console.log(er))
  }
  const searchHandler = (data) => {
    if (data.genre == "Все игры") {
      setGames(null);
      navigate("/games");
      return;
    };
    axios.get(url + `BoardGames/Filter/${data.genre}`, getConfig())
      .then((response) => {
        setGames(response.data);
      })
    navigate("/games");
  }
  return (
    <div className={style.container}>
      <div className={style.filter}>
        <FilterGames register={register} handleSubmit={handleSubmit} searchHandler={searchHandler} />
      </div>

      <ul className={style.gameList}>
        {!!games?.length && games.map((game) =>
          <li key={game?.id} className={style.meetsItem}><GameCard url={url} game={game} /></li>
        )}
      </ul>
    </div>
  );
}