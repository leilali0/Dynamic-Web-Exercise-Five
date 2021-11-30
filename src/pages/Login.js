import React, { useCallback } from "react";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import LoginForm from "../components/LoginForm";

function Login(setLoggedIn, setUserInformation ) {
  const loginUser = useCallback((e) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //signed in
        const user = userCredential.user;
        setLoggedIn(true);
        setUserInformation({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          accessToken: user.accessToken,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, [setUserInformation, setLoggedIn]);

  return (
    <div className="PageWrapper">
      <h2>Log in</h2>
      <LoginForm loginUser={loginUser} />
    </div>
  );
}

export default Login;

//