// Next
import Head from "next/head";
import { useRouter } from "next/router";

// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

// Components
import Loading from "../loading";
import Layout from "./layout";

const AuthLayout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth),
        router = useRouter(),
        pathname = router.pathname;

    if (pathname === "/" || pathname === "/auth/signIn" || pathname === "/auth/signUp") {
        if (loading) {
            return <Loading />;
        } else if (user) {
            router.push("/dashboard");
            return (
                <Head>
                    <link rel="icon" href="/icon.svg" />
                    <title>MgW</title>
                </Head>
            );
        } else {
            return (
                <>
                    <Head>
                        <link rel="icon" href="/icon.svg" />
                    </Head>
                    {children}
                </>
            );
        }
    } else if (pathname == "/dashboard") {
        if (loading) {
            return <Loading />;
        } else if (user) {
            return (
                <>
                    <Head>
                        <link rel="icon" href="/icon.svg" />
                    </Head>
                    <Layout user={user}>{children}</Layout>
                </>
            );
        } else {
            router.push("/");
            return (
                <Head>
                    <link rel="icon" href="/icon.svg" />
                    <title>MgW</title>
                </Head>
            );
        }
    } else {
        return children;
    }
};

export default AuthLayout;
