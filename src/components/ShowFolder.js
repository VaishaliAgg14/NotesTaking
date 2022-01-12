import React, { useState, useEffect , useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs , onSnapshot } from "firebase/firestore";
import FolderData from "./FolderData";

function ShowFolder(props) {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "folders"),
      (snapshot) => {
        const folderData = [];
        snapshot.forEach((doc) => {
          folderData.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setFolders(folderData);
      },
    );
  
    // Return cleanup function to stop listening to changes
    // on component unmount
    return unsubscribe;
  }, []);

  return (
    <div className="container md:px-4 mx-auto py-10">
      <div className="md:grid lg:grid-cols-6 md:grid-cols-3 mlg:grid-cols-3 md:gap-10 space-y-6 md:space-y-0 px-1 md:px-0 mx-auto">
        {folders.map((folder) => {
          return (
            <div key={folder.id}>
              {folder.data.userId === props.userId && (
                <div>
                  <FolderData key={folder.id} folder={folder} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowFolder;
