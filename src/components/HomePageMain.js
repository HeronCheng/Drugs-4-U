import React, { useState } from "react";
import { Link } from "react-router-dom";
//components
import Nav from "./Nav.js";
//圖片
import downicon from "../img/downicon.png";
import upicon from "../img/upicon.png";
import gif1 from "../img/Drugs4U - 1_.gif";
import gif2 from "../img/Drugs4U - 2_.gif";
import gif3 from "../img/Drugs4U - 3_.gif";
import search from "../img/undraw_search2.svg";
import exportFile from "../img/undraw_export_files.svg";
import warning from "../img/undraw_notify.svg";


const HomePageMain = () => {
    // const goToSecond = () => {
    //     window.scrollTo( 0, 700 );
    //  onClick={goToSecond}
    // };
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
                <a href="#second"><img src={downicon} className="animate-shake-vertical w-11 absolute left-[47%] top-[90%] cursor-pointer hover:invert"/></a>
                <div className="absolute left-[10%] top-1/4 tablet:top-1/3 z-[5]">
                    <div className="text-4xl tablet:text-5xl leading-11 font-bold">您可以在這裡找到，<br/>台灣藥品的相關資訊。</div>
                    <div className="text-xl tablet:text-2xl my-4">關心彼此，從您服用的藥品開始。</div>
                    <Link to="/search"><button className="border-solid mt-2 border-2 tablet:border-4 rounded-2xl tracking-wide border-blue-900 hover:border-blue-600 p-2 tablet:p-3 text-lg tablet:text-xl bg-blue-900 hover:bg-blue-600 text-white shadow-lg">開始使用</button></Link>
                </div>
            </div>
            <div id="second" className="bg-main bg-cover bg-no-repeat bg-right-top bg-scroll h-auto relative " >
                <div className="block md:flex pt-20 justify-center">                   
                    <div className="mr-0 md:mr-12">
                        <img src={search} className="w-[150px] xs:w-[191px] main:w-[253px] h-auto xs:h-[150px] main:h-[200px] mx-auto"/>
                        <p className="my-5 md:mt-10 font-semibold text-lg xs:text-xl tracking-wider text-slate-900 text-center">
                            讓您簡單利用關鍵字搜尋藥品、<br/>
                            查看藥品詳細資料與圖檔。
                        </p>
                    </div>
                    <img src={gif1} className="w-full xs:w-[400px] main:w-[510px] h-auto xs:h-[255px] main:h-[300px] mx-auto md:mx-0"/>
                </div>
                <div className="text-center mt-14">&#8905;&#8906;&#8905;&#8906;&#8905;&#8906;&#8905;&#8906;&#8905;&#8906;</div>
                <div className="hidden md:flex py-14 justify-center">
                    <img src={gif3} className="w-[400px] main:w-[510px] h-[255px] main:h-[300px] mx-auto md:mx-0"/>
                    <div className="ml-12">
                        <img src={warning} className="w-[200px] main:w-[267px] h-[150px] main:h-[200px] mx-auto"/>
                        <p className="mt-10 font-semibold text-xl tracking-wider text-slate-900 text-center">
                        加入會員，即可幫您檢查<br/>
                        是否有服用重複的藥品。</p>
                    </div>                   
                </div>
                <div className="block md:hidden py-14 justify-center">                   
                    <div className="mr-0 md:mr-12">
                        <img src={warning} className="w-[150px] xs:w-[200px] main:w-[267px] h-auto xs:h-[150px] main:h-[200px] mx-auto"/>
                        <p className="my-5 md:my-10 font-semibold text-lg xs:text-xl tracking-wider text-slate-900 text-center">
                        加入會員，即可幫您檢查<br/>
                        是否有服用重複的藥品。</p>
                    </div>   
                    <img src={gif3} className="w-full xs:w-[400px] main:w-[510px] h-auto xs:h-[255px] main:h-[300px] mx-auto md:mx-0"/>                
                </div>
                <div className="text-center mb-14">&#8905;&#8906;&#8905;&#8906;&#8905;&#8906;&#8905;&#8906;&#8905;&#8906;</div>
                <div className="block md:flex pb-24 md:pb-20 justify-center">                             
                    <div className="mr-0 md:mr-12">
                        <img src={exportFile} className="w-[150px] xs:w-[176px] main:w-[235px] h-auto xs:h-[150px] main:h-[200px] mx-auto"/>
                        <p className="my-5 md:mb-10 font-semibold text-lg xs:text-xl tracking-wider text-slate-900 text-center">
                        可於會員專區，幫您將收藏的藥品<br/>
                        及重複用藥檢查結果轉成PDF檔。
                        </p>
                    </div>
                    <img src={gif2} className="w-full xs:w-[400px] main:w-[510px] h-auto xs:h-[255px] main:h-[300px] mx-auto md:mx-0"/>        
                </div>                
                <img src={upicon} className="animate-shake-vertical w-11 absolute left-[47%] top-[96.5%] md:top-[94.5%] cursor-pointer hover:invert" onClick={goToFirst}/>
            </div>
        </>
    );
};

export default HomePageMain;