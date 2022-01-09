import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// import { useDrag } from 'react-dnd';

function ShowNotes(props , match) {
  const [notes, setNotes] = useState([]);
  const noteCollectionRef = collection(db, "notes");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(noteCollectionRef);
      setNotes(data.docs.map((doc) => doc.data()));
    };
    getData();
  }, [noteCollectionRef]);

  return (
    <div>
      {notes.map((note) => {
        return (
          <div>
            {note.userId === props.userId && match.params?.folderName === note.folderName && (
              <div key={note.id} className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 text-center">
                {/* <div className="flex justify-center md:justify-end -mt-16">
                <img alt='' className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" />
              </div> */}
                <div>
                  <h2 className="text-gray-800 text-3xl font-semibold">
                    {note.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{note.note}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ShowNotes;
