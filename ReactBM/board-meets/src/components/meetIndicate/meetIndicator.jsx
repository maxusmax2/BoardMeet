import style from "./meetIndicator.module.css";
export const MeetIndicator = ({ meet }) => {
  
  return (
   <div className={meet.state=="Recruiting"?style.green:meet.state=="Finished"?style.red:style.orange}></div>
  );
}