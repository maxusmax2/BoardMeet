import { NavLink } from "react-router-dom";
import { useData } from "../../hooks/useData";

export const LogIn = ({buttonHandler}) => {
    const userEx = useData("http://192.168.1.56:5057/api/User/4");
    return(
        <input type="button" onClick={buttonHandler(userEx)}></input>
    );
}