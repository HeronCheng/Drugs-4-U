import React from "react";
//components
import Nav from "./Nav.js";
import Footer from "./Footer";
//圖片
import search from "../img/search.png";

const DuplicatePage = () => {
    return(
        <>
            <Nav/>
            <div className="pt-20 h-36 bg-sky-100 z-0">
                <form className="relative z-10 bg-sky-100">
                    <input placeholder="請輸入藥名" className="rounded-2xl pl-14 h-10 w-72 ml-11" type="search"/>
                    <button type="submit" className="absolute right-[94.5%] top-1 w-8" >
                        <img src={search} className="ml-2"/>
                    </button>
                </form>
            </div>
            <div className="my-10 flex w-full justify-around">
                <div className="w-[45%] h-72 border-stone-300 border-4 border-solid rounded-md"></div>
                <div className="w-[45%] h-72 border-stone-300 border-4 border-solid rounded-md"></div>
            </div>
            <Footer/>
        </>
    );
};


export default DuplicatePage;