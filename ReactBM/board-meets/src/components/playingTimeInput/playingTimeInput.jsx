import { TimeBold } from "../icons/icons";
import style from "./playingTimeInput.module.css";
export const PlayingTimeInput = ({ register, errors }) => {
  return (
    <>
      <div className={style.container}>
        <label htmlFor="time"><TimeBold fill="#057402" />
          <p>Время игры, мин.</p>
        </label>
        <input type="text" id="time" placeholder="30" className={errors?.playingTime? style.inputError: style.input } {...register("playingTime", {
          required: true,
          pattern: {
            value: /^\d+$/,
          },
          max: {
            value: 1200,
          },
          min: {
            value: 1,
          }
        })} />
      </div>
    </>
  );
}