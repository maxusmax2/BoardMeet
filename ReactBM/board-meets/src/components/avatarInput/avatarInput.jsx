import axios from "axios";
import { useState } from "react";
import { getConfig } from "../../helpers/getConfig";
import { FileImg } from "../icons/icons";
import style from "./avatarInput.module.css";

export const AvatarInput = ({ url, userId }) => {
  const [file, setFile] = useState(0);
  const changeHandler = (event) => {
    if (!event.target.files[0]) return;
    setFile(event.target.files[0]);
  }
  const submitHandler = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append('file', file);
    axios.post(url + `Users/SaveAvatar/${userId}`, data, getConfig())
      .then(() => window.location.reload())
      .catch((err) => {
        if (err.response) { console.log("a"); }
        else if (err.request) { console.log("b"); }
        else { console.log("c"); }
      });
  }
  return (
    <form className={style.container} onSubmit={submitHandler}>
      <input type="file" id="file" name="file" onChange={changeHandler} accept="image/jpeg, image/png" />
      <label htmlFor="file">
        <div className={style.chooseBtn}><FileImg /></div>
        <div className={style.fileState}>{file == 0 ? "Файл не выбран" : file.name}</div>
      </label>
      <button className={style.submitButton}>Отправить</button>
    </form>
  );
}