import { NavLink, useParams } from "react-router-dom";
import { AddButton } from "../../components/addButton/addButton";
import { MeetCard } from "../../components/meetCard/meetCard";
import { MeetList } from "../../components/meetList/meetList";
import { Title } from "../../components/title/title";
import { getUser } from "../../helpers/getUser";
import { useCheckAuthorization } from "../../hooks/useCheckAuthorization";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./organizationPage.module.css";

export const OrganizationPage = ({ url }) => {

  let { userId } = useParams();
  const user = getUser();
  useCheckAuthorization(user?.id, userId);

  return (
    <>
      <div className={style.title}>
        <Title content="Created Meets" />
      </div>
      <NavLink to={`/user/${userId}/createMeet`}> <AddButton /></NavLink>
      <MeetList url={url} meetUrl={url + "Users/CreatedMeet/" + userId}/>
    </>
  );
}