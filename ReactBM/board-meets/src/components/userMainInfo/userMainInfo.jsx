import style from "./userMainInfo.module.css";
import { useData } from "../../hooks/useData";
import { useState } from "react";
import { FileInput } from "../fileInput/fileInput";
import { City, EditAvatar, Email, UserName } from "../icons/icons";

export const UserMainInfo = (props) => {
    const [editAvatar,setEditAvatar] = useState(false);
    const user = useData("https://jsonplaceholder.typicode.com/users/"+props.id);
    const img = useData("https://jsonplaceholder.typicode.com/photos/"+props.id);

    let fileInput = null;
    const editAvatarInputHandler =()=>{
        setEditAvatar(!editAvatar);
    }
    if (editAvatar){
        fileInput = <FileInput/>
    }
    
   
    return(
        <div className={style.userMainInfo}>
            <img src = {img?.url} className={style.userMainInfo__avatar}/>
            <div className={style.userMainInfo__container}>
                <button type="button" className={style.userMainInfo__editAvatarButton} onClick={()=>{editAvatarInputHandler()}}><EditAvatar/></button>
                <div className={style.userMainInfo__userInfoContainer}>
                    <ul className={style.userMainInfo__userNameStatus}>
                        <li className={style.userMainInfo__userName}>@{user?.username}</li>
                        <li className={style.userMainInfo__userStatus}>{user?.address.street}</li>
                        <li>{fileInput}</li>
                    </ul>
                    <ul className={style.userMainInfo__userData}>
                        <li className={style.userMainInfo__userDataItem}>
                            <UserName/>
                            <p className={style.UserMainInfo__dataItemText}>{user?.name}</p>
                        </li>
                        <li className={style.userMainInfo__userDataItem}>
                            <Email/>
                            <p className={style.UserMainInfo__dataItemText}>{user?.email}</p>
                        </li>
                        <li className={style.userMainInfo__userDataItem}>
                            <City/>
                            <p className={style.UserMainInfo__dataItemText}>г.{user?.address.city}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
