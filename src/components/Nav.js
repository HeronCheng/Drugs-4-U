// 導覽列
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Nav = () => {

    const [ toTW1, setToTW1 ] = useState( true );
    const [ toTW2, setToTW2 ] = useState( true );
    const [ toTW3, setToTW3 ] = useState( true );
    //
    function changeToTW( e ) {
        if ( e.currentTarget.id === "1" ) {
            setToTW1( false );
        } else if ( e.currentTarget.id === "2" ) {
            setToTW2( false );
        } else {
            setToTW3( false );
        }
    }

    function backToEng( e ) {
        if ( e.currentTarget.id === "1" ) {
            setToTW1( true );
        } else if ( e.currentTarget.id === "2" ) {
            setToTW2( true );
        } else {
            setToTW3( true );
        }
    }

    const [ scrollTop, setScrollTop ] = useState( 0 );
    const [ scrolling, setScrolling ] = useState( false );

    useEffect( () => {
        const onScroll = ( e ) => {
            if( document.documentElement.scrollTop === 0 ) {
                setScrolling( false );
            }
            else{
                setScrolling( true );
            }
            setScrollTop( e.target.documentElement.scrollTop );
            
        };
        window.addEventListener( "scroll", onScroll );

        return () => window.removeEventListener( "scroll", onScroll );
    }, [ scrollTop ] );

    return (
        <>
            <nav className={scrolling ? "flex fixed w-full bg-sky-100 z-20":"flex bg-transparent fixed w-full"}>
                <div className="cursor-pointer ml-10 font-ubuntu italic text-4.5xl text-blue-900 underline"><Link to="/">Drugs 4 U</Link></div>
                <div className="flex-auto"></div>
                <div className="flex justify-center items-center font-semibold text-xl text-blue-900 font-inter text-center ">
                    <div id="1" className="mx-6 cursor-pointer w-28 h-16 leading-11 mt-0.5 hover:text-cyan-900 border-solid hover:border-b-4 border-sky-200" onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                        <Link to="/search">{toTW1 ? "Find Drugs" : "藥品查詢"}</Link>
                    </div>
                    <div id="2" className="mx-6 cursor-pointer w-52 h-16 leading-11 mt-0.5 hover:text-cyan-900 border-solid hover:border-b-4 border-sky-200" onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                        <Link to="/duplicate_check">{toTW2 ? "Duplicate Checker" : "重複用藥檢核"}</Link>
                    </div>
                    <div id="3" className="mx-6 cursor-pointer w-20 h-16 leading-11 mt-0.5 hover:text-cyan-900 border-solid hover:border-b-4 border-sky-200" onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                        <Link to="/signinup">{toTW3 ? "Sign in" : "登入"}</Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;
