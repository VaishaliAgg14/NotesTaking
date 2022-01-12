import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs , doc , deleteDoc , onSnapshot } from "firebase/firestore";
import {useParams} from 'react-router-dom';
import {RiDeleteBin6Line} from 'react-icons/ri';
// import { useDrag } from 'react-dnd';

function ShowNotes(props) {
  const {folderId} = useParams();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "notes"),
      (snapshot) => {
        const noteData = [];
        snapshot.forEach((doc) => {
          noteData.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setNotes(noteData);
      },
    );
  
    // Return cleanup function to stop listening to changes
    // on component unmount
    return unsubscribe;
  }, []);

  const deleteNoteHandler = async (id) => {
    console.log('deleting')
    const note = doc(db , "notes" , id)
    await deleteDoc(note)
  }
  return (
    <div className="container md:px-4 mx-auto py-10">
      <div className="md:grid lg:grid-cols-3 md:grid-cols-2 mlg:grid-cols-3 md:gap-10 space-y-6 md:space-y-0 px-1 md:px-0 mx-auto">
      {notes.map((note) => {
        return (
          <div>
            {note.data.userId === props.userId && note.data.folderId === folderId && (
              
              <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 ">
                <div className="flex justify-center md:justify-end -mt-16">
                  <button onClick = {() => deleteNoteHandler(note.id)}>
                <RiDeleteBin6Line size="1.5em" />
                </button>
              </div>
                <div>
                  <h2 className="text-gray-800 text-3xl font-semibold">
                    {note.data.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{note.data.note}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default ShowNotes;
