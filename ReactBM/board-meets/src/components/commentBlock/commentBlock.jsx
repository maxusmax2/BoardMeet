import { useDataGet } from "../../hooks/useDataGet";
import { Comment } from "../comment/comment";
import style from "./commentBlock.module.css";

export const CommentBlock = ({ game }) => {
  const comments = game?.comments;
  return (
    <ul className={style.container}>
      {!!comments?.length? comments.map((comment) =>
        <li key={comment.id} className={style.commentItem}><Comment comment={comment} /></li>
      ):<p className={style.notComment}>Комментариев пока нет(((</p>}
      
    </ul>
  );
}