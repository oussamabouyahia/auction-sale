import React, { useState,useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';



const Login = () => {
  const { setContextEmail } = useContext(UserContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setContextEmail(email);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/store');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <main className="bg-gray-100 flex justify-center items-center ">
        <section className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>

            <form className="mt-8 space-y-6">
              
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={onLogin}
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              No account yet?{' '}
              <NavLink
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
