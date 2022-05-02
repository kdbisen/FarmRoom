import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import {
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithPhoneNumber,
    RecaptchaVerifier
} from "firebase/auth";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Auth} from "@firebase/auth";
import {app} from "../../authentication/firebase";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    let navigate = useNavigate();
    const auth = getAuth();
    const[sentOtp, setSendOtp] = useState<any>()
    const[mobile, setMobile] = useState<any>()
    const[code, setCode] = useState<any>()

    // This function runs when the 'sign-in-button' is clicked
    // Takes the value from the 'phoneNumber' input and sends SMS to that phone number
    function submitPhoneNumberAuth() {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response: any) => {
                console.log(response)
                setSendOtp(true)
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                //onSignInSubmit();
            }
        }, auth);

        var appVerifier = window.recaptchaVerifier;
         signInWithPhoneNumber(auth, mobile, appVerifier)
            .then(function(confirmationResult) {
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    // This function runs when the 'confirm-code' button is clicked
    // Takes the value from the 'code' input and submits the code to verify the phone number
    // Return a user object if the authentication was successful, and auth is complete
    function submitPhoneNumberAuthCode() {
        window.confirmationResult.confirm(code).then((result: any) => {
            // User signed in successfully.
            console.log(result)
            const user = result.user;
            navigate(`/home`);
            localStorage.setItem('user', JSON.stringify(user))
            // ...
        }).catch((error: any) => {
            console.log(error)
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        const auth: Auth = getAuth(app );
        signInWithEmailAndPassword(auth, data.get('email')+'', data.get('password')+'')
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate(`/home`);
                localStorage.setItem('user', JSON.stringify(userCredential.user))
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    function siginUsing()  {
        const provider = new GoogleAuthProvider();
        const auth: Auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log(credential);
                const token = credential ?credential.accessToken : "";
                // The signed-in user info.
                const user = result.user;
                console.log(token);
                console.log(user);
                navigate(`/home`);
                localStorage.setItem('user', JSON.stringify(user))
                // ...
            }).catch((error) => {
            // Handle Errors here.
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    function siginUsingFb()  {

        const provider = new FacebookAuthProvider();
        const auth: Auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
                // The signed-in user info.
                const user = result.user;
                navigate(`/home`);
                localStorage.setItem('user', JSON.stringify(user))
                // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                // const credential = FacebookAuthProvider.credentialFromResult(result);
                // const accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                //const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in with Mobile number
                    </Typography>

                    <Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="mobile"
                            label="mobile "
                            name="mobile"
                            autoComplete="mobile"
                            autoFocus
                            disabled={sentOtp}
                            onChange={event => {setMobile(event.currentTarget.value)}}
                        />

                        {sentOtp && <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="code"
                            label="code "
                            name="code"
                            autoComplete="code"
                            autoFocus
                            onChange={event => {setCode(event.currentTarget.value)}}
                        /> }

                        <Button id="sign-in-button"   disabled={sentOtp}    variant="outlined" onClick={submitPhoneNumberAuth}>
                            SIGN IN WITH PHONE
                        </Button>
                        {sentOtp && <Button id="confirm-code"      variant="outlined" onClick={submitPhoneNumberAuthCode}>
                            ENTER CODE
                        </Button>
                        }
                        <div id="recaptcha-container"></div>
                    </Box>

                    <Typography component="h1" variant="h5">
                        Or Sign in with email
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>

                    <Typography component="h1" variant="h5">
                        Or Sign in with
                    </Typography>
                        <Box>
                            <Grid container>

                                <Grid item  >
                                    <Button color="info" variant="contained" onClick={siginUsing}><FacebookIcon />Google </Button>
                                </Grid>
                                <Grid item xs>

                                </Grid>
                                <Grid item>
                                    <Button color="error"  variant="contained"onClick={siginUsingFb}><GoogleIcon />Facebook </Button>
                                </Grid>
                            </Grid>
                        </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}