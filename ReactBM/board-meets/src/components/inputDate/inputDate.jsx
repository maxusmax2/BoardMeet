import style from "./inputDate.module.css";
export const InputDate = () => {
    
    return(
        <div className={style.container}>
            <input type="date" className={style.date}></input>
        </div>
    );
}
 