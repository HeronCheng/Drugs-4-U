import React from "react";
//components
import Nav from "./Nav.js";
import Footer from "./Footer";
//圖片
import search from "../img/search.png";
import star from "../img/star.png";

const MemberPage = () => {
    return(
        <>
            <Nav/>
            <div className="pt-20 h-16 z-0">
            </div>
            <div className="my-10 flex w-full justify-center">
                <div className="w-[45%] h-96 border-stone-300 border-r-2 border-solid ">
                    <div className="text-center text-lg font-semibold tracking-wider"><img src={search} className="inline-block w-10 mr-2.5"/>歷史搜尋紀錄</div>
                </div>
                <div className="w-[45%] h-96 border-stone-300 border-l-2 border-solid ">
                    <div className="text-center text-lg font-semibold tracking-wider"><img src={star} className="inline-block w-10 mr-2.5"/>藥品資料收藏</div>
                </div>
            </div>
            <Footer/>
        </>
    );
};


export default MemberPage;