import { GameMainInfo } from "../gameMainInfo/gameMainInfo";
import { Change, MinusButton } from "../icons/icons";
import style from "./gameCard.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser } from "../../helpers/getUser";
import axios from "axios";
import { getConfig } from "../../helpers/getConfig";
export const GameCard = ({ game, url, delGame }) => {
  const user = getUser();
  const navigate = useNavigate();
  const delHandler = () =>{
    axios.delete(url + "BoardGames/" + game.id, getConfig())
      .then(() =>delGame(game))
      .catch((err) => {
        if (err.response) { console.log("a"); }
        else if (err.request) { console.log("b"); }
        else { console.log("c"); }
      });
  }
  
  const readHandler = () => {
    navigate("/game/" + game.id);
  }
  const changeHandler = () => {
    navigate(`/user/${user.id}/changeGame/${game.id}`);
  }
  const button = user?.role == "admin"? <button className={style.buttonDel} onClick={delHandler}> <MinusButton fill="#64C661"/></button>: 
  <button className={style.buttonChange} hidden={game.authorId == user?.id? false : true} onClick={changeHandler}><Change width="35" height="35" /></button>
  
  return (

    <div className={style.container}>
      <GameMainInfo game={game} url={url} />
      <div className={style.moreInfo}>
        <NavLink className={style.author} to = {game.authorId==user?.id?`/user/${game.authorId}/${user?.role}`:`/user/${game.authorId}`}>@{game.author.userName}</NavLink>
        {button}
        <p className={style.shortDesription}>{game.description}</p>
        <button className={style.buttonRead} onClick={readHandler}>Read</button>
      </div>

    </div>

  );
}