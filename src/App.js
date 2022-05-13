import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./tailwind.css";
//components
import HomePage from "./components/HomePage";
import SearchResultPage from "./components/SearchResultPage";
import DuplicatePage from "./components/DuplicatePage";
import SignInUpPage from "./components/SignInUpPage";
import MemberPage from "./components/MemberPage";
import SearchPage from "./components/SearchPage";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path= "/" element = { <HomePage /> }/>
                    <Route path= "/search" element = { <SearchPage /> }/>
                    <Route path= "/searchResult" element = { <SearchResultPage /> }/>
                    <Route path= "/duplicate_check" element = { <DuplicatePage /> }/>
                    <Route path= "/signinup" element = { <SignInUpPage /> }/>
                    
                    <Route path= "/member" element = { <MemberPage /> }/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;