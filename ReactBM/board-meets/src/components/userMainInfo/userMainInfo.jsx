import style from "./userMainInfo.module.css";
import { useData } from "../../hooks/useData";
import { useState } from "react";
import { FileInput } from "../fileInput/fileInput";
import { City, EditAvatar, Email, UserName } from "../icons/icons";

export const UserMainInfo = ({id}) => {
    const [editAvatar,setEditAvatar] = useState(false);
    const user = useData("http://192.168.1.56:5057/api/User/" + id)
    const img = useData("https://jsonplaceholder.typicode.com/photos/"+id); //Это заглушка 

    let fileInput = null;
    const editAvatarInputHandler =()=>{
        setEditAvatar(!editAvatar);
    }
    if (editAvatar){
        fileInput = <FileInput/>
    }
    
   
    return(
        <div className={style.mainContainer}>
            <img src = {img?.url} alt = "userPhoto" className={style.avatar}/>
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
                             <p className={style.dataItemText}>{user?.userName}</p> {/*тут должен быть фио */}
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
