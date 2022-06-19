import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./tailwind.css";
import auth from "./firebaseConfig";
//components
import HomePage from "./components/HomePage";
import SearchResultPage from "./pages/searchResultPage/SearchResultPage";
import DuplicatePage from "./pages/duplicatePage/DuplicatePage";
import SignInUpPage from "./components/SignInUpPage";
import MemberPage from "./pages/memberPage/MemberPage";
import SearchPage from "./pages/searchPage/SearchPage";


export const AuthContext = React.createContext(); 

const App = () => {

    const [ isSignedIn, setIsSignedIn ] = useState( false );
    const [ userUid, setUserUid ] = useState( "" );
    const [ userName, setUserName ] = useState( "" );

    // Listen to the Firebase Auth state and set the local state.
    useEffect( () => {
        const unregisterAuthObserver =auth.onAuthStateChanged( user => {
            setUserUid( user.uid );
            setIsSignedIn( !!user );
            setUserName( user.displayName );
        } );
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, [] );

    return (
        <>
            <AuthContext.Provider value={{ isSignedIn : [ isSignedIn, setIsSignedIn ], userUid : [ userUid, setUserUid ], userName : [ userName, setUserName ] }}>
                <BrowserRouter>
                    <Routes>
                        <Route path= "/" element = { <HomePage /> }/>
                        <Route path= "/search" element = { <SearchPage /> }/>
                        <Route path= "/search/:id" element = { <SearchResultPage /> }/>
                        <Route path= "/member" element = { <MemberPage /> }/>
                        <Route path= "/duplicate_check" element = { <DuplicatePage /> }/>
                        <Route path= "/signinup" element = { <SignInUpPage /> }/>  
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>            
        </>
    );
};

export default App;