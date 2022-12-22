import { Players, TimeBold } from "../icons/icons";
import style from "./playersInput.module.css";
export const PlayersInput = ({ register, errors }) => {
  return (
    <>
      <div className={style.container}>
        <label htmlFor="minPlayers"><Players fill="#057402" />
          <p>Кол-во игроков</p>
        </label>
        <input type="text" id="minPlayers" placeholder="2" className={errors?.minPlayers ? style.inputError : style.input} {...register("minPlayers", {
          required: "введите мин.значение",
          pattern: {
            value: /^\d+$/,
            message: "введите целое число"
          },
          max: {
            value: 20,
            message: "макс.значение-20"
          },
          min: {
            value: 1,
            message: "мин.значение-1"
          }
        })} />
        <p>до</p>
        <input type="text" id="maxPlayers" placeholder="5" className={errors?.maxPlayers ? style.inputError : style.input}{...register("maxPlayers", {
          required: true,
          pattern: {
            value: /^\d+$/,
          },
          max: {
            value: 20,
          },
          min: {
            value: 1,
          }
        })} />
      </div>
    </>
  );
}