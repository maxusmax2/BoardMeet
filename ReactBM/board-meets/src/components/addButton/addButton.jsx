import { Plus } from "../icons/icons";
import style from "./addButton.module.css";
export const AddButton = ({clickHandler}) => {

  return (
    <div className={style.button} onClick={clickHandler}>
      <Plus />
    </div>
  );
}
