import style from "./header.module.css";
export const Header = () => {
    
    return(
        <header className = {style.container}>
            <div className = {style.logo}>
                <p className = {style.name}>board meets</p>
                <p className = {style.tagline}>for yor fun)</p>
            </div>
        </header>
    );
}
 