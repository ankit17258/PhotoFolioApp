

import styles from './albumheader.module.css';
import Button from '../button/button';
import backurl from '../../assets/back.png'
import searchurl from '../../assets/search.png';
import AddImg from '../addImg/addImg';
import deleturl from '../../assets/trash-bin.png'
import editurl from '../../assets/edit.png'
import styled from '../images/images.module.css';
import Carousal  from '../carousal/carousal';
import { useEffect, useState } from 'react';
import { setDoc,doc,getDoc} from "firebase/firestore";
import { db } from '../firebase';
import { toast } from 'react-toastify';

const Album=({clickOnAnyAlbum,currentid,images,albumname})=>{
    var [addImg,setaddImg]=useState(false);
    var [editImg,seteditImg]=useState(false);
    var [imagename,setImageName]=useState("");
    var [imageurl,setImageUrl]=useState("");
    var [carousal,setShowCarousal]=useState(false);
    var [index,setIndex]=useState();
    var [show,setShow]=useState(false);
    var [filteredArray,setFilteredArray]=useState(images);
    var [toggle,setToggle]=useState(false);

    useEffect(()=>{
        setFilteredArray(images);
    },[images])

    var sortImage=(e)=>{
        var str=e.target.value;
        var temp=[];
        for(var image of images){
            if(image.name.toLowerCase().includes(str.toLowerCase()))temp.push(image);
        }
        setFilteredArray(temp);
    }

    const funcShow=()=>{
        setShow(!show);
    }

    const deleteImageFromAlbum = async (imageNameToDelete) => {
        try {
            const albumRef = doc(db, 'photoalbums', currentid);
    
            // Get the current data of the album
            const albumDoc = await getDoc(albumRef);
            if (albumDoc.exists()) {
                const albumData = albumDoc.data();
    
                // Find the index of the image to delete by its name
                const imageIndexToDelete = albumData.photos.findIndex(image => image.name === imageNameToDelete);
    
                if (imageIndexToDelete !== -1) {
                    // Remove the image from the photos array
                    const updatedPhotos = [...albumData.photos];
                    updatedPhotos.splice(imageIndexToDelete, 1);
    
                    // Update the album document with the updated photos array
                    await setDoc(albumRef, { ...albumData, photos: updatedPhotos });
                    toast.success("Deleted successfully");
                    console.log("Image deleted");
    
                    // Update the local state to reflect the deletion
                    const updatedFilteredArray = filteredArray.filter(image => image.name !== imageNameToDelete);
                    setFilteredArray(updatedFilteredArray);
                } else {
                    console.log("Image not found in the album.");
                }
            } else {
                console.log("Album does not exist.");
            }
        } catch (error) {
            console.error("Error deleting image from album", error);
        }
    };
    
    

    var  showEditingSetting=(name,url)=>{
        
        setImageName(name);
        setImageUrl(url);
        seteditImg(!editImg);
        setaddImg(false);
    }
    var  showSetting=()=>{
        setaddImg(!addImg);
        seteditImg(false);
    }
    var showCarousal=(index)=>{
        setIndex(index)
        setShowCarousal(!carousal);
    }
   
    return (
        <>
        {(addImg)?<AddImg formname="add Image" currentid={currentid} imagename={imagename} imageurl={setImageUrl}/>:null}
        {(editImg)?<AddImg formname="update Image" imagename={imagename} imageurl={imageurl} currentid={currentid}/>:null}
        <mainBody className={styles.mainBody}>
            <div className={styles.header}>
               <div className={styles.left}>
                    <img src={backurl} className={styles.icon} onClick={()=> clickOnAnyAlbum()}/>
                    <h2>Images in {albumname} album</h2>
               </div>
               <div className={styles.right}>
                    <input className={`${styles.input} ${(show)?styles.show:null}`} onChange={sortImage}/>
                    <img src={searchurl} className={styles.icon} onClick={()=>funcShow()}/>
                    <Button  addImg={addImg} showSetting={showSetting} name1="add Img" name2="cancel"/>
                </div>
            </div>
        <div className={styled.imgContainer}>

        {filteredArray.map((image,index) => {
            return (
                <div className={styled.imgDiv}>
                    <img src={image.url} style={{height:160,width:300}} onClick={()=>showCarousal(index)} onChange={(e)=>sortImage(e)}></img>
                    <img src={deleturl} className={styled.indimg} onClick={()=>deleteImageFromAlbum(image.name)} />
                    <img src={editurl} editImg={editImg} className={styled.indimg} onClick={() => showEditingSetting(image.name, image.url)}/>
                    <p className={styled.p}>{image.name}</p>
                </div>
            );
        })}
        </div>
        {carousal?<Carousal images={filteredArray} setIndex={setIndex} index={index}showCarousal={showCarousal}/>:null}
            
        </mainBody>
        </>
    )
}
export default Album;