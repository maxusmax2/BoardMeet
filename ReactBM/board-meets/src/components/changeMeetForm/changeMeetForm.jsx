import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { getDateFormat, getTime } from "../../helpers/date";
import { getConfig } from "../../helpers/getConfig";
import { useDataGet } from "../../hooks/useDataGet";
import { CityMeet, Communication, Date, LightMaxTime, LightPlayers, Location, MinusButton, PlusButton, Time, Write } from "../icons/icons";
import style from "./changeMeetForm.module.css";


export const ChangeMeetForm = ({ url, meet }) => {
  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm();
  const [gameList, setGameList] = useState();
  const [playerList, setPlayerList] = useState();
  useEffect(() => {
    if (meet != null) {
      setGameList(JSON.parse(meet.games));
      setPlayerList(meet.players);
      setValue("name", meet.name);
      setValue("players", meet.peopleCountMax);
      setValue("maxTime", meet.duration);
      setValue("date", getDateFormat(meet.date));
      setValue("time", getTime(meet.date));
      setValue("location", meet.location);
      setValue("communication", meet.link);
      setValue("city", meet.city);
    }
  }, [meet]);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    meet.author = null;
    meet.name = data.name;
    meet.peopleCountMax = data.players;
    meet.duration = data.maxTime;
    meet.link = data.communication;
    meet.date = data.date + "T" + data.time;
    meet.location = data.location;
    meet.city = data.city;
    meet.players = playerList;
    meet.games = `${JSON.stringify(gameList)}`;
    axios.put(url + `Meets/${meet.id}`, meet, getConfig())
      .then(() => navigate(`/`))
      .catch((err) => {
        if (err.response) { console.log("a"); }
        else if (err.request) { console.log("b"); }
        else { console.log("c"); }
      });
  };

  const plusGameButtonHandler = () => {
    const game = getValues("game");
    if (game && gameList.indexOf(game) == -1) {
      setGameList([...gameList, game]);
    }
  }

  const minusGameButtonHandler = (value) => {
    setGameList(gameList.filter(p => p !== value));
  }

  const minusPlayerButtonHandler = (value) => {
    setPlayerList(playerList.filter(p => p.id !== value));
  }
  return (
    <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.mainInfo}>
        <div className={style.namePlayersTime}>

          <label className={style.inputLabel} htmlFor="name">Название мероприятия</label>
          <div className={style.inputName} id="name">
            <label className={style.inputIcon} htmlFor="name"><Write /></label>
            <input type="text" id="name" className={style.input} placeholder="Название мероприятия" {...register("name", {
              required: "введите название мероприятия",
              maxLength: {
                value: 20,
                message: "макс.длина-20"
              },
              minLength: {
                value: 5,
                message: "мин.длина-5"
              }
            })} />
            {errors?.name && <p className="error">{errors.name.message}</p>}
          </div>

          <label className={style.inputLabel} htmlFor="playersTime">Кол-во игроков и продолжительность(мин.)</label>
          <div className={style.playersTime} id="playersTime">
            <div className={style.inputPlayers}>
              <label className={style.inputIcon} id="players"><LightPlayers /></label>
              <input type="number" id="players" className={style.input} placeholder="10" {...register("players", {
                required: "введите число",
                pattern: {
                  value: /^\d+$/,
                  message: "введите целое число"
                },
                max: {
                  value: 250,
                  message: "макс.значение-250"
                },
                min: {
                  value: 1,
                  message: "мин.значение-1"
                }
              })} />
              {errors?.players && <p className="error">{errors.players.message}</p>}
            </div>
            <div className={style.inputMaxTime}>
              <label className={style.inputIcon} htmlFor="maxTime"><LightMaxTime /></label>
              <input type="text" id="maxTime" className={style.input} placeholder="1" {...register("maxTime", {
                required: "введите число",
                pattern: {
                  value: /^\d+$/,
                  message: "введите число"
                },
                max: {
                  value: 1200,
                  message: "макс.значение-1200"
                },
                min: {
                  value: 10,
                  message: "мин.значение-10"
                }
              })} />
              {errors?.maxTime && <p className="error">{errors.maxTime.message}</p>}
            </div>
          </div>

        </div>
        <div className={style.verticalLine}></div>
        <div className={style.dateTimeLocation}>
          <label className={style.inputLabel}>Время и место проведения</label>
          <div className={style.dateTime}>
            <div className={style.inputDate}>
              <label className={style.inputIcon} htmlFor="date"><Date /></label>
              <input type="date" id="date" className={style.date} {...register("date", {
                required: "выберите дату"
              })} />
              {errors?.date && <p className="error">{errors.date.message}</p>}
            </div>
            <div className={style.inputTime}>
              <label className={style.inputIcon} htmlFor="time"><Time /></label>
              <input type="time" id="time" className={style.time} {...register("time", {
                required: "выберите время"
              })} />
              {errors?.time && <p className="error">{errors.time.message}</p>}
            </div>
          </div>
          <div className={style.inputCity}>
            <label className={style.inputIcon} htmlFor="city"><CityMeet /></label>
            <input type="text" id="city" className={style.input} placeholder="Владимир" {...register("city", {
              required: "напишите город",
              maxLength: {
                value: 25,
                message: "макс.длина-25"
              }
            })} />
            {errors?.city && <p className="error">{errors.city.message}</p>}
          </div>
          <div className={style.inputLocation}>
            <label className={style.inputIcon} htmlFor="location"><Location /></label>
            <input type="text" id="location" className={style.input} placeholder="ул.Лакина, д.171, кв. 15" {...register("location", {
              required: "напишите место",
              maxLength: {
                value: 25,
                message: "макс.длина-25"
              }
            })} />
            {errors?.location && <p className="error">{errors.location.message}</p>}
          </div>
        </div>
      </div>
      <div className={style.moreInfo}>
        <div className={style.communicationGames}>
          <div className={style.communication}>
            <label className={style.inputGreenLabel}>Ссылка для связи)))</label>
            <div className={style.communicationInput}>
              <label className={style.inputIcon} htmlFor="communication"><Communication /></label>
              <input type="text" id="communication" className={style.input} placeholder="https://t.me/channelname" {...register("communication", {
                maxLength: {
                  value: 25,
                  message: "макс.длина-25"
                }
              })} />
              {errors?.communication && <p className="error">{errors.communication.message}</p>}
            </div>
            <ul className={style.gamesList}>
              <label className={style.inputGreenLabel}>Участники</label>
              {playerList?.length==0?"Участников пока нет":null}
              {playerList?.length != 0 && playerList?.length && playerList.map((player) =>
                <li key={player.id} className={style.gameItem}>
                  <button type="button" className={style.minusButton} onClick={() => minusPlayerButtonHandler(player.id)}><MinusButton /></button>
                  <NavLink to={`/user/${player.id}`}>@{player.userName}</NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className={style.games}>
            <label className={style.inputGreenLabel}>Какие игры будут?</label>
            <div className={style.gamesInput}>
              <label className={style.inputIcon} htmlFor="game"><button type="button" className={style.plusButton} onClick={plusGameButtonHandler}><PlusButton /></button></label>
              <input type="text" id="game" className={style.input} placeholder="Название игры" maxLength="25"   {...register("game")} />
            </div>
            <ul className={style.gamesList}>
              {gameList?.length != 0 && gameList?.length && gameList.map((game) =>
                <li key={gameList.indexOf(game)} className={style.gameItem}>
                  <button type="button" className={style.minusButton} onClick={() => minusGameButtonHandler(game)}><MinusButton /></button>
                  {game}
                </li>
              )}
            </ul>
          </div>
        </div>
        <button className={style.buttonCreateMeet}>Изменить</button>
      </div>
    </form>
  );
}