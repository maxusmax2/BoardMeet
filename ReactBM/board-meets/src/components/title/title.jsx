import style from "./title.module.css";
export const Title = ({ content }) => {

  return (
    <div className={style.container}>
      <p className={style.content}>{content}</p>
    </div>
  );
}