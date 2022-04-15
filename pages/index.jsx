// Next
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Icon from "../public/icon.svg";

// Firebase
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, firestore } from "../utils/firebase";
import { fDate } from "../utils/date";

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
                        categories: {
                            expenses: [
                                "Food & Beverage",
                                "Bills & Utilities",
                                "Transportation",
                                "Shopping",
                                "Entertainment",
                                "Friends & Family",
                                "Travel",
                                "Health & Fitness",
                                "Gifts & Donations",
                                "Education",
                                "Investments",
                                "Business",
                                "Insurances",
                                "Withdrawals",
                                "Loans",
                                "Others",
                            ],
                            income: ["Salary", "Gifts", "Sales", "Awards", "Investments", "Deposits", "Debt Collection", "Others"],
                        },
                        accounts: {
                            wallet: {
                                balance: 10,
                                transactions: [
                                    {
                                        amount: 10,
                                        category: ["Starting Balance"],
                                        createdAt: Timestamp.fromDate(new Date()),
                                        notes: `wallet created on ${fDate(new Date())} with a starting balance of 0`,
                                    },
                                ],
                            },
                        },
                    });
                }
                router.push("/dashboard");
            })
            .catch(async ({ code, customData }) => {
                // Handle Errors here.
                if (code == "auth/account-exists-with-different-credential") {
                    const methods = await fetchSignInMethodsForEmail(auth, customData.email);
                    console.log(methods);
                }
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
                        categories: {
                            expenses: [
                                "Food & Beverage",
                                "Bills & Utilities",
                                "Transportation",
                                "Shopping",
                                "Entertainment",
                                "Friends & Family",
                                "Travel",
                                "Health & Fitness",
                                "Gifts & Donations",
                                "Education",
                                "Investments",
                                "Business",
                                "Insurances",
                                "Withdrawals",
                                "Loans",
                                "Others",
                            ],
                            income: ["Salary", "Gifts", "Sales", "Awards", "Investments", "Deposits", "Debt Collection", "Others"],
                        },
                        accounts: {
                            wallet: {
                                balance: 10,
                                transactions: [
                                    {
                                        amount: 10,
                                        category: ["Starting Balance"],
                                        createdAt: Timestamp.fromDate(new Date()),
                                        notes: `wallet created on ${fDate(new Date())} with a starting balance of 0`,
                                    },
                                ],
                            },
                        },
                    });
                }
                router.push("/dashboard");
            })
            .catch(async ({ code, customData }) => {
                // Handle Errors here.
                if (code == "auth/account-exists-with-different-credential") {
                    const methods = await fetchSignInMethodsForEmail(auth, customData.email);
                    if (methods[0] == "google.com") handleGoogle();
                }
            });
    };
    return (
        <>
            <Head>
                <meta name="description" content="Choose which authentication provider to log in with" />
                <title>MgW | Login</title>
            </Head>
            <Container maxwidth="xs">
                <Display>
                    <Box sx={{ mt: -10, p: 4, display: "flex", alignItems: "center" }}>
                        <IconContainer>
                            <Icon />
                        </IconContainer>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Typography variant="h5" sx={{ pl: 1 }}>
                            Money Go Where?
                        </Typography>
                    </Box>
                    <Stack direction="column" spacing={2} sx={{ width: 300 }}>
                        <Link href="/auth/signIn" passHref>
                            <EmailButton variant="contained" startIcon={<EmailIcon />} fullWidth>
                                <Typography>Continue using Email</Typography>
                            </EmailButton>
                        </Link>

                        <GoogleButton variant="contained" startIcon={<GoogleIcon />} onClick={handleGoogle} fullWidth>
                            <Typography>Continue using Google</Typography>
                        </GoogleButton>
                        <GithubButton variant="contained" startIcon={<GitHubIcon />} onClick={handleGithub} fullWidth>
                            <Typography>Continue using Github</Typography>
                        </GithubButton>
                    </Stack>
                </Display>
            </Container>
        </>
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
    backgroundColor: "rgb(208, 2, 27)",
    ":hover": {
        backgroundColor: "rgba(208, 2, 27, 0.7)",
    },
}));

const GoogleButton = styled(Button)(({ theme }) => ({
    width: 300,
    height: 40,
    textTransform: "none",
    color: "black",
    backgroundColor: "rgb(255, 255, 255)",
    ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
}));

const GithubButton = styled(Button)(({ theme }) => ({
    width: 300,
    height: 40,
    textTransform: "none",
    color: "white",
    backgroundColor: "rgb(36, 41, 46)",
    ":hover": {
        backgroundColor: "rgba(36, 41, 46, 0.9)",
    },
}));

const IconContainer = styled(Box)(({ theme }) => ({
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 8,
}));
