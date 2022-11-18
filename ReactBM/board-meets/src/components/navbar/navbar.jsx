import style from "./navbar.module.css";
import { NavLink } from "react-router-dom";

export const Navbar = (props) => {
    console.log (props.auth);
    let buttonLink = <NavLink to = "/logIn" className = {style.navbar__logInButton}>LogIn</NavLink>;

    if (props.auth){
        buttonLink = 
            <NavLink to = "/user" className = {style.navbar__profileButton}>
                <img alt="user" src="assets/images/User.svg"/>
            </NavLink> 
    }
    
    return(
        <nav className = {style.navbar}>
            <div className = {style.navbar__logo}>
                <img alt="logo" src="assets/images/Logo.svg"/>
            </div>
            <div className = {style.navbar__search}>
                <input type="text" className = {style.navbar__searchInput} placeholder="Search your lover game"></input>
                <button type="button" className = {style.navbar__searchButton}><img alt="search" src="assets/images/Search.svg"/></button>
            </div>
            
            <div className={style.navbar__linkList}>
                <NavLink to = "/meets" className={style.navbar__linkListLink} >Meets</NavLink>
                <NavLink to = "/games" className={style.navbar__linkListLink}>Games</NavLink>
            </div>

            {buttonLink}       
        </nav>
    );
}