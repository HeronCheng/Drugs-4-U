import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "./FirebaseConfig.js";
//components
import Nav from "./Nav.js";
import Footer from "./Footer";
//圖片
import search from "../img/search.png";
import star from "../img/star.png";

const MemberPage = () => {

    const user = auth.currentUser;
  
    let userName;
    const [ userData, setUserData ] = useState ( "" );

  
    useEffect( () => {
        if ( user !== null ) {
            setUserData( user.uid );
        }
    },[ user ] );

    if ( user !== null ) {
        user.providerData.forEach( ( profile ) => {
            userName=profile.displayName;
        } );
    }
    console.log( user )

    function exit() {
        auth.signOut();
        localStorage.removeItem( "userStatus" );
    }

    return(
        <>
            <Nav/>

            <div className="pt-20 z-10 bg-sky-100 h-28">
                您好，歡迎使用會員系統
            </div>
            <div className="my-10 flex w-full justify-center ">
                <div className="w-[45%] h-96 ">
                    <div className="text-center text-lg font-semibold tracking-wider"><img src={search} className="inline-block w-9 mr-2.5"/>歷史搜尋紀錄</div>
                    <hr className="w-[85%] mx-auto mt-4"/>
                </div>
                <div className="w-[45%] h-96 border-stone-300 border-l-2 border-solid ">
                    <div className="text-center text-lg font-semibold tracking-wider"><img src={star} className="inline-block w-9 mr-2.5"/>藥品資料收藏</div>
                    <hr className="w-[85%] mx-auto mt-4"/>                
                </div>
            </div>
            <div className="flex justify-end">
                <button className="black-button" onClick={exit}><Link to="/">Sign Out</Link></button>  
            </div> 
            
            <Footer/>
        </>
    );
};


export default MemberPage;