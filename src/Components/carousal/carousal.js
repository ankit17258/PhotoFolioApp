import styles from './carousal.module.css';

const Carousal=({images,showCarousal,index,setIndex})=>{
    console.log(index);

    var forward=()=>{
        var temp=index+1;
        setIndex(temp%images.length);
    }
    var backward=()=>{
        var temp=index-1;
        var len = images.length;
        setIndex((temp + len)%len);
    }
    return(
        <>
         <mainBody className={styles.mainBody}>
         <button className={`${styles.button} ${styles.cross}`} onClick={showCarousal}>x</button>

            <div className={styles.Carousal}>
                <button className={styles.button }onClick={()=>{backward()}}>{"<"}</button>
                <img className={styles.image} src={images[index].url}/>
                <button className={styles.button} onClick={()=>{forward()}} >{">"}</button>
            </div>
        </mainBody>
        </>
    )
}
export default Carousal;