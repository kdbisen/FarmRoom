import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {Auth} from "@firebase/auth";
import {app} from "../../authentication/firebase";


export default function TopAppBar() {


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


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        FarmRoom
                    </Typography>
                    <Button color="inherit"><Link to={"/login"}>Login</Link></Button>
                    <Button color="inherit" onClick={siginUsing}> Sign Using Google </Button>
                    <Button color="inherit"><Link to={"/register"} >Create Account</Link></Button>

                </Toolbar>
            </AppBar>
        </Box>
    );
}