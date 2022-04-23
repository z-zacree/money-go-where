// React
import { useEffect, useState } from "react";

// Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

// Style
import ThemeConfig from "../styles/index";

// Components
import { AuthLayout, Loading } from "../components";

function MyApp({ Component, pageProps }) {
    const [user, loading] = useAuthState(auth);
    const [fields, setFields] = useState({});

    useEffect(() => {
        if (user && !loading) {
            onSnapshot(doc(firestore, "users", user.uid), (document) => {
                setFields(document.data());
            });
        }
    }, [user, loading]);

    if (user && !loading) {
        if (fields && Object.keys(fields).length > 0) {
            return (
                <ThemeConfig>
                    <AuthLayout user={user} fields={fields}>
                        <Component {...pageProps} user={user} fields={fields} />
                    </AuthLayout>
                </ThemeConfig>
            );
        }
    } else return <Loading />;
}

export default MyApp;
