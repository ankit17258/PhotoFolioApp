import styles from './createalbum.module.css'
import { db } from '../firebase'; // Assuming you have correctly initialized Firebase and exported the `db` instance
import { toast } from 'react-toastify';
import { collection, addDoc,onSnapshot } from "firebase/firestore";
import { useState, useEffect, useRef } from 'react';
import Button from '../button/button';
import 'react-toastify/dist/ReactToastify.css';

const CreateAlbum = () => {
    const [albums, setAlbums] = useState([]);
    const inputRef = useRef("");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "photoalbums"), (snapshot) => {
            const albumsData = [];
            snapshot.forEach((doc) => {
                albumsData.push({ id: doc.id, ...doc.data() });
            });
            setAlbums(albumsData);
        });
        return () => unsubscribe();
    }, []);

    const clearInput = () => {
        console.log("input cleared");
        inputRef.current.value = "";
    };

    const addAlbumToFirebase = async () => {
        const albumName = inputRef.current.value.trim();
        if (albumName) {
            try {
                // Check if album name already exists
                const existingAlbum = albums.find(album => album.name === albumName);
                if (existingAlbum) {
                    toast.error("Album name already in use.");
                } else {
                    const albumDocRef = await addDoc(collection(db, "photoalbums"), {
                        name: albumName,
                        photos: [],
                    });
                    const albumId = albumDocRef.id;
                    console.log("Document written with ID: ", albumId);
                    inputRef.current.value = "";
                    toast.success("Album Added successfully.");
                    window.location.reload();
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        } else {
            console.log("Album name cannot be empty.");
        }
    };

    return (
        <main className={styles.mainBody}>
            <div className={styles.form}>
                <h2>Create an album</h2>
                <div className={styles.container}>
                    <div className={styles.inputflex}>
                        <input className={styles.input} placeholder="Album Name" ref={inputRef}></input>
                        <Button redbol={true} clearInput={clearInput} />
                        <Button redbol={false} addAlbumToFirebase={addAlbumToFirebase} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateAlbum;
