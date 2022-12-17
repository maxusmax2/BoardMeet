import { Rules } from "../icons/icons";
import style from "./description.module.css";

export const Description = ({game, url}) => {
  return (
    <div className={style.wrapper}>
      <p className={style.title}>Описание</p>
      <p className={style.content}>{game?.description}</p>
      <a className={style.rulesFile} href={url + game?.rule} target="_blank" rel="noopener noreferrer">
        <Rules/>
        <p className={style.rulesIcon}>Правила игры</p>
      </a>
    </div>

  )
}