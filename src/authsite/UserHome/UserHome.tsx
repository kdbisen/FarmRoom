import * as React from 'react';
import {useState} from "react";
import AuthAppBar from "../AuthAppBar/AuthAppBar";

export default function UserHome() {



    const [user, setUser] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("user");

        return saved  ? JSON.parse(saved) : {email: "Not found"} ;
    });



    return (
           <>
               <AuthAppBar />
               <div>{user.email}</div>
           </>
    )
}


