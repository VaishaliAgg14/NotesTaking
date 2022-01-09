import React  , {useState , useEffect , useRef}from 'react';
import {auth} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


const UserContext = React.createContext({
    isLogin: false,
    userId: '',
    userNameFunc: () => {},
    onLogin: () => {},
    onLogout: () => {},
})

export const UserContextProvider = (props) => {
    const [isLogin , setIsLogin] = useState(false);
    const user = useAuthState(auth);
    let userId;
    useEffect(() => {
        if (!user?.[0] === null) {
            userId = user?.[0].uid;
            setIsLogin(true);
            console.log(userId)
        }
    } , [user])

    const loginHandler = () => {
        setIsLogin(true);
    }

    const logoutHandler = () => {
        setIsLogin(false);
    }

    return(
        <UserContext.Provider value={{isLogin:{isLogin}, userId:{userId} , onLogin:{loginHandler}, onLogout:{logoutHandler}}} > 
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;