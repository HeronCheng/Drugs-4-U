import React from "react";
import { Outlet, Navigate } from "react-router-dom";


const Auth=() => {
    let userStatus=false;
    const statusNow =localStorage.getItem( "userStatus" );

    if( statusNow !== null ) {
        userStatus=true;
    }
    else{
        userStatus=false;
    }

    return userStatus ? <Outlet /> : <Navigate to="/signinup" />;	
};

export default Auth;