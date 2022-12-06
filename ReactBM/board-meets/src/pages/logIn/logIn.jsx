import { useNavigate, NavLink} from "react-router-dom";
import style from "./logIn.module.css";
import { Back, Write } from "../../components/icons/icons";
import { useForm } from 'react-hook-form';
import axios from "axios";

export const LogIn = ({buttonHandler,url}) => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate();
   
    const onSubmit = (data) => {
        const body = {email:data.email, password:data.password};
        axios.post(url + "User/Authorize", body)
        .then((response) => {
            console.log(response.data);
            buttonHandler(response.data.authUser, response.data.token);
        })
        .then(()=>navigate("/"))
        .catch((err) => {
            if (err.response) { console.log("a");} 
            else if (err.request) { console.log("b");} 
            else { console.log("c");} 
        });
    };

    return(
        <div className = {style.container}>
            <div className = {style.decoration}></div>
            <div className = {style.formContainer}>
                <div className = {style.title}>
                    <p className = {style.mainTitle}>Board Meets</p>
                    <p className = {style.subTitle}>for your fun)</p>
                </div>
                <form className = {style.form} onSubmit = {handleSubmit(onSubmit)}>
                    <p className = {style.formTitle}>Вход</p>
                    <div className = {style.formInput}>

                        <label className = {style.mandatoryLabel}>Обязательно</label>
                        <input type = "email"  className = {style.input} placeholder = " " {...register("email",{
                            required:"введите свой email",
                            pattern:{
                                value:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "email введ некорректно"
                                } 
                            })}/>
                        {errors?.email&&<p className = "error">{errors.email.message}</p>}
                        <label className = {style.swimLabel}>Email</label>
                    </div>
                    <div className = {style.formInput}>
                        <label className = {style.mandatoryLabel}>Обязательно</label>
                        <input type = "password" className = {style.input}  placeholder = " " {...register("password",{
                            required:"введите свой пароль"
                            })}/>
                        {errors?.password&&<p className = "error">{errors.password.message}</p>}
                        <label className = {style.swimLabel}>Пароль</label>
                    </div>
                    <input type="submit" className = {style.formButton} value="Вход"></input>
                    <div className={style.links}> 
                        <NavLink to="/" className = {style.navLink}><Back/>Продолжить без регистрации</NavLink>
                        <NavLink to="/registration" className = {style.navLink}><Write fill = "black" width = "13" height = "13"/>Регистрация</NavLink>
                    </div>
                </form>
            </div>
        </div>
       
    );
}