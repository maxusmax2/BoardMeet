import style from "./header.module.css";
export const Header = () => {
    
    return(
        <header className = {style.header}>
            <div className = {style.header__logo}>
                <p className = {style.header__name}>board meets</p>
                <p className = {style.header__tagline}>for yor fun)</p>
            </div>
        </header>
    );
}
