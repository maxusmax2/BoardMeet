import { useState } from "react";
import style from "./switch.module.css";
export const Switch = (props) => {
    const [check,setCheck] = useState(1);

    const radioHandler = (event) => {
        setCheck(event.target.value);
        {props.radioHandler(check)}
    }

    return(
        <div className = {style.container}>
            <div className = {style.item}>
                <input type="radio" id="radio-1" name="item" value="1" checked = {check == 1?"checked":null} onClick = {radioHandler}></input>
                <label htmlFor="radio-1">{props.label1}</label>
            </div>
            <div className = {style.item}>
                <input type="radio" id="radio-2" name="item" value="2" checked = {check == 2?"checked":null} onClick= {radioHandler}></input>
                <label htmlFor="radio-2">{props.label2}</label>
            </div>
        </div>
    );
}
