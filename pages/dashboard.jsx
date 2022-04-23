// Next
import Head from "next/head";

// Material
import Button from "@mui/material/Button";

// Firebase
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const Dashboard = ({ user }) => {
    return (
        <>
            <Head>
                <meta name="description" content="Dashboard of Money go where" />
                <title>MgW | Dashboard</title>
            </Head>
            <Button variant="outlined" onClick={() => signOut(auth)}>
                Log Out
            </Button>
        </>
    );
};

export default Dashboard;
