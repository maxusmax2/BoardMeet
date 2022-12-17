import { useState } from "react";
import { MeetMainInfo } from "../meetMainInfo/meetMainInfo";
import { MeetMoreInfo } from "../meetMoreInfo/meetMoreInfo";
import style from "./meetCard.module.css";
export const MeetCard = ({ meet, url, userId, role }) => {

  const [moreInfo, setMoreInfo] = useState(false);

  let moreInfoSection = null;
  if (moreInfo) {
    moreInfoSection = <MeetMoreInfo meet={meet} userId={userId} url={url} role={role} />;
  }

  const moreInfoHandler = () => {
    setMoreInfo(!moreInfo);
  }

  return (
    <>
      <div className={style.container}>
        <MeetMainInfo moreInfoHandler={moreInfoHandler} url={url} meet={meet} />
        {moreInfoSection}
      </div>
    </>
  );
}