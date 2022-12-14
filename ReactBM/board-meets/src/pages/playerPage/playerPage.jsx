import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AddButton } from "../../components/addButton/addButton";
import { MeetList } from "../../components/meetList/meetList";
import { Switch } from "../../components/switch/switch";
import { getUser } from "../../helpers/getUser";
import { useCheckAuthorization } from "../../hooks/useCheckAuthorization";
import style from "./playerPage.module.css";

export const PlayerPage = ({ url }) => {

  let { userId } = useParams();
  const user = getUser();
  useCheckAuthorization(user?.id, userId)

  const [typeMeet, setTypeMeet] = useState({ type: "Created", url: url + "Meets/CreatedMeet/" + userId });

  let linkAdd = null;

  if (typeMeet.type === "Created") {
    linkAdd =
      <NavLink to={`/user/${userId}/createMeet`}> <AddButton /></NavLink>
  }

  const radioHandler = (value) => {
    switch (value) {
      case "1":
        setTypeMeet({ type: "Created", url: url + "Meets/CreatedMeet/" + userId });
        break;
      case "2":
        setTypeMeet({ type: "Joined", url: url + "Meets/JoinedMeet/" + userId });
        break;
    }
  }
  return (
    <>
      <div className={style.switch}>
        <Switch radioHandler={radioHandler} />
      </div>
      {linkAdd}
      <MeetList meetUrl={typeMeet.url} url={url} />
    </>
  );
}