import React , {useEffect} from "react";
import { Link } from "react-router-dom";
import image from "../assets/folder.png";
import { FcFolder} from 'react-icons/fc';
import {BiFolderMinus} from 'react-icons/bi';

function FolderData(props) {
    
        return (
          <div>
            <Link to={`/${props.folder.id}`}>
            <button className="px-4 py-2 rounded-md text-sm font-medium border focus:outline-none focus:ring transition text-yellow-600 border-yellow-600 hover:text-white hover:bg-yellow-600 active:bg-yellow-700 focus:ring-yellow-300" >
                <div className=" flex items-center">
                  <FcFolder size = "50" /> 
                <div className="text-lg">
                {props.folder.data.title}
                </div>
                </div>
                </button>
                {/* <div className="flex justify-center md:justify-end -mt-16 ">
                  <BiFolderMinus onClick={() => {console.log('clicked')}} />
                </div> */}
        </Link>
        </div>
  );
}

export default FolderData;
