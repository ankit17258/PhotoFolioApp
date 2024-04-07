import styles from './addImg.module.css';
import Button from '../button/button';
import { useEffect, useRef } from 'react';
import { db } from '../firebase';
import { doc, setDoc ,getDoc} from "firebase/firestore"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddImg=({formname,currentid,imagename,imageurl})=>{
    const inputImageName = useRef("");
    const inputUrl = useRef("");
    console.log(imagename)
    var update="";
    const clearInputImage = () => {
        console.log("input cleared");
        inputImageName.current.value = "";
        inputUrl.current.value = "";
    };

    useEffect(()=>{
        if(formname=="add Image"){
        }
        else if(update="update") {
            inputImageName.current.value=imagename;
            inputUrl.current.value=imageurl;
        }
    },[])


    const addImageToAlbum = async () => {
        const imageName = inputImageName.current.value.trim();
        const imageUrl = inputUrl.current.value.trim();

        if (imageName && imageUrl && currentid) {
            try {
                // Get a reference to the album document
                const albumRef = doc(db, 'photoalbums', currentid);
                
                // Get the current data of the album
                const albumDoc = await getDoc(albumRef);
                if (albumDoc.exists()) {
                    const albumData = albumDoc.data();

                    // Update the photos array with the new image
                    const updatedPhotos = [...albumData.photos, { name: imageName, url: imageUrl }];
                    
                    // Update the album document with the updated photos array
                    await setDoc(albumRef, { ...albumData, photos: updatedPhotos });

                    console.log("Image added to album successfully.");
                    
                     toast.success("Added successfully.");
                    clearInputImage();
                } else {
                    console.log("Album does not exist.");
                }
            } catch (error) {
                console.error("Error adding image to album: ", error);
            }
        } else {
            console.log("Image name, URL, or album ID cannot be empty.");
        }
    };
    const updateImage = async () => {
        const imageName = inputImageName.current.value.trim();
        const imageUrl = inputUrl.current.value.trim();
    
        if (imageName && imageUrl && currentid) {
            try {
                // Get a reference to the album document
                const albumRef = doc(db, 'photoalbums', currentid);
                
                // Get the current data of the album
                const albumDoc = await getDoc(albumRef);
                if (albumDoc.exists()) {
                    const albumData = albumDoc.data();
    
                    // Find the index of the image with the matching name
                    const index = albumData.photos.findIndex(image => image.name === imagename);
    
                    if (index !== -1) {
                        // Update the URL of the image
                        albumData.photos[index].name = imageName;
                        albumData.photos[index].url = imageUrl;
    
                        // Update the album document with the updated photos array
                        await setDoc(albumRef, albumData);
    
                        console.log("Image updated successfully.");
                        clearInputImage();
                    } else {
                        console.log("Image not found in the album.");
                    }
                } else {
                    console.log("Album does not exist.");
                }
            } catch (error) {
                console.error("Error updating image in album: ", error);
            }
        } else {
            console.log("Image name, URL, or album ID cannot be empty.");
        }
    };
    
    if(formname=="add Image"){
    }
    else update="update"

    return (
        <>
        <mainBody className={styles.mainBody}>
        <div className={styles.form}>
            <h2>{formname}{}</h2>
            <div className={styles.container}>
                <input className={styles.input} placeholder="Image Name" ref={inputImageName}></input>
                <input className={styles.input}placeholder="Image Url" ref={inputUrl}></input>
            <div className={styles.inputflex}>
                <Button redbol={true} clearInputImage={clearInputImage}/>
                <Button redbol={false} update={update} updateImage={updateImage} addImageToAlbum={addImageToAlbum} />
            </div>
            </div>
            </div>
        </mainBody>
        </>
    )
}
export default AddImg;