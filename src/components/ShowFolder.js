import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, docs } from "firebase/firestore";
import { useParams } from "react-router";
import FolderData from "./FolderData";

function ShowFolder(props) {
  const [folders, setFolders] = useState([]);
  const folderRef = collection(db, "folders");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(folderRef);
      const folderData = data.docs.map((doc) => {
        return { id: doc.id, data: doc.data() };
      });
      console.log(folderData);
      setFolders(folderData);
    };
    getData();
  }, []);

  return (
    <div className="container md:px-4 mx-auto py-10">
      <div className="md:grid lg:grid-cols-11 md:grid-cols-2 mlg:grid-cols-3 md:gap-10 space-y-6 md:space-y-0 px-1 md:px-0 mx-auto">
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
