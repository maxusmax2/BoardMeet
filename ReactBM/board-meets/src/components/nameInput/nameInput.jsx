import { Age, Write } from "../icons/icons";
import style from "./nameInput.module.css";
export const NameInput = ({ register, errors }) => {
  return (
    <>
      <div className={style.container}>
        <label htmlFor="age"><Write width="20" height="20" fill="#057402" />
          <p>Название</p>
        </label>
        <input type="text" id="name" placeholder="Щеночки-вперед" className={errors?.name ? style.inputError : style.input}{...register("name", {
          required: true,
          maxLength: 30
        })} />
      </div>
    </>
  );
}