import { Publishers } from "../icons/icons";
import style from "./publishersInput.module.css";
export const PublishersInput = ({ register, errors }) => {
  return (
    <>
      <div className={style.container}>
        <label htmlFor="publishers"><Publishers/>
          <p>Издатель(-ли)</p>
        </label>
        <input type="text" id="publishers" placeholder="Gaga games, Cosmo game" className={errors?.publishers ? style.inputError : style.input}{...register("publishers", {
          required: true,
          maxLength: 50
        })} />
      </div>
    </>
  );
}