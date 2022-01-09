import React, { useEffect, useState} from 'react'
import AddNotesButton from './components/AddNotesButton';
import Login from './components/Login';
import SignInForm from './components/SignInForm';
import ShowNotes from './components/ShowNotes';
import NavBar from './components/NavBar';
import { Routes, Route} from "react-router-dom";
// import { UserContextProvider } from './store/user-context'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from './firebase';

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import FolderButton from './components/AddFolderButton';
import ShowFolder from './components/ShowFolder';
// import { useFolder } from './hooks/useFolder';
import { useParams , useRouteMatch} from 'react-router-dom';

function App() {
  

  const [isLogin , setIsLogin] = useState(false);
  // const ctx = useContext(UserContext)
  // const isLogin = ctx.isLogin;
  const user = useAuthState(auth);
  // const userId = user?.[0].uid;
  const userDetails = auth.currentUser;

  useEffect(() => {
    if(userDetails?.uid !== undefined) {
      setIsLogin(true)
    }
  } , [userDetails?.uid]);

  return (
    <div>
    <DndProvider backend={HTML5Backend}>
      <NavBar user = {user} onLogout={(props) => {setIsLogin(props)}} isLogin={isLogin} />
      <Routes>
      <Route path="/:folderId" exact element = {<ShowNotes userId = {userDetails?.uid} />} />
        <Route path='/register' exact element={user && isLogin ? 
          <div>
            <AddNotesButton userId = {userDetails?.uid}  />
          <FolderButton userId = {userDetails?.uid} />
          <ShowFolder userId = {userDetails?.uid}  />
        </div> : <SignInForm onLogin = {(props) => {setIsLogin(props)}} />} />
        <Route path='/' exact element={user && isLogin ? <div>
          <AddNotesButton userId = {userDetails?.uid}  />
          <FolderButton userId = {userDetails?.uid} />
          <ShowFolder userId = {userDetails?.uid}  />
        </div> : <Login onLogin = {(props) => {setIsLogin(props)}}  />} /> 
      </Routes>
    </DndProvider>
    </div>
  );
}
export default App;