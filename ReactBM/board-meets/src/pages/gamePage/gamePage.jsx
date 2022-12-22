import { useParams } from "react-router-dom";
import { CommentBlock } from "../../components/commentBlock/commentBlock";
import { Description } from "../../components/description/description";
import { GameReadCard } from "../../components/gameReadCard/gameReadCard";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./gamePage.module.css";

export const GamePage = ({url}) => {
  let { gameId } = useParams();
  const game = useDataGet(url + "BoardGames/" + gameId);

  return (
    <div className={style.container}>
      <div className={style.articleItem}><GameReadCard game={game} url={url}/></div>
      <div className={style.articleItem}><Description game={game} url={url}/></div>
      <CommentBlock gameId={gameId} url={url}/>
    </div>
  );
}