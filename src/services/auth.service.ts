/*
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
*/

import {Auth} from "@firebase/auth";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {app} from "../authentication/firebase";

class AuthService {
    loginWithEmailPassword(username: string, password: string) {
        const auth: Auth = getAuth(app );
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // Signed in
                return userCredential.user;
            })
            .catch((error) => {
                return error;
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    loginWithNumber(username: string, password: string) {
        const auth: Auth = getAuth(app );
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // Signed in
                return userCredential.user;
            })
            .catch((error) => {
                return error;
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username: string, email: string, password: string) {
        /*return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });*/
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();