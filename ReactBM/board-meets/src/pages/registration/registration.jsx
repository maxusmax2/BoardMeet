import { useNavigate, NavLink} from "react-router-dom";
import style from "./registration.module.css";
import { Back, Write } from "../../components/icons/icons";
import { useForm } from 'react-hook-form';
import axios from "axios";

export const Registration = ({buttonHandler,url}) => {
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
                    <p className={style.formTitle}>Registration</p>
                    <div className={style.formInput}>

                        <label htmlFor="nickname" className={style.mandatoryLabel}>Mandatory</label>
                        <input  id="nickname" name="nickname"  className={style.input} placeholder = " " {...register("nickname")} required></input>
                        <label className={style.swimLabel} htmlFor="nickname">Nickname</label>
                    </div>
                    <div  className={style.formInput}>
                        <label htmlFor="name" className={style.mandatoryLabel}>Mandatory</label>
                        <input  name="name" className={style.input}  placeholder = " " {...register("name")} required></input>
                        <label className={style.swimLabel}  htmlFor="name" >Name</label>
                    </div>
                    <div  className={style.formInput}>
                        <label htmlFor="surname" className={style.mandatoryLabel}>Mandatory</label>
                        <input name="surname" className={style.input}  placeholder = " " {...register("surname")} required></input>
                        <label className={style.swimLabel}  htmlFor="surname" >Surname</label>
                    </div>
                    <div  className={style.formInput}>
                        <label htmlFor="aboutMe" className={style.mandatoryLabel}>Mandatory</label>
                        <input  name="aboutMe" className={style.input}  placeholder = " " {...register("aboutMe")} required></input>
                        <label className={style.swimLabel}  htmlFor="aboutMe" >About Me</label>
                    </div>
                    <div  className={style.formInput}>
                        <label htmlFor="city" className={style.mandatoryLabel}>Mandatory</label>
                        <input  name="city" className={style.input}  placeholder = " " {...register("city")} required></input>
                        <label className={style.swimLabel}  htmlFor="city" >City</label>
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