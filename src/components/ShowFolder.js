import React , {useState , useEffect} from 'react';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {Link} from 'react-router-dom';
import image from '../assets/folder.png';
import ShowNotes from './ShowNotes';

function ShowFolder(props) {
    const [ folders , setFolders] = useState([]);
    const folderRef = collection(db, 'folders')

    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(folderRef);
            setFolders(data.docs.map((doc) => doc.data()));
            console.log(folders)
        }
        getData()
    } , [])

    return (
        <div>
            {folders.map((folder) => {
                return (
                    <div>
                    {folder.userId === props.userId && 
                    <div>
                        <Link to = {`/${folder.id}`}>
                        <figure >    
                        <button><img alt = '' src={image} height="150" width="90" /></button>
                        <figcaption>{folder.title}</figcaption>
                        </figure>
                        </Link>
                        </div>
                     }
                    </div>
            )})}
        </div>
    )
}

export default ShowFolder
