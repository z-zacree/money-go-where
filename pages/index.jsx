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
import Image from "next/image";
import { useRouter } from "next/router";

// Firebase
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../utils/firebase";

const Home = () => {
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
                }
                router.push("/dashboard");
            })
            .catch(({ code }) => {
                // Handle Errors here.
                console.log(code);
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
                }
                router.push("/dashboard");
            })
            .catch(({ code }) => {
                // Handle Errors here.
                console.log(code);
            });
    };
    return (
        <Container maxwidth="xs">
            <Display>
                <Box sx={{ mt: -10, p: 4, display: "flex", alignItems: "center" }}>
                    <Image src="/icon.svg" width={50} height={50} />
                    <Typography variant="h5" sx={{ ml: 2 }}>
                        Money Go Where?
                    </Typography>
                </Box>
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
};

export default Home;

const Display = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
