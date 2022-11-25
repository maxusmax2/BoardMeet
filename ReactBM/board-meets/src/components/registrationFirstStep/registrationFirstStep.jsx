import { useNavigate, NavLink} from "react-router-dom";
import style from "./registrationFirstStep.module.css";
import { Back, Write } from "../icons/icons";
import { useForm } from 'react-hook-form';
import axios from "axios";

export const RegistrationFirstStep = ({register,firstStepHandler,handleSubmit,errors}) => {
   
    return(
        <form className={style.form} onSubmit={handleSubmit(firstStepHandler)}>
            <p className={style.formTitle}>Регистрация</p>
            <div className={style.formInput}>
                <label className={style.mandatoryLabel}>Обязательно</label>
                <input
                    className={style.input} 
                    placeholder = " " 
                    {...register("nickname", {
                            required:"введите свой никнейм",
                            pattern:{
                                value:/^([a-zA-z0-9_]{1,23})$/,
                                message: "допустимые символы (A-Z,a-z,0-9,_)"
                            } ,
                            maxLength:{
                                value:15,
                                message: "макс.длина-15"
                            },
                            minLength:{
                                value:3,
                                message: "мин.длина-3"
                            }
                    })}/>
                {errors?.nickname&&<p className="error">{errors.nickname.message}</p>}
                <label className={style.swimLabel}>Nickname</label>
            </div>
            <div  className={style.formInput}>
                <label className={style.mandatoryLabel}>Обязательно</label>
                <input className={style.input}  placeholder = " " {...register("name",{
                    required:"введите свое имя",
                    pattern:{
                        value:/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/,
                        message: "некоррекный ввод"
                    } ,
                    maxLength:{
                        value:23,
                        message: "макс.длина-23"
                    },
                    minLength:{
                        value:2,
                        message: "мин.длина-2"
                    }
                    })}/>
                {errors?.name&&<p className="error">{errors.name.message}</p>}
                <label className={style.swimLabel}>Имя</label>
            </div>
            <div  className={style.formInput}>
                <label className={style.mandatoryLabel}>Обязательно</label>
                <input className={style.input}  placeholder = " " {...register("surname",{
                    required:"введите свою фамилия",
                    pattern:{
                        value:/^([А-Я]{1}[а-яё]{1,30}|[A-Z]{1}[a-z]{1,30})$/,
                        message: "некорректный ввод"
                    } ,
                    maxLength:{
                        value:30,
                        message: "макс.длина-30"
                    },
                    minLength:{
                        value:2,
                        message: "мин.длина-2"
                    }
                    })}/>
                {errors?.surname&&<p className="error">{errors.surname.message}</p>}
                <label className={style.swimLabel}>Фамилия</label>
            </div>
            <div  className={style.formInput}>
                <label className={style.mandatoryLabel}>Обязательно</label>
                <input  className={style.input}  placeholder = " " {...register("aboutMe",{
                    required:"введите информацию о себе",
                    maxLength:{
                        value:40,
                        message: "макс.длина-40"
                    },
                    minLength:{
                        value:3,
                        message: "мин.длина-3"
                    }
                    })}/>
                <label className={style.swimLabel}>Обо мне..</label>
                {errors?.aboutMe&&<p className="error">{errors.aboutMe.message}</p>}
            </div>
            <div  className={style.formInput}>
                <label className={style.mandatoryLabel}>Обязательно</label>
                <input  className={style.input}  placeholder = " " {...register("city",{
                    required:"введите свой город",
                    pattern:{
                        value:/^([a-zA-Zа-яА-ЯёЁ]+[-]?[a-zA-Zа-яА-ЯёЁ]*[-]?[a-zA-Zа-яА-ЯёЁ]*[-]?[a-zA-Zа-яА-ЯёЁ]*)$/,
                        message: "некорректный ввод"
                    } ,
                    maxLength:{
                        value:15,
                        message: "макс.длина-15"
                    },
                    minLength:{
                        value:3,
                        message: "мин.длина-3"
                    }
                    })}/>
                {errors?.city&&<p className="error">{errors.city.message}</p>}
                <label className={style.swimLabel}>Город</label>
            </div>
            <input type="submit" className={style.formButton} value="Продолжить" ></input>
            <div className={style.links}> 
                <NavLink to="/" className={style.navLink}><Back/>Продолжить без регистрации</NavLink>
            </div>
        </form>
           
       
    );
}