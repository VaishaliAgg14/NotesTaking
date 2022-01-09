import React, { useState } from "react";
import AddNotes from "./AddNotes";

function AddNotesButton(props) {
  const [showNotes, setShowNotes] = useState(true);

  const addNoteHandler = (e) => {
    e.preventDefault();
    setShowNotes((prevShowNotes) => {
      return !prevShowNotes;
    });
  };
  return (
    <div>
      <div className=" py-4">
        {showNotes && (
          <div className=" place-items-center justify-center">
            <div className="text-center">
              <button
                onClick={addNoteHandler}
                className="p-2 pl-5 pr-5 transition-colors duration-700 transform bg-indigo-500 hover:bg-blue-400 text-gray-100 text-lg rounded-lg focus:border-4 border-indigo-300"
              >
                Add Note
              </button>
            </div>
          </div>
        )}
        {!showNotes && (
          <AddNotes userId={props.userId} showNote={addNoteHandler} />
        )}
      </div>
    </div>
  );
}

export default AddNotesButton;
