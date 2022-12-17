import { Artists } from "../icons/icons";
import style from "./artistsInput.module.css";
export const ArtistsInput = ({ register, errors }) => {
  return (
    <>
      <div className={style.container}>
        <label htmlFor="artists"><Artists/>
          <p>Художник(-и)</p>
        </label>
        <input type="text" id="artists" placeholder="Художник В.Р., Скучна А.А." className={errors?.artists ? style.inputError : style.input}{...register("artists", {
          required: true,
          maxLength: 50
        })} />
      </div>
    </>
  );
}