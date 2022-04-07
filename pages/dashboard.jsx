// Material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// Firebase
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

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
