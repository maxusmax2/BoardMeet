import style from "./userMainInfo.module.css";
import { useDataGet } from "../../hooks/useDataGet";
import { useState } from "react";
import { FileInput } from "../fileInput/fileInput";
import { City, EditAvatar, Email, UserName } from "../icons/icons";

export const UserMainInfo = ({id,url}) => {
    const [editAvatar,setEditAvatar] = useState(false);
    const user = useDataGet(url + "User/" + id)

    let fileInput = null;
    const editAvatarInputHandler =()=>{
        setEditAvatar(!editAvatar);
    }
    if (editAvatar){
        fileInput = <FileInput/>
    }
    
   
    return(
        <div className={style.mainContainer}>
            <img src = {url + user?.avatarUrl} alt = "userPhoto" className={style.avatar}/>
            <div className={style.container}>
                <button type="button" className={style.editAvatarButton} onClick={()=>{editAvatarInputHandler()}}><EditAvatar/></button>
                <div className={style.userInfoContainer}>
                    <ul className={style.userNameStatus}>
                        <li className={style.userName}>@{user?.userName}</li>
                        <li className={style.userStatus}>{user?.aboutMe}</li>
                        <li>{fileInput}</li>
                    </ul>
                    <ul className={style.userData}>
                        <li className={style.userDataItem}>
                            <UserName/>
                             <p className={style.dataItemText}>{user?.name}</p> 
                        </li>
                        <li className={style.userDataItem}>
                            <Email/>
                            <p className={style.dataItemText}>{user?.email}</p>
                        </li>
                        <li className={style.userDataItem}>
                            <City/>
                            <p className={style.dataItemText}>г.{user?.city}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
