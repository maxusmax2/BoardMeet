import style from "./userMainInfo.module.css";
import { useData } from "../../hooks/useData";
import { useState } from "react";
import { FileInput } from "../fileInput/fileInput";

export const UserMainInfo = () => {
    const [editAvatar,setEditAvatar] = useState(false);
    const user = useData("https://jsonplaceholder.typicode.com/users/2");
    let fileInput = null;
    const editAvatarInputHandler =()=>{
        setEditAvatar(!editAvatar);
    }
    if (editAvatar){
        fileInput = <FileInput/>
    }
    
   
    return(
        <div className={style.userMainInfo}>
            <img src = "assets/images/exUser.png" className={style.userMainInfo__avatar}/>
            <div className={style.userMainInfo__container}>
                <button type="button" className={style.userMainInfo__editAvatarButton} onClick={()=>{editAvatarInputHandler()}}><img src="assets/images/EditAvatar.svg" className={style.userMainInfo__editAvatarIcon}/></button>
                <div className={style.userMainInfo__userInfoContainer}>
                    <ul className={style.userMainInfo__userNameStatus}>
                        <li className={style.userMainInfo__userName}>@{user?.username}</li>
                        <li className={style.userMainInfo__userStatus}>{user?.address.street}</li>
                        <li>{fileInput}</li>
                    </ul>
                    <ul className={style.userMainInfo__userData}>
                        <li className={style.userMainInfo__userDataItem}>
                            <img src="assets/images/Username.svg" className={style.UserMainInfo__dataItemIcon}/>
                            {user?.name}
                        </li>
                        <li className={style.userMainInfo__userDataItem}>
                            <img src="assets/images/Email.svg" className={style.UserMainInfo__dataItemIcon}/>
                            {user?.email}
                        </li>
                        <li className={style.userMainInfo__userDataItem}>
                            <img src="assets/images/City.svg" className={style.UserMainInfo__dataItemIcon}/>
                            г.{user?.address.city}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
