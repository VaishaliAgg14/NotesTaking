import {useReducer , useEffect} from 'react';
import {db} from '../firebase';
import  {collection} from 'firebase/firestore';


const ACTIONS = {
    SELECT_FOLDER: 'select-folder'
}

const reducer = (state , action) => {
    switch (action.type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: action.payload.folderId,
                childNotes: []
            }
    }
}

export function useFolder(folderId = null ) {
    const [state , dispatch] = useReducer(reducer , {
        folderId , 
        childNotes:[]
    } )

    useEffect(() => {
        dispatch({type: ACTIONS.SELECT_FOLDER , payload:{
            folderId : folderId,
        }})

    } , [folderId])

    return state;

}