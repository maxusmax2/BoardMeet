import style from "./navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Exit, Logo, Search, User } from "../icons/icons";
import { getUser } from "../../helpers/getUser";
import { useState } from "react";


export const Navbar = ({ exitHandler }) => {
  const user = getUser();
  const[search,setSearch] = useState("")
  const navigate = useNavigate();

  let buttonLink = <NavLink to="/logIn" className={style.logInButton}>Войти</NavLink>;

  if (user != "0" && user != undefined) {
    buttonLink =
      <div className={style.buttons}>
        <NavLink to={`user/${user.id}/${user.role}`} className={style.profileButton}>
          <User />
        </NavLink>
        <button type="button" className={style.exitButton} onClick={exitHandler}><Exit /></button>
      </div>
  }

  const searchHandler = () => {
    if(search){
    navigate(`/games/${search}`);
    }
    else navigate(`/games/null`);
  }

  return (
    <nav className={style.container}>
      <div className={style.logo}>
        <NavLink to={"/"}>
          <Logo />
        </NavLink>
      </div>
      <div className={style.search}>
        <input type="search" className={style.searchInput} placeholder="Найдите свою любимую игру"  onChange={(e)=>setSearch(e.target.value)}></input>
        <button type="button" className={style.searchButton} onClick={searchHandler}><Search /></button>
      </div>

      <div className={style.linkList}>
        <NavLink to="/" className={({isActive})=>isActive?style.linkActive:style.linkListLink} >Мероприятия</NavLink>
        <NavLink to="/games" className={({isActive})=>isActive?style.linkActive:style.linkListLink}>Игры</NavLink>
      </div>

      {buttonLink}
    </nav>
  );
}