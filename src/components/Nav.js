// 導覽列
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import auth from "../firebaseConfig.js";
import { AuthContext } from "../App";
//圖片
import menu from "../img/menu.png";


const Nav = () => {

    const { isSignedIn } = useContext( AuthContext );

    const [ signedIn, setSignedIn ] = isSignedIn;

    function exit() {
        auth.signOut();
        setSignedIn( false );
    }

    const [ toTW1, setToTW1 ] = useState( true );
    const [ toTW2, setToTW2 ] = useState( true );
    const [ toTW3, setToTW3 ] = useState( true );
    
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

    const [ openMenu, setOpenMenu ] = useState( false );

    const openMobileMenu = () => {
        setOpenMenu( !openMenu );
    };
    
    return (
        <>
            <nav className={scrolling ? "flex fixed w-full bg-darkblue backdrop-grayscale z-[18]":( openMenu?"flex bg-darkblue fixed w-full z-10":"flex bg-transparent fixed w-full z-10" )}>
                <div className="flex items-center cursor-pointer ml-3 sm:ml-4 md:ml-7 lg:ml-10 font-ubuntu italic text-3xl sm:text-4xl lg:text-4.5xl text-white underline"><Link to="/"><span>Drugs 4 U</span></Link></div>
                <div className="flex-auto"></div>
                <div id="nav" className="flex justify-center items-center font-semibold text-base sm:text-lg lg:text-xl text-slate-200 font-inter text-center">
                    <div id="1" className={toTW1 ?( "nav-button w-[100px] md:w-28 tracking-[.2em] mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" ):( "nav-button w-[100px] md:w-28 mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                        <Link to="/search">{toTW1 ? "藥品查詢" : "Find Drugs"}</Link>
                    </div>
                    <div id="2" className={toTW2 ?( "nav-button w-[167px] md:w-[180px] tracking-[.2em] mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" ):( "nav-button w-[167px] md:w-[180px] mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                        <Link to="/duplicate_check">{toTW2 ? "重複用藥檢核" : "Duplicate Checker"}</Link>
                    </div>
                    <div id="3" className={toTW3 ?( "nav-button w-[75px] md:w-[80px] tracking-[.2em] mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" ):( "nav-button w-[75px] md:w-[80px] mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                        { signedIn ? ( window.location.pathname==="/member"? <span onClick={exit}><Link to="/">{toTW3 ? "登出" : "Sign out"}</Link></span>:<Link to="/member">{toTW3 ? "會員區" : "Member" }</Link> ):<Link to="/member">{toTW3 ? "登入" : "Sign in" }</Link>}    
                    </div>
                </div>
                <img src={menu} id="menu" className="hidden" onClick={openMobileMenu}/>
            </nav>
            <div id="mobile_nav" className={openMenu?"block tablet:hidden w-full pt-12 items-center font-semibold text-xl text-slate-200 font-inter text-left fixed bg-slate-600 opacity-80 z-[8]":"hidden"}>
                <Link to="/search"><div id="1" className={toTW1 ?( "cursor-pointer h-16 leading-11 mt-0.5 border-solid tracking-[.2em] pl-4" ):( "cursor-pointer h-16 leading-11 mt-0.5 border-solid pl-4 text-slate-900 bg-slate-50" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                    {toTW1 ? "藥品查詢" : "Find Drugs" }
                </div></Link>
                <Link to="/duplicate_check"><div id="2" className={toTW2 ?( "cursor-pointer h-16 leading-11 mt-0.5 border-solid tracking-[.2em] pl-4" ):( "cursor-pointer h-16 leading-11 mt-0.5 border-solid pl-4 text-slate-900 bg-slate-50" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                    {toTW2 ? "重複用藥檢核" : "Duplicate Checker" }
                </div></Link>              
                { signedIn ? ( window.location.pathname==="/member"?<div id="3" className={toTW3 ?( "cursor-pointer h-16 leading-11 mt-0.5 border-solid tracking-[.2em] pl-4" ):
                    ( "cursor-pointer h-16 leading-11 mt-0.5 border-solid pl-4 text-slate-900 bg-slate-50 " )} onMouseEnter={changeToTW} onMouseLeave={backToEng} onClick={exit}><Link to="/">{toTW3 ? "登出" : "Sign out"}</Link></div>:
                    <Link to="/member"><div id="3" className={toTW3 ?( "cursor-pointer h-16 leading-11 mt-0.5 border-solid tracking-[.2em] pl-4" ):
                        ( "cursor-pointer h-16 leading-11 mt-0.5 border-solid pl-4 text-slate-900 bg-slate-50 " )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>{toTW3 ? "會員區" : "Member"}</div></Link> ):
                    <Link to="/member"><div id="3" className={toTW3 ?( "cursor-pointer h-16 leading-11 mt-0.5 border-solid tracking-[.2em] pl-4" ):( "cursor-pointer h-16 leading-11 mt-0.5 border-solid pl-4 text-slate-900 bg-slate-50 " )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                        {toTW3 ? "登入" : "Sign in"}
                    </div></Link>
                }    
            </div>
        </>
    );
};

export default Nav;