// Next
import Head from "next/head";
import { useRouter } from "next/router";

import { Children } from "react";

// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

// Components
import Loading from "../loading";
import Layout from "./layout";

const AuthLayout = ({ user, fields, children }) => {
    const router = useRouter(),
        pathname = router.pathname;

    if (pathname === "/" || pathname === "/auth/signIn" || pathname === "/auth/signUp") {
        if (user) {
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
    } else if (pathname == "/dashboard" || pathname == "/accounts") {
        if (user) {
            return (
                <>
                    <Head>
                        <link rel="icon" href="/icon.svg" />
                    </Head>
                    <Layout user={user} fields={fields}>
                        {children}
                    </Layout>
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
