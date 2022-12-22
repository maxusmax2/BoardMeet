import { useForm } from "react-hook-form";
import { AgeInput } from "../ageInput/ageInput";
import { Close, Star } from "../icons/icons";
import { PlayersInput } from "../playersInput/playersInput";
import { PlayingTimeInput } from "../playingTimeInput/playingTimeInput";
import { WeightInput } from "../weightInput/weightInput";
import ReactStars from "react-rating-stars-component";
import style from "./createCommentForm.module.css";
import { useState } from "react";
import { getUser } from "../../helpers/getUser";
import axios from "axios";
import { getConfig } from "../../helpers/getConfig";

export const CreateCommentForm = ({ clickHandler ,gameId, url, addComment}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const user = getUser();
  const [rating, setRating] = useState(3);

  const addHandler = (data) => {
    const _data = {
      ...data,
      rating: rating
    }
    let body = {
      "body": _data.comment,
      "rating": _data.rating,
      "weightGame": _data.weight,
      "gameTime": _data.playingTime,
      "bestPlayerMin": _data.minPlayers,
      "bestPlayerMax":  _data.maxPlayers,
      "agePlayer":  _data.age,
      "authorId": user.id,
      "gameId": gameId
    };
    axios.post(url + `BoardGames/CreateComment`, body, getConfig())
      .then((resp) =>addComment(resp.data))
      .catch((err) => {
        if (err.response) { console.log("a"); }
        else if (err.request) { console.log("b"); }
        else { console.log("c"); }
      });

  }
  const ratingChanged = (newRating) => {
    setRating(newRating);
  }
  return (
    <form className={style.form} onSubmit={handleSubmit(addHandler)}>
      <div className={style.header}>
        <div className={style.inputs}>
          <ReactStars
            count={5}
            value={rating}
            edit={true}
            onChange={ratingChanged}
            emptyIcon={<Star fillOpacity="0.3" />}
            filledIcon={<Star fillOpacity="1" />}
          />
          <div className={style.inputGroup}>
            <PlayingTimeInput register={register} errors={errors} />
            <PlayersInput register={register} errors={errors} />
          </div>
          <div className={style.inputGroup}>
            <AgeInput register={register} errors={errors} />
            <WeightInput register={register} errors={errors} />
          </div>
        </div>
        <button className={style.closeButtton} type="button" onClick={clickHandler}><Close /></button>
      </div>
      <label className={style.textCommentTitle} htmlFor="comment">Комментарий</label>
      <textarea id="comment" placeholder="Enter your things about this game)))" className={errors?.comment ? style.textError : style.commentText}{...register("comment", {
        required: true,
        maxLength: {
          value: 260
        }
      })} ></textarea>
      <div className={style.buttonContainer}>
        <button className={style.buttonForm}>Отправить</button>
      </div>
    </form >
  );
}