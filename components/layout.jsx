// Firebase
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const layout = ({ children }) => {
    const [user] = useAuthState(auth);
    return user ? <>{children}</> : <>{children}</>;
};

export default layout;
