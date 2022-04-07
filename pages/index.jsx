// Material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Firebase
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../utils/firebase";

const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    const handleGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async ({ user }) => {
                // The signed-in user info.
                const docRef = await getDoc(doc(firestore, "users", user.uid));
                if (!docRef.exists()) {
                    setDoc(doc(firestore, "users", user.uid), {
                        displayName: user.displayName,
                    });
                    router.push("/dashboard");
                }
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode);
            });
    };

    const handleGithub = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then(async ({ user }) => {
                // The signed-in user info.
                const docRef = await getDoc(doc(firestore, "users", user.uid));
                if (!docRef.exists()) {
                    setDoc(doc(firestore, "users", user.uid), {
                        displayName: user.displayName,
                    });
                    router.push("/dashboard");
                }
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode);
            });
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    } else if (user) {
        router.push("/dashboard");
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    } else {
        return (
            <Container maxwidth="xs">
                <Display>
                    <Stack direction="column" spacing={2} sx={{ width: 300 }}>
                        <EmailButton variant="contained" startIcon={<EmailIcon />} fullWidth>
                            <Link href="/auth">
                                <a>
                                    <Typography color="white">Continue using Email</Typography>
                                </a>
                            </Link>
                        </EmailButton>
                        <GoogleButton variant="contained" startIcon={<GoogleIcon />} onClick={handleGoogle} fullWidth>
                            <Typography>Continue using Google</Typography>
                        </GoogleButton>
                        <GithubButton variant="contained" startIcon={<GitHubIcon />} onClick={handleGithub} fullWidth>
                            <Typography>Continue using Github</Typography>
                        </GithubButton>
                    </Stack>
                </Display>
            </Container>
        );
    }
};

export default Home;

const Display = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

const EmailButton = styled(Button)(({ theme }) => ({
    width: 300,
    height: 40,
    textTransform: "none",
    color: "white",
    backgroundColor: "rgb(219, 68, 55)",
    ":hover": {
        backgroundColor: "rgba(219, 68, 55, 0.6)",
    },
}));

const GoogleButton = styled(Button)(({ theme }) => ({
    width: 300,
    height: 40,
    textTransform: "none",
    color: "black",
    backgroundColor: "rgb(255, 255, 255)",
    ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
    },
}));

const GithubButton = styled(Button)(({ theme }) => ({
    width: 300,
    height: 40,
    textTransform: "none",
    color: "white",
    backgroundColor: "rgb(36, 41, 46)",
    ":hover": {
        backgroundColor: "rgba(36, 41, 46, 0.6)",
    },
}));
