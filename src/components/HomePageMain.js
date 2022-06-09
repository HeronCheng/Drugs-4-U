import React, { useState } from "react";
import { Link } from "react-router-dom";
//components
import Nav from "./Nav.js";
//圖片
import downicon from "../img/downicon.png";
import upicon from "../img/upicon.png";

const HomePageMain = () => {
    const goToSecond = () => {
        window.scrollTo( 0, 700 );
    };
    const goToFirst = () => {
        window.scrollTo( 0, 0 );
    };
    //開場動畫
    const [ openState, setOpenState ] = useState( false );
    window.setTimeout( ( () => setOpenState( true ) ), 1500 );
    window.setTimeout( ( () => document.getElementById( "opening" ).style.display="none" ), 2500 );
    
    return(
        <>
            <div className="bg-home bg-cover bg-no-repeat bg-scroll bg-center h-screen relative">
                <div id="opening" className={openState?( "w-full h-full flex justify-center items-center bg-zinc-700 tracking-out-contract z-20 fixed" ):( "w-full h-full flex justify-center items-center bg-zinc-700 tracking-in-expand z-20 fixed" )}>
                    <span className="text-6xl xss:text-7xl tablet:text-8xl font-ubuntu italic underline text-sky-100 ">Drugs 4 U</span>
                </div>
                <Nav/>
                <img src={downicon} className="animate-shake-vertical w-11 absolute left-[47%] top-[90%] cursor-pointer hover:invert" onClick={goToSecond}/>
                <div className="absolute left-[10%] top-1/4 tablet:top-1/3 z-[5]">
                    <div className="text-4xl tablet:text-5xl leading-11 font-bold">您可以在這裡找到，<br/>台灣藥品的相關資訊。</div>
                    <div className="text-xl tablet:text-2xl my-4">關心彼此，從您服用的藥品開始。</div>
                    <Link to="/search"><button className="border-solid mt-2 border-2 tablet:border-4 rounded-2xl tracking-wide border-blue-900 hover:border-blue-600 p-2 tablet:p-3 text-lg tablet:text-xl bg-blue-900 hover:bg-blue-600 text-white shadow-lg">Get Started</button></Link>
                </div>
            </div>
            <div className="bg-main bg-cover bg-no-repeat bg-center bg-scroll h-[60rem] relative" >
                <img src={upicon} className="animate-shake-vertical w-11 absolute left-[47%] top-[90%] cursor-pointer hover:invert" onClick={goToFirst}/>
            </div>
        </>
    );
};

export default HomePageMain;