import { Сomplexity } from "../icons/icons";
import style from "./weightInput.module.css";
export const WeightInput = ({ register, errors }) => {
  return (
    <>
      <div className={style.container}>
        <label htmlFor="age"><Сomplexity fill="#057402" />
          <p>Сложность</p>
        </label>
        <input type="text" id="weight" placeholder="5" className={errors?.weight ? style.inputError : style.input}{...register("weight", {
          required: true,
          pattern: {
            value: /^\d+$/,
          },
          max: {
            value: 5,
          },
          min: {
            value: 1,
          }
        })} />
      </div>
    </>
  );
}