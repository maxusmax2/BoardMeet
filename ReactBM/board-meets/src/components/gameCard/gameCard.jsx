import { GameMainInfo } from "../gameMainInfo/gameMainInfo";
import { Change } from "../icons/icons";
import style from "./gameCard.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser } from "../../helpers/getUser";
export const GameCard = ({ game, url }) => {
  const user = getUser();
  const navigate = useNavigate();
  const readHandler = () => {
    navigate("/game/" + game.id);
  }
  const changeHandler = () => {
    navigate(`/user/${user.id}/changeGame/${game.id}`);
  }
  return (

    <div className={style.container}>
      <GameMainInfo game={game} url={url} />
      <div className={style.moreInfo}>
        <NavLink className={style.author} to = {game.authorId==user.id?`/user/${game.authorId}/${user.role}`:`/user/${game.authorId}`}>@{game.author.userName}</NavLink>
        <button className={style.buttonChange} hidden={game.authorId == user.id ? false : true} onClick={changeHandler}><Change width="35" height="35" /></button>
        <p className={style.shortDesription}>{game.description}</p>
        <button className={style.buttonRead} onClick={readHandler}>Read</button>
      </div>

    </div>

  );
}