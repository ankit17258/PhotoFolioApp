import styles from "./navbar.module.css";
import imgurl from "../../assets/book.png"

const NavBar=()=>{
    return (
        <div className={styles.nav} onClick={()=>window.location.reload()}>
            <img src={imgurl} className={styles.img}/>
            <span>Photofolio</span>
        </div>
    )
}
export default NavBar;