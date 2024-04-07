// import styles from "./button.module.css";
import styled from "styled-components";
var Custombutton = styled.div`
    width: fit-content;
    height: 32px;
    background-color: ${props => props.bol!==undefined ? props.bol ?'rgb(255, 231, 229)' : 'rgb(229, 241, 255)' : props.redbol? 'rgb(255,19,0)' : 'rgb(0,119,255)'};
    padding: 2px 5px;
    border: 2px solid ${props => props.bol!==undefined ? props.bol ?'rgb(255,19,0)' : 'rgb(0,119,255)' : props.redbol? 'rgb(255,19,0)' : 'rgb(0,119,255)'};
    
    border-radius: 6px;
    font-size: medium;
    font-family: Arial, Helvetica, sans-serif;
    color:rgb(0,119,255) ;
    cursor: pointer;
    color:${props    => props.bol!==undefined ? props.bol?'rgb(255,19,0)' : 'rgb(0,119,255)'? props.redbol:'rgb(255,255,255)' : 'rgb(255,255,255)'};
    
`;

const Button=({handleClick,createBol,name1,name2,redbol,addImg,showSetting,update,clearInput,addAlbumToFirebase,clearInputImage,addImageToAlbum,updateImage})=>{

    var handleGenuin=()=>{
        if(redbol!==undefined){
            if(redbol){
                if(clearInput!==undefined)clearInput();
                if(clearInputImage!==undefined)clearInputImage();
                return;
            }
            if(!redbol){
                if(addAlbumToFirebase!==undefined){addAlbumToFirebase();return;}
                if(update==="update"){updateImage()}
                else addImageToAlbum();
                return;
            }
        }
        if(createBol!==undefined)handleClick();
        else showSetting();
    }
    console.log(update);
    return (<>
        {
    (addImg !== undefined) ? (
        <Custombutton addImg={addImg} onClick={handleGenuin} bol={addImg}>
            {addImg ? name2 : name1}
        </Custombutton>
    ) : (
        <Custombutton onClick={handleGenuin} bol={createBol} redbol={redbol}>
            {createBol !== undefined ? 
                (createBol ? name2 : name1) : 
                (redbol ? "Clear" : (update === undefined) ? "add" : (update === "update") ? "update" : "add")
            }
        </Custombutton>
    )
}

        
        </>
    )
}
export default Button;