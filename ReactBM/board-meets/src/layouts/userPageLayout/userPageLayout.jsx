import { Outlet, useParams } from "react-router-dom";
import { UserMainInfo } from "../../components/userMainInfo/userMainInfo";
import style from "./userPageLayout.module.css";

export const UserPageLayout = () => {

    let {userId} = useParams();

    return(
        <div className={style.container}>
            <UserMainInfo id = {userId}/>
            <Outlet/>
        </div>
    );
}