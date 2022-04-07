// Next
import Head from "next/head";
import { useRouter } from "next/router";

// React
import { useEffect } from "react";

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

    if (pathname == "/" || pathname == "/auth") {
        if (loading) {
            return <Loading />;
        } else if (user) {
            router.push("/dashboard");
            return (
                <Head>
                    <meta name="content" content="money-go-where" />
                    <link rel="icon" href="/icon.svg" />
                </Head>
            );
        } else {
            return (
                <>
                    <Head>
                        <meta name="content" content="money-go-where" />
                        <link rel="icon" href="/icon.svg" />
                    </Head>
                    {children}
                </>
            );
        }
    } else {
        if (loading) {
            return <Loading />;
        } else if (user) {
            return (
                <>
                    <Head>
                        <meta name="content" content="money-go-where" />
                        <link rel="icon" href="/icon.svg" />
                    </Head>
                    <Layout>{children}</Layout>
                </>
            );
        } else {
            router.push("/");
            return (
                <Head>
                    <meta name="content" content="money-go-where" />
                    <link rel="icon" href="/icon.svg" />
                </Head>
            );
        }
    }
};

export default AuthLayout;
