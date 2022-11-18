import style from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { Logo, Search, User } from "../icons/icons";


export const Navbar = (props) => {
    console.log (props.auth);
    let buttonLink = <NavLink to = "/logIn" className = {style.navbar__logInButton}>LogIn</NavLink>;

    if (props.auth){
        buttonLink = 
            <NavLink to = "/user/2" className = {style.navbar__profileButton}>
                <User/>
            </NavLink> 
    }
    
    return(
        <nav className = {style.navbar}>
            <div className = {style.navbar__logo}>
                <Logo/>
            </div>
            <div className = {style.navbar__search}>
                <input type="text" className = {style.navbar__searchInput} placeholder="Search your lover game"></input>
                <button type="button" className = {style.navbar__searchButton}><Search/></button>
            </div>
            
            <div className={style.navbar__linkList}>
                <NavLink to = "/meets" className={style.navbar__linkListLink} >Meets</NavLink>
                <NavLink to = "/games" className={style.navbar__linkListLink}>Games</NavLink>
            </div>

            {buttonLink}       
        </nav>
    );
}