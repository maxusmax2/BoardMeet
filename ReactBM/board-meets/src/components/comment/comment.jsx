import { NavLink } from "react-router-dom";
import { getUser } from "../../helpers/getUser";
import { Age, Players, Rating, TimeBold, Сomplexity } from "../icons/icons";
import style from "./comment.module.css";

export const Comment = ({comment}) => {
  const user = getUser();
  return (
    <div className={style.container}>
      <div className={style.commentBody}>
        <img src="/assets/images/background.png" alt="author" />
        <NavLink to={`/user/${user.id}`} className={style.author}>@{comment.author.userName}</NavLink>
        <ul className={style.rating}>
          <li className={style.ratingItem}>
            <span>{comment.rating}</span>
            <Rating />
          </li>
          <li className={style.ratingItem}>
            <span>{comment.weightGame}/5</span>
            <Сomplexity />
          </li>
          <li className={style.ratingItem}>
            <span>{comment.bestPlayerMin}-{comment.bestPlayerMax}</span>
            <div className={style.bestPalyers}>
              Best<Players fill="#057402" />
            </div>
          </li>
          <li className={style.ratingItem}>
            <span>{comment.gameTime}+ минут</span>
            <TimeBold fill="#057402" />
          </li>
          <li className={style.ratingItem}>
            <span>{comment.agePlayer}+</span>
            <Age fill="#057402" />
          </li>
        </ul>
        <p className={style.text}> {comment.body} </p>
      </div>
    </div>
  );
}