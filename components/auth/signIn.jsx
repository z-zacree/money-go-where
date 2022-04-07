// Material UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// React
import { useState, useEffect } from "react";

// Firebase
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";

const SignIn = ({ setState }) => {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    pt: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {emailError ? (
                        <TextField
                            name="email"
                            label="Email Address"
                            autoComplete="email"
                            required
                            fullWidth
                            error
                            helperText="The email you have entered is invalid"
                        />
                    ) : (
                        <TextField required fullWidth name="email" label="Email Address" autoComplete="email" autoFocus />
                    )}
                    {passwordError ? (
                        <TextField
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
                        <TextField
                            name="password"
                            label="Password"
                            autoComplete="current-password"
                            type="password"
                            margin="normal"
                            required
                            fullWidth
                        />
                    )}

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Link onClick={() => setState(false)}>Don't have an account? Sign Up</Link>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
