import styles from "./body.module.css";
import Button from "../button/button";
import CreateAlbum from "../createalbum/createalbum";
import imgurl from "../../assets/photos.png";
import { useEffect,useState} from "react";
// import { db } from '../firebase'; // Assuming you have correctly initialized Firebase and exported the `db` instance


const Body=({handleCreate,createBol,clickOnAnyAlbum, toggleSearchBar,albums})=>{
 

    useEffect(()=>{
        if(createBol === true){
            toggleSearchBar(false)
        }
    }, [])
    
    console.log(albums);
    return (
        <mainBody className={styles.mainBody}>
            {(createBol)?<CreateAlbum/>:null}
        <div className={styles.bodyHeader}>
            <div><h2>Your albums</h2></div>
            <Button handleClick={handleCreate} createBol={createBol} name1="add album" name2="cancel"/>
        </div>
        <div className={styles.albumContainer}>
            {albums.map((album) => {
                console.log("----------------------------",album.data.name);

                return (
          <div key={album.id} className={styles.albumitem} onClick={() => clickOnAnyAlbum(album.id,album.data.name)}>
            <div className={styles.imgdiv}><img src={imgurl} className={styles.img} alt="album cover" /></div>
            <p className={styles.text}>{album.data.name}</p>
          </div>
                )
                })}
        </div>
        </mainBody>
    )
}
export default Body;