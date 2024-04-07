import Navbar from "./Components/Navbar/Navbar";
import styles from "./App.module.css";
import Body from "./Components/body/body";
import Album from "./Components/InsideAlbum/albumheader";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from "./Components/firebase";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [createBol, setCreateBol] = useState(false);
  const [gotoAlbm, setGotoAlbm] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [currentid, setCurrentId] = useState("asd");
  const [images, setImages] = useState([]);
  const [albumname,setAlbumName]=useState("");

  // Fetch albums on component mount
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "photoalbums"));
        const albumsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setAlbums(albumsData);
      } catch (error) {
        console.error("Error getting albums:", error);
      }
    };
    fetchAlbums();
  }, []);//albums

  // Fetch images for the selected album in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'photoalbums', currentid), (snapshot) => {
      if (snapshot.exists()) {
        const albumData = snapshot.data();
        setImages(albumData.photos);
      }
    });

    return () => unsubscribe();
  }, [currentid]);//currentid

  // Function to handle click on any album
  const clickOnAnyAlbum = (id = 1,name) => {
    if (id !== 1) setCurrentId(id);
    setGotoAlbm(!gotoAlbm);
    setAlbumName(name);
  }

  // Function to handle click on create album
  const clickOnCreateAlbum = () => {
    setCreateBol(!createBol);
  }

  return (
    <>
      <ToastContainer />
      <Navbar className={styles.padding} />
      {(gotoAlbm) ? <Album clickOnAnyAlbum={clickOnAnyAlbum} gotoAlbm={gotoAlbm} images={images} currentid={currentid} albumname={albumname}  /> :
        <Body handleCreate={clickOnCreateAlbum} clickOnAnyAlbum={clickOnAnyAlbum} createBol={createBol} gotoAlbm={gotoAlbm} toggleSearchBar={setCreateBol} albums={albums} />}
    </>
  );
}

export default App;
