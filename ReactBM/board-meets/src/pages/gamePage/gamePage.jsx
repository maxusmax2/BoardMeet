import { useState } from "react";
import { useParams } from "react-router-dom";
import { AddButton } from "../../components/addButton/addButton";
import { CommentBlock } from "../../components/commentBlock/commentBlock";
import { CreateCommentForm } from "../../components/createCommentForm/createCommentForm";
import { Description } from "../../components/description/description";
import { GameReadCard } from "../../components/gameReadCard/gameReadCard";
import { Title } from "../../components/title/title";
import { getUser } from "../../helpers/getUser";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./gamePage.module.css";

export const GamePage = ({url}) => {
  let { gameId } = useParams();
  const game = useDataGet(url + "BoardGames/" + gameId);
  const user = getUser();
  const [commentForm,setCommentForm] = useState(false);
  const addCommentHandler = () =>{
    setCommentForm(!commentForm);
  }

  let addButton = !commentForm&&user?.role=="player"?<AddButton clickHandler={addCommentHandler}/>:null;
  let createComment = commentForm?<CreateCommentForm clickHandler={addCommentHandler} gameId={gameId} url={url}/>:null;

  return (
    <div className={style.container}>
      <div className={style.articleItem}><GameReadCard game={game} url={url}/></div>
      <div className={style.articleItem}><Description game={game} url={url}/></div>
      <div className={style.title}><Title content="Комментарии" /></div>
      <div className={style.button}>{addButton}</div>
      {createComment}
      <CommentBlock game={game}/>
    </div>
  );
}