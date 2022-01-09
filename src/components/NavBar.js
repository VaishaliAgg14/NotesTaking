import React from 'react';
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {auth} from '../firebase';
// import UserContext from '../store/user-context';

function NavBar(props) {
    // const ctx = useContext(UserContext)
    const navigate = useNavigate();

    const logOutHandler = () => {
      auth.signOut().then(() => {
        console.log('SignedOut')
        props.onLogout(false);
        navigate('/')
      }).catch(error => {
        console.group(error)
      })
    }
    return (
        <div>
            <nav className="flex items-center justify-between bg-gray-800 h-20 shadow-2xl">
      <div className="logo">
        <h1 className="text-white ml-4 cursor-pointer text-2xl"><Link to='/'>TakeNotes</Link></h1>
      </div>
      <ul className="flex">
        <li>
          <Link className="text-white mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" to='/'><i className="fas fa-home"></i> Home</Link>
        </li>
        <li>
          <a className="text-white mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" ><i className="fas fa-question"></i> About</a>
        </li>
        <li>
          <a className="text-white mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" ><i className="fas fa-reply"></i> Contact</a>
        </li>
        {props.user && props.isLogin && <li>
          <Link to='/' className="text-white mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" ><button onClick = {logOutHandler} className="fas fa-reply"> LogOut</button></Link>
        </li>}
        {!props.user && !props.isLogin && <li>
          <Link to='/' className="text-white mr-4 bg-gray-500 pt-4 p-4 pr-5 pl-5 hover:bg-gray-600 transition-all rounded" ><i className="fas fa-reply"></i> Login</Link>
        </li>}
        
        
      </ul>
    </nav>
        </div>
    )
}

export default NavBar
