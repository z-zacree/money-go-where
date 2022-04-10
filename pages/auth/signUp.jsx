// React
import { useState } from "react";

// Next
import Head from "next/head";
import Link from "next/link";

// Material UI
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../utils/firebase";
import { useRouter } from "next/router";

const SignUp = () => {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");
        const displayName = data.get("displayName");

        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                setDoc(doc(firestore, "users", user.uid), {
                    displayName: displayName,
                });

                updateProfile(user, {
                    displayName: displayName,
                });
                router.push("/dashboard");
            })
            .catch(({ code: errorCode }) => {
                if (errorCode == "auth/invalid-email" || errorCode == "auth/email-already-in-use") {
                    setEmailError(true);
                    setPasswordError(false);
                }
                if (errorCode == "auth/wrong-password" || errorCode == "auth/weak-password") {
                    setEmailError(false);
                    setPasswordError(true);
                }
                if (errorCode == "auth/internal-error") {
                    setEmailError(true);
                    setPasswordError(true);
                }
            });
    };

    const handleBack = () => {
        router.push("/");
    };

    return (
        <>
            <Head>
                <meta name="description" content="Sign up with Money Go Where using email and password" />
                <title>MgW | Sign Up</title>
            </Head>
            <IconButton sx={{ mt: 4, ml: { xs: 2, sm: 4 } }} onClick={handleBack} aria-label="Back to log in options">
                <ArrowBackIcon />
            </IconButton>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "blackAndWhite.contrast.default" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CustomTextField name="displayName" label="Display Name" autoComplete="family-name" fullWidth autoFocus />
                            </Grid>
                            <Grid item xs={12}>
                                {emailError ? (
                                    <CustomTextField
                                        name="email"
                                        label="Email Address"
                                        autoComplete="email"
                                        required
                                        fullWidth
                                        error
                                        helperText="The email you have entered is invalid"
                                    />
                                ) : (
                                    <CustomTextField name="email" label="Email Address" autoComplete="email" required fullWidth />
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {passwordError ? (
                                    <CustomTextField
                                        name="password"
                                        label="Password"
                                        autoComplete="new-password"
                                        type="password"
                                        required
                                        fullWidth
                                        error
                                        helperText="The password you have entered is invalid"
                                    />
                                ) : (
                                    <CustomTextField
                                        name="password"
                                        label="Password"
                                        autoComplete="new-password"
                                        type="password"
                                        required
                                        fullWidth
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <SignUpButton type="submit" fullWidth variant="contained">
                                    <Typography fontWeight={600}>Sign Up</Typography>
                                </SignUpButton>
                            </Grid>
                        </Grid>
                    </Box>
                    <Link href="/auth/signIn">
                        <a>
                            <Typography color="blackAndWhite.contrast.default" sx={{ textDecoration: "underline" }}>
                                Already have an account? Sign in
                            </Typography>
                        </a>
                    </Link>
                </Box>
            </Container>
        </>
    );
};

export default SignUp;

const SignUpButton = styled(Button)(({ theme }) => ({
    margin: "24px 0px 16px",
    textTransform: "none",
    backgroundColor: theme.palette.blackAndWhite.contrast.default,
    ":hover": {
        backgroundColor: theme.palette.blackAndWhite.contrast.alpha80,
    },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
    "& label.Mui-focused": {
        color: theme.palette.blackAndWhite.contrast.default,
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.blackAndWhite.contrast.default,
        },
    },
    "& .MuiOutlinedInput-input": {
        ":-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
            WebkitTextFillColor: theme.palette.blackAndWhite.contrast.default,
        },
    },
}));
