import { Outlet } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { Navbar } from "../../components/navbar/navbar";
import style from "./mainLayout.module.css";

export const MainLayout = ({auth,user}) => {
    return(
        <>
        <div className={style.wrap}>
            <Header/>
            <div className={style.navbar}>
                <Navbar auth={auth} user = {user}/>
            </div>
            <div className={style.outlet}>
                <Outlet/>
            </div>
        </div>
            <Footer/>
        </>
    );
}