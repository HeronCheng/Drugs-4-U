import React, { useState } from "react";
//components
import Nav from "./Nav.js";
//圖片
import downicon from "../img/downicon.png";
import search from "../img/search.png";

const HomePageMain = () => {
    return(
        <>
            <div className="bg-home bg-cover bg-no-repeat bg-scroll h-screen relative">
                <Nav/>
                <img src={downicon} className="animate-shake-vertical w-11 absolute left-[47%] top-[90%] cursor-pointer"/>
                <div className="absolute left-[10%] top-1/3 ">
                    <div className="text-5xl leading-11 font-bold">您可以在這裡找到<br/>台灣所有藥品的相關資訊</div>
                    <div className="text-2xl my-3.5">關心彼此，從您服用的藥品開始</div>
                    <form className="relative mt-6">
                        <input placeholder="請輸入藥名" className="rounded-2xl pl-14 h-11 w-72 " type="search"/><button type="submit" className="absolute right-[90%] top-1.5 w-8" ><img src={search}/></button>
                    </form>
                </div>
            </div>
            <div className="bg-main bg-cover bg-no-repeat bg-scroll h-[45rem]">
            </div>
        </>
    );
};

export default HomePageMain;