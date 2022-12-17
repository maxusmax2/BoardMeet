import { Authors } from "../icons/icons";
import style from "./authorsInput.module.css";
export const AuthorsInput = ({ register, errors }) => {
  return (
    <>
      <div className={style.container}>
        <label htmlFor="authors"><Authors/>
          <p>Автор(-ы)</p>
        </label>
        <input type="text" id="authors" placeholder="Авторов К.С." className={errors?.authors ? style.inputError : style.input}{...register("authors", {
          required: true,
          maxLength: 50
        })} />
      </div>
    </>
  );
}