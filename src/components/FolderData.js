import React , {useEffect} from "react";
import { Link } from "react-router-dom";
import image from "../assets/folder.png";
import { FcFolder} from 'react-icons/fc';

function FolderData(props) {
    
        return (
            <div className=''>
            <Link to={`/${props.folder.id}`}>
            <button class="px-4 py-2 rounded-md text-sm font-medium border focus:outline-none focus:ring transition text-orange-600 border-orange-600 hover:text-white hover:bg-orange-600 active:bg-orange-700 focus:ring-orange-300" >
                <div className="items-center flex justify-center"><FcFolder /> 
                <div>
                {props.folder.data.title}
                </div>
                </div>
                </button>
        </Link>
        </div>
  );
}

export default FolderData;
