import React from "react";
import { Link } from "react-router-dom";
//components
import Nav from "./Nav.js";
//圖片
import downicon from "../img/downicon.png";


const HomePageMain = () => {
    const goToSecond = () => {
        window.location.hash = "#second";
    };

    return(
        <>
            <div className="bg-home bg-cover bg-no-repeat bg-scroll h-screen relative">
                <Nav/>
                <img src={downicon} className="animate-shake-vertical w-11 absolute left-[47%] top-[90%] cursor-pointer" onClick={goToSecond}/>
                <div className="absolute left-[10%] top-1/3 ">
                    <div className="text-5xl leading-11 font-bold">您可以在這裡找到<br/>台灣所有藥品的相關資訊</div>
                    <div className="text-2xl my-4">關心彼此，從您服用的藥品開始</div>
                    <Link to="/search"><button className="border-solid mt-2 border-4 rounded-2xl tracking-wide border-blue-900 hover:border-blue-600 p-3 text-xl bg-blue-900 hover:bg-blue-600 text-white shadow-lg">Get Started</button></Link>
                </div>
            </div>
            <div className="bg-main bg-cover bg-no-repeat bg-scroll h-[45rem]" id="second">
            </div>
        </>
    );
};

export default HomePageMain;