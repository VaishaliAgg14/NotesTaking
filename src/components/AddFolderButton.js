import React, { useState } from "react";
import Folder from "./Folder";

function AddFolderButton(props) {
  const [showFolder, setShowFolder] = useState(true);

  const showFolderHandler = (e) => {
    e.preventDefault();
    setShowFolder((prevShowFolder) => {
      return !prevShowFolder;
    });
  };
  return (
    <div>
      <div className=" py-4">
        {showFolder && (
          <div className=" place-items-center justify-center">
            <div className="text-center">
              <button
                onClick={showFolderHandler}
                className="p-2 pl-5 pr-5 transition-colors duration-700 transform bg-indigo-500 hover:bg-blue-400 text-gray-100 text-xl rounded-lg focus:border-4 border-indigo-300"
              >
                Add Folder
              </button>
            </div>
          </div>
        )}
        {!showFolder && (
          <Folder userId={props.userId} showFolderHandler={showFolderHandler} />
        )}
      </div>
    </div>
  );
}

export default AddFolderButton;
