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
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";

const SignIn = () => {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        signInWithEmailAndPassword(auth, email, password).catch(({ code: errorCode }) => {
            if (errorCode == "auth/invalid-email" || errorCode == "auth/user-not-found") {
                setEmailError(true);
                setPasswordError(false);
            }
            if (errorCode == "auth/wrong-password") {
                setEmailError(false);
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
                <meta name="description" content="Log in to Money Go Where using email and password" />
                <title>MgW | Sign In</title>
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
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
                            <CustomTextField required fullWidth name="email" label="Email Address" autoComplete="email" autoFocus />
                        )}
                        {passwordError ? (
                            <CustomTextField
                                name="password"
                                label="Password"
                                autoComplete="current-password"
                                type="password"
                                margin="normal"
                                required
                                fullWidth
                                error
                                helperText="The password you have entered is invalid"
                            />
                        ) : (
                            <CustomTextField
                                name="password"
                                label="Password"
                                autoComplete="current-password"
                                type="password"
                                margin="normal"
                                required
                                fullWidth
                            />
                        )}

                        <SignInButton type="submit" variant="contained" fullWidth>
                            <Typography fontWeight={600}>Sign In</Typography>
                        </SignInButton>
                    </Box>
                    <Link href="/auth/signUp">
                        <a>
                            <Typography color="blackAndWhite.contrast.default" sx={{ textDecoration: "underline" }}>
                                Don&apos;t have an account? Sign Up
                            </Typography>
                        </a>
                    </Link>
                </Box>
            </Container>
        </>
    );
};

export default SignIn;

const SignInButton = styled(Button)(({ theme }) => ({
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
