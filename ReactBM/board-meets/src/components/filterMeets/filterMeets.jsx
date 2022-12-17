import { CityMeet, Date } from "../icons/icons";
import style from "./filterMeets.module.css";
export const FilterMeets = ({url, register, searchHandler, handleSubmit}) => {
  
  return (
    <form className={style.container} onSubmit={handleSubmit(searchHandler)}>
      <div className={style.inputContainer}>
        <div className={style.inputCity}>
          <label htmlFor="city" className={style.inputIcon}><CityMeet /></label>
          <input type="text" id="city" className={style.inputText} placeholder="Введите город" {...register("city")}/>
        </div>
        <div className={style.inputDate}>
          <label className={style.inputIcon}><Date /></label>
          <input type="date" className={style.date} {...register("date")}/>
        </div>
      </div>
      <button className={style.button}>Найти</button>
    </form>
  );
}