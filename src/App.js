import React, { useEffect, useState } from "react";
import {
  Navigate,
  BrowserRouter as Router, 
  Routes, 
  Route,
} from "react-router-dom";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged , signOut} from "firebase/auth";
import './App.css';
import { initializeApp} from "firebase/app";
import CreateUser from "./pages/CreateUser";
import Header from "./components/Header";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import FirebaseConfig from "./components/FirebaseConfig"

function App() {    
  //const Navigate = useNavigate();
  // Track if user is logged in 
  const [loggedIn, setLoggedIn] = useState(false);
  // Check to see if there is any loading...
  const [loading, setLoading] = useState(true);
  // Store user information in state
  const [userInformation, setUserInformation] = useState({});
  const [appInitialized, setAppInitialized] = useState(false);

  useEffect(() => {
    // Initialize Firebase
    initializeApp(FirebaseConfig);
    setAppInitialized(true);
  }, []);

  // Set state accordingly 
  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserInformation(user);
          setLoggedIn(true);
        } else {
          // User is signed out
          setUserInformation({});
          setLoggedIn(false);
        }
        // whenever state chnges setLoaing to false
        setLoading(false);
      });
    }
  }, [appInitialized]);

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() =>{
        setUserInformation({});
        setLoggedIn(false);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  if (loading || !appInitialized) return null;

  return (
    <>
      <Header logout={logout} loggedIn = {loggedIn}/>
      <Router>
        <Routes>
          <Route 
            path="/user/:id" 
            element={loggedIn ? (
              <UserProfile userInformation={userInformation} /> 
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route 
            path="/create" 
            element={
              !loggedIn ? (
                <CreateUser 
                  setLoggedIn={setLoggedIn}
                  setUserInformation={setUserInformation}
                />
              ) : (
                <Navigate to={`/user/${userinformation.uid}`} />
              )
            } 
          />
          <Route 
            path="/" 
            element={
              !loggedIn ? (
              <Login 
                setLoggedIn={setLoggedIn}
                setUserInformation={setUserInformation}
              />
              ) : (
                 <Navigate to={`/user/${userInformation.uid}`} />
              )
            } 
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
