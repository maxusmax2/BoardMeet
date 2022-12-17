import { NavLink, useParams } from "react-router-dom";
import { AddButton } from "../../components/addButton/addButton";
import { MeetCard } from "../../components/meetCard/meetCard";
import { Title } from "../../components/title/title";
import { useDataGet } from "../../hooks/useDataGet";
import style from "./organizationPage.module.css";

export const OrganizationPage = ({ url }) => {

  let { userId } = useParams();

  const meets = useDataGet(url + "Users/CreatedMeet/" + userId);

  return (
    <>
      <div className={style.title}>
        <Title content="Created Meets" />
      </div>

      <NavLink to={`/user/${userId}/createMeet`}> <AddButton /></NavLink>
      <ul className={style.meetsList}>
        {!!meets?.length && meets.map((meet) =>
          <li key={meet.id} className={style.meetsItem}><MeetCard url={url} meet={meet} userId={userId} /></li>
        )}
      </ul>
    </>
  );
}