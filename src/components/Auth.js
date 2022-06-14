import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../App";

const Auth=() => {
    
    const { isSignedIn } = useContext( AuthContext );

    const [ signedIn ] = isSignedIn;

    return ( 
        signedIn ? <Outlet /> : <Navigate to="/signinup" /> 
    );	
};

export default Auth;