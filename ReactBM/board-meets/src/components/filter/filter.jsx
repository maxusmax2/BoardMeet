
import {Location } from "../icons/icons";
import { InputDate } from "../inputDate/inputDate";
import style from "./filter.module.css";
export const Filter = () => {
    
    return(
        <form className = {style.container}>
            <div className={style.inputContainer}>
                <div className={style.inputCity}>
                    <label htmlFor="city" className={style.inputIcon}><Location/></label>
                    <input type="text" id="city" className={style.inputText} placeholder="Введите город"></input>
                </div>
                <InputDate/>
            </div>
            <input type="button" value="Reset" className={style.button}></input>
        </form>
    );
}