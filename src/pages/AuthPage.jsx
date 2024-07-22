import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,  
} from "firebase/auth";


import { useContext, useState, useEffect } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider"; 
import SlideShow from "../components/SlideShow";

export default function AuthPage() {
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("signup");
  const handleShowLogin = () => setModalShow("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try{
      const res = await createUserWithEmailAndPassword(
        auth,
        username, 
        password
      );
      console.log(res.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

    const handleClose = () => setModalShow(null);


    return (
      <div className="min-h-max flex mt-12">
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-4xl">
          <div className="md:flex">
            <div className="w-full p-8 md:w-1/2">
              <h2 className="text-2xl font-semibold text-center text-purple-700">Sign In</h2>
              <form onSubmit={handleLogin}>
                <div className="mt-4">
                  <label className="block text-sm">Enter Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Enter password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-baseline justify-between">
                  <button type="submit" className="px-6 py-2 mt-4 text-white bg-purple-700 rounded-lg hover:bg-purple-800">
                    Sign In
                  </button>
                </div>
              </form>
              <div className="mt-4 flex justify-center">
                <button onClick={handleGoogleLogin} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 flex items-center">
                  <img src="google-logo.png" alt="Google" className="w-4 h-4 mr-2" /> Continue with Google
                </button>
              </div>
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-blue-600 hover:underline" onClick={handleShowSignUp}>
                  First time? Click here to sign up!
                </a>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2 bg-purple-700">
              <SlideShow />
            </div>
          </div>
        </div>
  
        {/* Modal for SignUp */}
        {modalShow && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-6">
                <h2 className="text-2xl font-semibold text-center text-purple-700">Create your account</h2>
                <form onSubmit={handleSignUp}>
                  <div className="mt-4">
                    <label className="block text-sm">Enter Email</label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm">Enter password</label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <button type="submit" className="px-6 py-2 mt-4 text-white bg-purple-700 rounded-lg hover:bg-purple-800">
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="mt-4 text-center">
                  <button className="text-sm text-blue-600 hover:underline" onClick={handleClose}>
                    Already have an account? Sign in!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }