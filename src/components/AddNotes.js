import React, { useState, useContext } from "react";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import UserContext from "../store/user-context";

function AddNotes(props) {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [folderName, setFolderName] = useState("");
  const [showNotes, setShowNotes] = useState(true);

  const showNoteFormHandler = () => {
    setShowNotes((prevShowNotes) => {
      return !prevShowNotes;
    });
  };

  const addNoteHandler = async (e) => {
    e.preventDefault();
    const folderData = await db
      .collection("folders")
      .where("title", "==", folderName)
      .get();
    const folderId = folderData.docs[0].id;
    await db.collection("notes").add({
      userId: props.userId,
      title: title,
      note: note,
      folderName: folderName,
      folderId: folderId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log('added a note')
    setNote("");
    setTitle("");
    setFolderName("");
    showNoteFormHandler();
  };
  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const noteChangeHandler = (e) => {
    setNote(e.target.value);
  };

  const folderNameChangeHandler = (e) => {
    setFolderName(e.target.value);
  };

  return (
    <div>
      <div>
        <div className=" py-4">
          {showNotes && (
            <div className=" place-items-center justify-center">
              <div className="text-center">
                <button
                  onClick={showNoteFormHandler}
                  className="p-2 pl-5 pr-5 transition-colors duration-700 transform bg-indigo-500 hover:bg-blue-400 text-gray-100 text-xl rounded-lg focus:border-4 border-indigo-300"
                >
                  Add Note
                </button>
              </div>
            </div>
          )}
          {!showNotes && (
            <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 bg-white border-b border-gray-200">
                    <form onSubmit={addNoteHandler}>
                      <div className="mb-4">
                        <label className="text-xl text-gray-600">
                          Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          onChange={titleChangeHandler}
                          type="text"
                          className="border-2 border-gray-300 p-2 w-full"
                          name="title"
                          id="title"
                          value={title}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-xl text-gray-600">
                          Folder Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          onChange={folderNameChangeHandler}
                          type="text"
                          className="border-2 border-gray-300 p-2 w-full"
                          name="name"
                          id="name"
                          value={folderName}
                          required
                        />
                      </div>
                      <div className="mb-8">
                        <div className="w-full flex flex-col mt-8">
                          <label className="text-xl text-gray-600">
                            Content
                            <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            value={note}
                            onChange={noteChangeHandler}
                            type="text"
                            className=" border-2 border-gray-500 h-40 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex p-1">
                        <button
                          type="submit"
                          className="p-3 bg-blue-500 text-white hover:bg-blue-400"
                          required
                        >
                          Add Note
                        </button>
                        <div className="px-3">
                          <button
                            onClick={showNoteFormHandler}
                            className="p-3 border-2 border-blue-300 text-blue-400 hover:bg-blue-100"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddNotes;
