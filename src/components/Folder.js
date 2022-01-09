import React, { useState } from "react";
import { db } from "../firebase";


function Folder(props , currentFolder) {
  const [folderName, setFolderName] = useState("");
  const folderAddHandler = async (e) => {
    e.preventDefault();
    await db.collection("folders").add({
      title: folderName,
      userId: props.userId,
      childNotes: []
    });
    setFolderName("");
  };

  const folderNameChangeHandler = (e) => {
      setFolderName(e.target.value)
  }

  return (
    <div>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <form onSubmit={folderAddHandler}>
                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    FolderName <span className="text-red-500">*</span>
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
                <div className="flex p-1">
                  <button
                    type="submit"
                    className="p-3 bg-blue-500 text-white hover:bg-blue-400"
                    required
                  >
                    Add Folder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Folder;
