import style from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { Exit, Logo, Search, User} from "../icons/icons";


export const Navbar = ({user}) => {
    let buttonLink = <NavLink to = "/logIn" className = {style.logInButton}>LogIn</NavLink>;

    if (user){
        buttonLink = 
        <div className={style.buttons}>
            <NavLink to = {`user/${user.id}/${user.role}`} className = {style.profileButton}>
                <User/>
            </NavLink> 
            <button type ="button" className = {style.exitButton} ><Exit/></button>
        </div>
            
    }
    
    return(
        <nav className = {style.container}>
            <div className = {style.logo}>
                <Logo/>
            </div>
            <div className = {style.search}>
                <input type="search" className = {style.searchInput} placeholder="Search your lover game"></input>
                <button type="button" className = {style.searchButton}><Search/></button>
            </div>
            
            <div className={style.linkList}>
                <NavLink to = "/" className={style.linkListLink} >Meets</NavLink>
                <NavLink to = "/games" className={style.linkListLink}>Games</NavLink>
            </div>

            {buttonLink}       
        </nav>
    );
}