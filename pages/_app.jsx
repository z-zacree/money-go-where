// Style
import ThemeConfig from "../styles/index";

// Components
import { AuthLayout, Loading } from "../components";

// Firebase
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function MyApp({ Component, pageProps }) {
    const [user, loading] = useAuthState(auth);
    if (loading) return <Loading />;
    else
        return (
            <ThemeConfig>
                <AuthLayout>
                    <Component {...pageProps} user={user} />
                </AuthLayout>
            </ThemeConfig>
        );
}

export default MyApp;
