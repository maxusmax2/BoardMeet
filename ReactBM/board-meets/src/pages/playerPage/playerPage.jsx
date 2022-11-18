import { useParams } from "react-router-dom";
import { UserMainInfo } from "../../components/userMainInfo/userMainInfo";

export const PlayerPage = () => {
    let {id} =useParams();
    return(
        <>
        <UserMainInfo id = {id}/>
        </>
    );
}