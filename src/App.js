import React, { useEffect, useState} from 'react'
import AddNotes from './components/AddNotes';
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
import Folder from './components/Folder';
import ShowFolder from './components/ShowFolder';
import { useFolder } from './hooks/useFolder';
import { useParams} from 'react-router-dom';

function App() {
  const {id} = useParams();
  console.log(id);

  const [isLogin , setIsLogin] = useState(false);
  // const ctx = useContext(UserContext)
  // const isLogin = ctx.isLogin;
  const user = useAuthState(auth);
  // const userId = user?.[0].uid;
  const userDetails = auth.currentUser;

  useEffect(() => {
    if (userDetails?.uid !== null ) {
      setIsLogin(true);
    }
  } , [userDetails])

  return (
    <DndProvider backend={HTML5Backend}>
      <NavBar user = {user} onLogout={(props) => {setIsLogin(props)}} isLogin={isLogin} />
      <Routes>
        <Route path='/register' exact element={user && isLogin ? 
          <div>
          <Folder userId = {userDetails?.uid} />
          <ShowFolder userId = {userDetails?.uid}   />
        </div> : <SignInForm onLogin = {(props) => {setIsLogin(props)}} />} />
        <Route path='/' exact element={user && isLogin ? <div>
          <AddNotes userId = {userDetails?.uid}  />
          <Folder userId = {userDetails?.uid} />
          <ShowFolder userId = {userDetails?.uid} />
        </div> : <Login onLogin = {(props) => {setIsLogin(props)}}  />} /> 
        <Route path='/:id' exact element={
        <div>
          <ShowNotes userId = {userDetails?.uid}  />
        </div>} />
      </Routes>
    </DndProvider>
  );
}
export default App;
