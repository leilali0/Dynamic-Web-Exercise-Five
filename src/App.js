import React, { useEffect, useState, useNavigate } from "react";
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
    });
    setLoading(false);
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

  if (loading) return null;

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
              <></>
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
                <></>
                //<Navigate to={`/User/${userInformation.uid}`} />
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
                 <></>
              )
            } 
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
