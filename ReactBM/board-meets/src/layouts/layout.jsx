import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import { Navbar } from "../components/navbar/navbar";
import style from "./layout.module.css";

export const Layout = (props) => {
    return(
        <>
            <Header/>
            <div className={style.navbar}>
                <Navbar auth={props.auth}/>
            </div>
            <Outlet/>
            <Footer/>
        </>
    );
}