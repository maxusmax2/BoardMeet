import style from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { Exit, Logo, Search, User } from "../icons/icons";
import { getUser } from "../../helpers/getUser";


export const Navbar = ({ exitHandler }) => {
  const user = getUser();
  let buttonLink = <NavLink to="/logIn" className={style.logInButton}>Войти</NavLink>;
  if (user!="0"&&user!=undefined) {
    buttonLink =
      <div className={style.buttons}>
        <NavLink to={`user/${user.id}/${user.role}`} className={style.profileButton}>
          <User />
        </NavLink>
        <button type="button" className={style.exitButton} onClick={exitHandler}><Exit /></button>
      </div>

  }

  return (
    <nav className={style.container}>
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.search}>
        <input type="search" className={style.searchInput} placeholder="Найдите свою любимую игру"></input>
        <button type="button" className={style.searchButton}><Search /></button>
      </div>

      <div className={style.linkList}>
        <NavLink to="/" className={style.linkListLink} >Мероприятия</NavLink>
        <NavLink to="/games" className={style.linkListLink}>Игры</NavLink>
      </div>

      {buttonLink}
    </nav>
  );
}