import style from "./userMainInfo.module.css";
import { useDataGet } from "../../hooks/useDataGet";
import { useState } from "react";
import { AvatarInput } from "../avatarInput/avatarInput";
import { City, EditAvatar, Email, UserName } from "../icons/icons";
import { getUser } from "../../helpers/getUser";

export const UserMainInfo = ({ id, url }) => {
	const [editAvatar, setEditAvatar] = useState(false);
	const user = useDataGet(url + "Users/" + id)
	
	let fileInput = null;
	let btnEdit = null;

	const editAvatarInputHandler = () => {
		setEditAvatar(!editAvatar);
	}
	if (user?.id == getUser()?.id){
		btnEdit = 	<button type="button" className={style.editAvatarButton} onClick={() => { editAvatarInputHandler() }}><EditAvatar /></button>;
	}
	if (editAvatar) {
		fileInput = <AvatarInput userId={id} url={url}/>
	}


	return (
		<div className={style.mainContainer}>
			<img src={url + user?.avatarUrl} alt="userPhoto" className={style.avatar} />
			<div className={style.container}>
				{btnEdit}
				<div className={style.userInfoContainer}>
					<ul className={style.userNameStatus}>
						<li className={style.userName}>@{user?.userName}</li>
						<li className={style.userStatus}>{user?.aboutMe}</li>
						<li>{fileInput}</li>
					</ul>
					<ul className={style.userData}>
						<li className={style.userDataItem}>
							<UserName />
							<p className={style.dataItemText}>{user?.name}</p>
						</li>
						<li className={style.userDataItem}>
							<Email />
							<p className={style.dataItemText}>{user?.email}</p>
						</li>
						<li className={style.userDataItem}>
							<City />
							<p className={style.dataItemText}>г.{user?.city}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
