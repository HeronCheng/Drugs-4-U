import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import { auth } from "./FirebaseConfig";


const uiConfig = {
    callbacks : {
        signInSuccessWithAuthResult( authResult, redirectUrl ) {
            return true;
        },
        uiShown() {
            document.getElementById( "loader" ).style.display = "none";
        },
    },
    signInFlow : "popup",
    signInSuccessUrl : "/member",
    signInOptions : [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
};




const Signinup=() => {
    const [ isSignedIn, setIsSignedIn ] = useState( false ); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect( () => {
        const unregisterAuthObserver =auth.onAuthStateChanged( user => {
            localStorage.setItem( "userStatus", user.accessToken );
            setIsSignedIn( !!user );
        } );
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, [] );
    console.log( isSignedIn );
    if ( !isSignedIn ) {
        return (
            <div className="h-72 pt-10">
                <h1 className="text-center mb-7 text-2xl font-semibold tracking-wide">Please Choose ONE to Sign-In</h1>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                <div id="loader" className="text-center">Loading...</div>
            </div>
        );
    }
};


const SignInUpPage = () => {
    

    return(
        <>
            <Nav/>
            <div className="pt-20 h-16 z-0 bg-sky-100 ">
            </div>
            <Signinup/>
            <Footer/>
        </>
    );
};


export default SignInUpPage;