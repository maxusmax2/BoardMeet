import { useState } from "react";
import style from "./gameFileInput.module.css";

export const GameFileInput = ({ register, icon, name, message, format, errors, onImageChange = () => { } , required, notFile}) => {
  const [file, setFile] = useState(0);
  const changeHandler = (event) => {
    onImageChange(event.target.files[0]);
    if (!event.target.files[0]) return;
    setFile(event.target.files[0]);
  }
  return (
    <div className={style.container}>
      <input type="file" id={name} name={name} accept={format}  {...register(name, { required: {required}, onChange: changeHandler })} />
      <label htmlFor={name} >
        <div className={errors?.[name] ? style.error : style.chooseBtn}>{icon}</div>
        <div className={style.fileState}>{file == 0 ? notFile : file.name}</div>
      </label>
      <p className={style.message}>{message}</p>
    </div>
  );
}