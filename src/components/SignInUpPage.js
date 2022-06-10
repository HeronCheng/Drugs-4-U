import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import auth from "./FirebaseConfig";


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
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
        },
    ],
};




const Signinup=() => {
    const [ isSignedIn, setIsSignedIn ] = useState( false ); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect( () => {
        const unregisterAuthObserver =auth.onAuthStateChanged( user => {
            localStorage.setItem( "userUid", user.uid );
            localStorage.setItem( "userStatus", user.accessToken );
            setIsSignedIn( !!user );
        } );
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, [] );
    if ( !isSignedIn ) {
        return (
            <div className="h-[42%] tablet:h-[60%] pt-16 ">
                <h1 className="text-center mb-7 text-3xl font-semibold tracking-wider">請選擇以下方式登入</h1>
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
            <div className="pt-[52px] tablet:pt-[66.5px] z-0 bg-darkblue ">
            </div>
            <Signinup/>
            <Footer/>
        </>
    );
};


export default SignInUpPage;