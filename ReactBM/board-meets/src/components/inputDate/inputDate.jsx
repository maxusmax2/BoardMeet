import { Date } from "../icons/icons";
import style from "./inputDate.module.css";
export const InputDate = () => {
    
    return(
        <div className={style.container}>
            <label className={style.inputIcon}><Date/></label>
            <input type="date" className={style.date}></input>
        </div>
    );
}
 