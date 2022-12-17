import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FilterMeets } from "../../components/filterMeets/filterMeets";
import { MeetCard } from "../../components/meetCard/meetCard";
import { getConfig } from "../../helpers/getConfig";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./meetsList.module.css";

export const MeetsList = ({ url }) => {
  const [meets,setMeets] = useState();
  const { handleSubmit, register } = useForm();

  let meetList = useDataGet(url + "Meets");
  useEffect(() => {
    if (meetList) {
      setMeets(meetList);
    }
  }, [meetList]);

  const searchHandler = (data) => {
    let body = data.date?{city: data.city,date: data.date}:{city: data.city};
    axios.post(url + "Meets/Search", body, getConfig())
    .then((response) => {
      setMeets(response.data);
     ;
    })
  }
  return (
    <div className={style.container}>
      <FilterMeets register={register} handleSubmit={handleSubmit} searchHandler={searchHandler}/>
      <ul className={style.meetsList}>
        {!!meets?.length && meets.map((meet) =>
          <li key={meet.id} className={style.meetsItem}><MeetCard url={url} meet={meet} /></li>
        )}
      </ul>
    </div>
  );
}