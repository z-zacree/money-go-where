// React
import { useState } from "react";

// Components
import SignIn from "../components/auth/signIn";
import SignUp from "../components/auth/signUp";

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    return isSignIn ? <SignIn setState={setIsSignIn} /> : <SignUp setState={setIsSignIn} />;
};

export default Auth;
