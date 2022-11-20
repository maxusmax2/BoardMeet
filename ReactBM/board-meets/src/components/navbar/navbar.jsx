import style from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { Logo, Search, User } from "../icons/icons";


export const Navbar = ({auth,user}) => {
    let buttonLink = <NavLink to = "/logIn" className = {style.logInButton}>LogIn</NavLink>;

    if (auth){
        buttonLink = 
            <NavLink to = {`user/${user.id}/${user.role}`} className = {style.profileButton}>
                <User/>
            </NavLink> 
    }
    
    return(
        <nav className = {style.container}>
            <div className = {style.logo}>
                <Logo/>
            </div>
            <div className = {style.search}>
                <input type="text" className = {style.searchInput} placeholder="Search your lover game"></input>
                <button type="button" className = {style.searchButton}><Search/></button>
            </div>
            
            <div className={style.linkList}>
                <NavLink to = "/meets" className={style.linkListLink} >Meets</NavLink>
                <NavLink to = "/games" className={style.linkListLink}>Games</NavLink>
            </div>

            {buttonLink}       
        </nav>
    );
}