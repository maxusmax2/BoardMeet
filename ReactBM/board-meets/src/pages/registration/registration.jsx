import { useNavigate, NavLink } from "react-router-dom";
import style from "./registration.module.css";
import { Back, Write } from "../../components/icons/icons";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { RegistrationFirstStep } from "../../components/registrationFirstStep/registrationFirstStep";
import { useState } from "react";
import { RegistrationSecondStep } from "../../components/registrationSecondStep copy/registrationSecondStep";
import { getConfig } from "../../helpers/getConfig";


export const Registration = ({ url, buttonHandler }) => {

    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [regStep, setRegStep] = useState("firstStep");

    const firstStepHandler = () => {
        setRegStep("secondStep");
    }
    const secondStepHandler = () => {
        setRegStep("firstStep");
    }

    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        const body = {
            user: {
                email: data.email,
                userName: data.nickname,
                name: data.name + " " + data.surname,
                role: data.role,
                city: data.city,
                aboutMe: data.aboutMe,
            },
            password: data.password
        }

        axios.post(url + `User/Registration`, body)
            .then((response) => {
                buttonHandler(response.data.authUser, response.data.token);
                navigate(`/user/${response.data.authUser.id}/${response.data.authUser.role}`);
            })
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

    let form = regStep == "firstStep" ? <RegistrationFirstStep register={register} firstStepHandler={firstStepHandler} handleSubmit={handleSubmit} errors={errors} />
        : <RegistrationSecondStep register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} secondStepHandler={secondStepHandler} errors={errors} watch={watch} />;

    return (
        <div className={style.container}>
            <div className={style.decoration}></div>
            <div className={style.formContainer}>
                <div className={style.title}>
                    <p className={style.mainTitle}>Board Meets</p>
                    <p className={style.subTitle}>for your fun)</p>
                </div>

                {form}

            </div>
        </div>

    );
}