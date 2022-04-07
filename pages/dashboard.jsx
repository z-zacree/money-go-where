// Material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// Firebase
import { auth } from "../utils/firebase";
import { signOut, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export function getServerSideProps(context) {
    // if (auth.currentUser) {
    //     return {
    //         props: {}, // will be passed to the page component as props
    //     };
    // } else {
    //     return {
    //         redirect: {
    //             destination: "/",
    //             permanent: false,
    //         },
    //     };
    // }
    return {
        props: {}, // will be passed to the page component as props
    };
}

const Dashboard = (props) => {
    return (
        <Box>
            <Button variant="outlined" onClick={() => signOut(auth)}>
                Log Out
            </Button>
        </Box>
    );
};

export default Dashboard;
