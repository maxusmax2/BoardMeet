import { Genre } from "../icons/icons";
import style from "./filterGames.module.css";
export const FilterGames = ({ register, searchHandler, handleSubmit }) => {

  return (
    <form className={style.container} onSubmit={handleSubmit(searchHandler)}>
      <div className={style.selectContainer}>
        <label htmlFor="genre"><Genre width="26" height="26" /></label>
        <select className={style.selectGenre} name="genre" id="genre" {...register("genre")}>
          <option value="Жанр игры">Жанр игры</option>
          <option value="Карточная">Карточная</option>
          <option value="Ролевая">Ролевая</option>
          <option value="Игра с костями">Игра с костями</option>
          <option value="Абстрактная">Абстрактная</option>
          <option value="Словестная (контакт)">Словестная (контакт)</option>
          <option value="Бродилка">Бродилка</option>
        </select>
      </div>
      <button className={style.button}>Найти</button>
    </form>
  );
}