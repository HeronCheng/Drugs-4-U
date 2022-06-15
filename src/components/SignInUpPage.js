import React, { useContext, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import { Navigate } from "react-router-dom";
//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import auth from "../firebaseConfig";
import { AuthContext } from "../App";
//圖片
import close from "../img/cancel1.png";
import copy from "../img/copy.png";
import loading from "../img/loading.svg";

const uiConfig = {
    callbacks : {
        signInSuccessWithAuthResult() {
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
        {
            provider : firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName : false
        },
    ],
};

const SignInUpPage = () => {
    //載入圖示
    const [ isloading, setIsLoading ] = useState( true );
    
    const { isSignedIn } = useContext( AuthContext );

    const [ signedIn ] = isSignedIn;

    //複製測試帳號密碼
    const copyToClipBoard1 = () => {
        navigator.clipboard.writeText( "test@test.com" );
    };
   
    const copyToClipBoard2 = () => {
        navigator.clipboard.writeText( "testtest" );
    };

    //關掉測試帳號視窗
    const [ isClose, setIsClose ] = useState( true );
    const goClose = () => {
        setIsClose( false );
    };
    
    setTimeout( () => {
        setIsLoading( false );
    }, "1500" );

    return(
        <>
            {
                signedIn?<Navigate to="/member" /> :
                    ( 
                        <>
                            <Nav />
                            <div id="loading" className={isloading?( "w-full h-full flex justify-center items-center bg-zinc-300 z-20 fixed" ):"hidden" }>
                                <img src={loading}/>
                            </div>
                            <div className="pt-[52px] tablet:pt-[66.5px] z-0 bg-darkblue "></div>
                            <div className={isClose?"flex h-[65%] pt-[2rem] tablet:pt-16 ":"flex h-[42%] tablet:h-[65%] pt-[2rem] tablet:pt-16 "}>
                                <div className="mx-auto">
                                    <h1 className="text-center mb-7 text-3xl font-semibold tracking-wider">請選擇以下方式<br/> 註冊/登入</h1>
                                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                                    <div id="loader" className="text-center">Loading...</div>
                                </div>
                                <div className={isClose?"fixed border-2 border-slate-600 rounded p-5 top-[45%] tablet:top-[49%] main:top-[19%] left-[13.5%] xss:left-[5%] shadow-xl w-[280px] mt-[5px]":"hidden"}>
                                    <img src={close} className="w-8 ml-[92%] mt-[-5%] cursor-pointer"onClick={goClose} />
                                    <p className="mt-[6%] mb-[6%]"><span className="pt-4"><span className="font-semibold">測試帳號 : </span><span className="text-sky-700">test@test.com</span></span><img id="copy" src={copy} className="w-7 cursor-pointer inline ml-2" onClick={copyToClipBoard1} title="複製" /></p>
                                    <p><span className="pt-4"><span className="font-semibold">測試密碼 : </span><span className="text-sky-700">testtest</span></span><img id="copy" src={copy} className="w-7 cursor-pointer inline ml-2" onClick={copyToClipBoard2} title="複製" /></p>
                                </div>
                            </div>                           
                            <Footer />
                        </> 
                    )
            }           
        </>
    );
};


export default SignInUpPage;