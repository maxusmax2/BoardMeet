import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../../helpers/getUser";
import { useDataGet } from "../../hooks/useDataGet";
import { AddButton } from "../addButton/addButton";
import { Comment } from "../comment/comment";
import { CreateCommentForm } from "../createCommentForm/createCommentForm";
import { Title } from "../title/title";
import style from "./commentBlock.module.css";

export const CommentBlock = ({ gameId, url }) => {
  const [comments, setComments] = useState();
  const [commentForm, setCommentForm] = useState(false);
  const user = getUser();
  const commentList = useDataGet(url + "BoardGames/Comments/" + gameId);

  const showHideForm = () => {
    setCommentForm(!commentForm);
  }

  useEffect(() => {
    if (commentList) {
      setComments(commentList);
    }
  }, [commentList])

  const delComment = (comment) => {
    setComments(comments.filter(elem => elem.id !== comment.id))
  }

  const addComment = (comment) => {
    setComments([...comments,comment])
    showHideForm();
  }

  const addButton = !commentForm && user?.role == "player" ? <AddButton clickHandler={showHideForm} /> : null;
  const createComment = commentForm ? <CreateCommentForm clickHandler={showHideForm} gameId={gameId} url={url} addComment={addComment}/> : null;


  return (
    <>
      <div className={style.title}><Title content="Комментарии" /></div>
      <div className={style.button}>{addButton}</div>
      {createComment}
      <ul className={style.container}>
        {!!comments?.length ? comments.map((comment) =>
          <li key={comment.id} className={style.commentItem}><Comment comment={comment} url={url} delComment={delComment} /></li>
        ) : <p className={style.notComment}>Комментариев пока нет 👽</p>}

      </ul>
    </>
  );
}