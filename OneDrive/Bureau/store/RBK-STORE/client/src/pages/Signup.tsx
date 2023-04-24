import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import axios from 'axios'
import "tailwindcss/tailwind.css";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/login"); 
        //register the newuser into database (customers table)
        axios.post("http://localhost:3000/customers",{name:name,email:email})
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main className="bg-gray-100  flex flex-col justify-center">
      <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <div>
          <div>
            <h1 className="text-3xl font-bold mb-4">Sign up</h1>
            <form>
              <div className="mb-4">
                <label className="block font-medium mb-2">User Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter User Name"
                  className="border-gray-300 border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email-address"
                  className="block font-medium mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className="border-gray-300 border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="border-gray-300 border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                onClick={onSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign up
              </button>
            </form>

            <p className="mt-4">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-blue-500 font-medium hover:underline"
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
