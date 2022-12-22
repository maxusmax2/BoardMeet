import { useEffect, useState } from "react";
import { MeetsContext } from "../../helpers/meetsContext";
import { useDataGet } from "../../hooks/useDataGet";
import { MeetCard } from "../meetCard/meetCard";
import style from "./meetList.module.css";

export const MeetList = ({ meetUrl, url }) => {
  const [meets, setMeets] = useState();
  const meetList = useDataGet(meetUrl);
  useEffect(() => { if (meetList) setMeets(meetList) }, [meetList]);

  const userPage = true;

  const deleteMeet = (meet) => {
    setMeets(meets.filter(elem => elem.id !== meet.id));
  }
  const changeMeet = (meet) => {
    setMeets(
      meets.map(elem => {
        if (elem.id === meet.id) {
          return meet;
        }
        return elem;
      }
      )
    );
  }
 
  return (
    <MeetsContext.Provider value={{ deleteMeet, changeMeet, userPage  }}>
      <ul className={style.meetsList}>
        {!!meets?.length ? meets.map((meet) =>
          <li key={meet.id} className={style.meetsItem}><MeetCard meet={meet} url={url} /></li>
        ) : <p className={style.notFound}>Мероприятия не найдены 👽</p>}
      </ul>
    </MeetsContext.Provider>
  );
}