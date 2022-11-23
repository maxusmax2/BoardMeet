import { useNavigate, NavLink} from "react-router-dom";
import style from "./logIn.module.css";
import { Back, Write } from "../../components/icons/icons";
import { useForm } from 'react-hook-form';
import axios from "axios";

export const LogIn = ({buttonHandler,url}) => {
    const {register,handleSubmit} = useForm();
    const navigate = useNavigate();
   
    const onSubmit = (data) => {
        const body = {email:data.email, password:data.password};
        axios.post(url + "User/Authorize",body)
        .then((response) => {
            console.log(response.data);
            buttonHandler(response.data.authUser,response.data.token);
        })
        .then(()=>navigate("/"))
        .catch((err) => {
            if (err.response) { 
                console.log("a");
            } 
            else if (err.request) { 
                console.log("b");
            } 
            else { 
                console.log("c");
            } 
        });
        

    };


    return(
        <div className={style.container}>
            <div className={style.decoration}></div>
            <div className={style.formContainer}>
                <div className={style.title}>
                    <p className={style.mainTitle}>Board Meets</p>
                    <p className={style.subTitle}>for your fun)</p>
                </div>
                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <p className={style.formTitle}>LogIn</p>
                    <div className={style.formInput}>

                        <label htmlFor="email" className={style.mandatoryLabel}>Mandatory</label>
                        <input type="email" id="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className={style.input} placeholder = " " {...register("email")} required></input>
                        <label className={style.swimLabel} htmlFor="email">Email</label>
                    </div>
                    <div  className={style.formInput}>
                        <label htmlFor="password" className={style.mandatoryLabel}>Mandatory</label>
                        <input type="password" name="password" className={style.input}  placeholder = " " {...register("password")} required></input>
                        <label className={style.swimLabel}  htmlFor="password" >Password</label>
                    </div>
                    <input type="submit" className={style.formButton} value="Continue"></input>
                    <div className={style.links}> 
                        <NavLink to="/" className={style.navLink}><Back/>Continue without registration</NavLink>
                        <NavLink to="/registration" className={style.navLink}><Write fill="black" width="13" height="13"/>Registration</NavLink>
                    </div>
                </form>
            </div>
        </div>
       
    );
}