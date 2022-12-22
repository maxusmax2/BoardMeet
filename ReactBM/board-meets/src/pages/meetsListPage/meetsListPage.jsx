import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FilterMeets } from "../../components/filterMeets/filterMeets";
import { MeetCard } from "../../components/meetCard/meetCard";
import { MeetsContext } from "../../helpers/meetsContext";
import { getConfig } from "../../helpers/getConfig";
import { useDataGet } from "../../hooks/useDataGet";

import style from "./meetsListPage.module.css";

export const MeetsListPage = ({ url }) => {
  const [meets, setMeets] = useState();
  const { handleSubmit, register } = useForm();

  let meetList = useDataGet(url + "Meets");
  useEffect(() => { if (meetList) { setMeets(meetList); } }, [meetList]);

  const searchHandler = (data) => {
    let body = data.date ? { city: data.city, date: data.date } : { city: data.city };
    axios.post(url + "Meets/Search", body, getConfig())
      .then((response) => {
        setMeets(response.data);
      })
  }

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
    <MeetsContext.Provider value={{ deleteMeet, changeMeet }}>
      <div className={style.container}>
        <FilterMeets register={register} handleSubmit={handleSubmit} searchHandler={searchHandler} />
        <ul className={style.meetsList}>
          {!!meets?.length && meets.map((meet) =>
            <li key={meet.id} className={style.meetsItem}><MeetCard url={url} meet={meet} /></li>
          )}
        </ul>
      </div>
    </MeetsContext.Provider>
  );
}