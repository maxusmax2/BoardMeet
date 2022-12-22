import { NavLink } from "react-router-dom";
import style from "./registrationSecondStep.module.css";
import { Back } from "../icons/icons";


export const RegistrationSecondStep = ({ register, handleSubmit, onSubmit, secondStepHandler, errors, watch }) => {
  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={style.formTitle}>Регистрация</p>
      <div className={style.formInput}>
        <label htmlFor="email" className={style.mandatoryLabel}>Обязательно</label>
        <input
          type="email"
          id="email"
          className={style.input}
          placeholder=" "
          {...register("email", {
            required: "введите свой email",
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "email введен не корректно"
            }
          })} />
        {errors?.email && <p className="error">{errors.email.message}</p>}
        <label className={style.swimLabel} htmlFor="email">Email</label>
      </div>
      <div className={style.formInput}>
        <label htmlFor="role" className={style.mandatoryLabel}>Mandatory</label>
        <select className={style.input} placeholder=" " {...register("role")}>
          <option>player</option>
          <option>organization</option>
          <option>publisher</option>
        </select>
        <label className={style.swimLabel} htmlFor="role" >Роль</label>
      </div>
      <div className={style.formInput}>
        <label htmlFor="password" className={style.mandatoryLabel}>Обязательно</label>
        <input
          type="password"
          className={style.input}
          placeholder=" "
          {...register("password", {
            required: "введите пароль",
            pattern: {
              value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/,
              message: "должен включать (A-Z,a-z,0-9,(*/@#%$^&))"
            },
            maxLength: {
              value: 15,
              message: "макс.длина-15"
            },
            minLength: {
              value: 6,
              message: "мин.длина-6"
            }
          })} />
        {errors?.password && <p className="error">{errors.password.message}</p>}
        <label className={style.swimLabel} htmlFor="password" >Пароль</label>
      </div>
      <div className={style.formInput}>
        <label className={style.mandatoryLabel}>Обязательно</label>
        <input
          type="password"
          className={style.input}
          placeholder=" "
          {...register("doublePassword", {
            validate: (val) => {
              if (watch("password") != val) {
                return "пароли не совпадают";
              }
            }
          })} />
        {errors?.doublePassword && <p className="error">{errors.doublePassword.message}</p>}
        <label className={style.swimLabel}>Повторите пароль</label>
      </div>

      <input type="submit" className={style.formButton} value="Зарегистрироваться"></input>
      <div className={style.links}>
        <button type="button" className={style.backButton} onClick={secondStepHandler}><Back />Обратно</button>
        <NavLink to="/" className={style.navLink}><Back />Продолжить без регистрации</NavLink>
      </div>
    </form>


  );
}