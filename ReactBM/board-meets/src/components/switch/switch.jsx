import { useState } from "react";
import style from "./switch.module.css";
export const Switch = ({ radioHandler }) => {
  const [check, setCheck] = useState("1");
  const inputHandler = (event) => {
    let value = event.target.value;
    setCheck(value);
    { radioHandler(value) }
  }

  return (
    <div className={style.container}>
      <div className={style.item}>
        <input type="radio" id="radio-1" name="item" value="1" checked={check == 1 ? "checked" : null} onChange={inputHandler}></input>
        <label htmlFor="radio-1">Созданные</label>
      </div>
      <div className={style.item}>
        <input type="radio" id="radio-2" name="item" value="2" checked={check == 2 ? "checked" : null} onChange={inputHandler}></input>
        <label htmlFor="radio-2">Добавленные</label>
      </div>
    </div>
  );
}
