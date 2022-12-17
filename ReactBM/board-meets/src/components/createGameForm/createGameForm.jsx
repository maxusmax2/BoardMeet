import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getConfig } from "../../helpers/getConfig";
import { AgeInput } from "../ageInput/ageInput";
import { ArtistsInput } from "../artistsInput/artistsInput";
import { AuthorsInput } from "../authorsInput/authorsInput";
import { GameFileInput } from "../gameFileInput/gameFileInput";
import {  FileImg, FileRule, Genre } from "../icons/icons";
import { NameInput } from "../nameInput/nameInput";
import { PlayersInput } from "../playersInput/playersInput";
import { PlayingTimeInput } from "../playingTimeInput/playingTimeInput";
import { PublishersInput } from "../publishersInput/publishersInput";
import style from "./createGameForm.module.css";


export const CreateGameForm = ({ userId, url }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const onImageChange = (img) => {
    setImage(URL.createObjectURL(img));
  }

  const onSubmit = (data) => {
    console.log(data);
    let game = new FormData();
    game.append('rule', data.ruleFile[0]);
    game.append('avatarGame', data.gameImg[0]);
    game.append('Name', data.name);
    game.append('RangeOfPlayersMin', data.minPlayers);
    game.append('RangeOfPlayersMax', data.maxPlayers);
    game.append('GameTime', data.playingTime);
    game.append('AgePlayer', data.age);
    game.append('AuthorId', userId);
    game.append('Genre', data.genre);
    game.append('Artists', data.artists);
    game.append('AuthorsGame', data.authors);
    game.append('Publishers', data.publishers);
    game.append('Description', data.description);
    axios.post(url + "BoardGames", game, getConfig())
      .then(() => navigate(`/games`))
      .catch((err) => {
        if (err.response) { console.log("a"); }
        else if (err.request) { console.log("b"); }
        else { console.log("c"); }
      });
  };
  return (
    <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={style.mainInfoContainer}>
        <div className={style.mainGameInfo}>
          <img className={style.gameImg} src={image ? image : "/assets/images/background.png"} alt="game" />
          <div className={style.gameFilesName}>
            <GameFileInput
              register={register}
              icon={<FileImg />}
              required = {true}
              notFile = "Файл не выбран"
              name="gameImg"
              message="картинка желательно должна быть квадратной"
              format="image/png, image/jpeg"
              errors={errors}
              onImageChange={onImageChange}
            />
            <div className={style.inputContainer}>
              <NameInput register={register} errors={errors} />
            </div>
            <GameFileInput
              register={register}
              icon={<FileRule />}
              name="ruleFile"
              required = {true}
              notFile = "Файл не выбран"
              message="вставьте правила к игре в формате pdf"
              format="application/pdf"
              errors={errors}
            />
            <div className={style.inputContainer}>
              <label htmlFor="genre">
                <Genre width="26" height="26" fill="#057402" />
                <span>Жанр</span>
              </label>
              <select className={style.genreInput} name="genre" id="genre" {...register("genre", { required: true })}>
                <option value="Карточная">Карточная</option>
                <option value="Ролевая">Ролевая</option>
                <option value="Игра с костями">Игра с костями</option>
                <option value="Абстрактная">Абстрактная</option>
                <option value="Словестная (контакт)">Словестная (контакт)</option>
                <option value="Бродилка">Бродилка</option>
              </select>
            </div>
          </div>
        </div>
        <div className={style.gameProp}>
          <PlayingTimeInput register={register} errors={errors} />
          <PlayersInput register={register} errors={errors} />
          <AgeInput register={register} errors={errors} />
          <AuthorsInput register={register} errors={errors} />
          <ArtistsInput register={register} errors={errors} />
          <PublishersInput register={register} errors={errors} />
        </div>
      </fieldset>
      <fieldset className={style.description}>
        <label htmlFor="description">
          Описание игры
          {errors?.description && <span className="error">{errors.description.message}</span>}
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Даже самые простые настольные игры оказывают полезное влияние на любого человека, развивая зрительную память, внимание, сообразительность, логику, воображение и образное мышление. С помощью настольных игр детиначинают по-другому относиться ко многим школьным наукам, которые им ну совсем не нравятся в школе. Математика становится интересным квестом. География превращается в увлекательное путешествие по городам и странам. Иностранные языки через настольную игру изучаются в несколько раз быстрее.Что уж говорить об умении логически мыслить, просчитывать ходы на несколько шагов вперёд, анализировать полученную информацию. Игры помогают также развивать усидчивость и внимательность, стремление двигаться к поставленной цели, преодолевая определенные препятствия и преграды."
          className={style.textDescription}
          {...register("description", {
            required: "Заполните поле",
            maxLength: { value: 1560, message: "Максимум 1560 символов" },
            minLength: { value: 250, message: "Минимум 250 символов" }
          })}
        >
        </textarea>
      </fieldset>

      <button className={style.button}>Создать статью</button>

    </form>
  );
}