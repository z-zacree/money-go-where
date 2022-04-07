// Material UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// React
import { useState } from "react";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, collection, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../utils/firebase";

export default function SignUp({ setState }) {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField name="displayName" label="Display Name" autoComplete="family-name" fullWidth autoFocus />
                        </Grid>
                        <Grid item xs={12}>
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
                                <TextField name="email" label="Email Address" autoComplete="email" required fullWidth />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {passwordError ? (
                                <TextField
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
                                <TextField name="password" label="Password" autoComplete="new-password" type="password" required fullWidth />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                    <Link onClick={() => setState(true)}>Already have an account? Sign in</Link>
                </Box>
            </Box>
        </Container>
    );
}
