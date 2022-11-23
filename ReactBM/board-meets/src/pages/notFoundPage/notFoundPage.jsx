
import { NotFound } from "../../components/icons/icons";
import style from "./notFoundPage.module.css";

export const NotFoundPage = () => {
    
    return(
        <div className={style.container}>
            <div className={style.info}>
                <div className={style.title}>
                    <p className={style.mainTitle}>Board Meets</p>
                    <p className={style.subTitle}>for your fun)</p>
                </div>
                <div className={style.notFound}>
                    <NotFound/>
                </div>
                
            </div>
            <div className={style.decoration}></div>
        </div>
    );
}