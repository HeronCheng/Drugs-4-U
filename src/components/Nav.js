// 導覽列
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "./FirebaseConfig.js";
//圖片
import menu from "../img/menu.png";


const Nav = () => {
    
    const user = auth.currentUser;

    function exit() {
        auth.signOut();
        localStorage.removeItem( "userStatus" );
    }


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
                    <div id="1" className={toTW1 ?( "nav-button w-[100px] md:w-28 mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" ):( "nav-button w-[100px] md:w-28 tracking-[.2em] mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                        <Link to="/search">{toTW1 ? "Find Drugs" : "藥品查詢"}</Link>
                    </div>
                    <div id="2" className={toTW2 ?( "nav-button w-[167px] md:w-[180px] mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" ):( "nav-button w-[167px] md:w-[180px] tracking-[.2em] mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                        <Link to="/duplicate_check">{toTW2 ? "Duplicate Checker" : "重複用藥檢核"}</Link>
                    </div>
                    <div id="3" className={toTW3 ?( "nav-button w-[75px] md:w-[80px] mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" ):( "nav-button w-[75px] md:w-[80px] tracking-[.2em] mx-px xs:mx-0.5 sm:mx-2 md:mx-4 lg:mx-7" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                        { localStorage.getItem( "userStatus" ) ? ( window.location.pathname==="/member"? <span onClick={exit}><Link to="/">{toTW3 ? "Sign out" : "登出"}</Link></span>:<Link to="/member">{toTW3 ? "Member" : "會員區"}</Link> ):<Link to="/signinup">{toTW3 ? "Sign in" : "登入"}</Link>}    
                    </div>
                </div>
                <img src={menu} id="menu" className="hidden" onClick={openMobileMenu}/>
            </nav>
            <div id="mobile_nav" className={openMenu?"w-full pt-12 items-center font-semibold text-xl text-slate-200 font-inter text-left fixed bg-slate-600 opacity-80 z-[8]":"hidden"}>
                <Link to="/search"><div id="1" className={toTW1 ?( "cursor-pointer h-16 leading-11 mt-0.5 border-solid pl-4 " ):( "cursor-pointer h-16 leading-11 mt-0.5 text-slate-900 bg-slate-50 border-solid tracking-[.2em] pl-4" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                    {toTW1 ? "Find Drugs" : "藥品查詢"}
                </div></Link>
                <Link to="/duplicate_check"><div id="2" className={toTW2 ?( "cursor-pointer h-16 leading-11 mt-0.5 border-solid pl-4" ):( "cursor-pointer h-16 leading-11 mt-0.5 text-slate-900 bg-slate-50 border-solid tracking-[.2em] pl-4" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>
                    {toTW2 ? "Duplicate Checker" : "重複用藥檢核"}
                </div></Link>              
                { localStorage.getItem( "userStatus" ) ? ( window.location.pathname==="/member"?<div id="3" className={toTW3 ?( "cursor-pointer h-16 leading-11 mt-0.5 border-solid pl-4" ):
                    ( "cursor-pointer h-16 leading-11 mt-0.5 text-slate-900 bg-slate-50 border-solid tracking-[.2em] pl-4" )} onMouseEnter={changeToTW} onMouseLeave={backToEng} onClick={exit}><Link to="/">{toTW3 ? "Sign Out" : "登出"}</Link></div>:
                    <Link to="/member"><div id="3" className={toTW3 ?( "cursor-pointer h-16 leading-11 mt-0.5 border-solid pl-4" ):
                        ( "cursor-pointer h-16 leading-11 mt-0.5 text-slate-900 bg-slate-50 border-solid tracking-[.2em] pl-4" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>{toTW3 ? "Member" : "會員專區"}</div></Link> ):
                    <Link to="/signinup"><div id="3" className={toTW3 ?( "cursor-pointer h-16 leading-11 mt-0.5 border-solid pl-4" ):( "cursor-pointer h-16 leading-11 mt-0.5 text-slate-900 bg-slate-50 border-solid tracking-[.2em] pl-4" )} onMouseEnter={changeToTW} onMouseLeave={backToEng}>{toTW3 ? "Sign in" : "登入"}
                    </div></Link>
                }    
            </div>
        </>
    );
};

export default Nav;
