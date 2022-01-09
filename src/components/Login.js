import React , {useRef , useContext} from "react";
import { signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import {Link} from 'react-router-dom';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';
import UserContext from '../store/user-context';

function Login(props) {
  const ctx = useContext(UserContext)
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  // const googleLoginHandler =() => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth , provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     props.onLogin(true);
  //     // ...
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });
  // }

  const loginHandler =(e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth , emailInputRef.current.value, passwordInputRef.current.value)
    .then( userCredentials => {
      const user = userCredentials;
      props.onLogin(true);
      navigate('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }



  return (
    <div>
      <div className="bg-white font-family-karla h-screen">
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              <p className="text-center text-3xl">Welcome.</p>
              <form
                className="flex flex-col pt-3 md:pt-8"
                onSubmit = {loginHandler}
              >
                <div className="flex flex-col pt-4">
                  <label htmlFor="email" className="text-lg">
                    Email
                  </label>
                  <input
                    ref = {emailInputRef}
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex flex-col pt-4">
                  <label htmlFor="password" className="text-lg">
                    Password
                  </label>
                  <input
                    ref = {passwordInputRef}
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <input
                  type="submit"
                  value="Log In"
                  className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                />
              </form>
              {/* <button
                  onClick = {googleLoginHandler}
                  value="Google SignIn"
                  className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                >Google Signin</button> */}
              <div className="text-center pt-12 pb-12">
                <p>
                  Don't have an account?{" "}
                  <Link to='/register' className="underline font-semibold">
                    Register here.
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 shadow-2xl">
            <img
              className="object-cover w-full h-screen hidden md:block"
              src="https://source.unsplash.com/IXUM4cJynP0"
              alt = ''
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
