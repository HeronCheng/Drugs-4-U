import React from "react";
import { Link } from "react-router-dom";
//圖片
import github from "../img/github.png";
import email from "../img/email.png";
import linkedin from "../img/linkedin.png";

const Footer = () => {
    return (
        <footer className="bg-darkblue backdrop-grayscale h-auto footer:h-56 relative font-inter text-base">
            <div className="pt-10 ">
                <div className="ml-0 footer:ml-16 text-slate-400 block footer:flex text-center">
                    <div className="mr-0 footer:mr-8 mb-3 footer:mb-0 hover:text-white"><Link to="/">Homepage</Link></div>
                    <div className="mr-0 footer:mr-8 mb-3 footer:mb-0 hover:text-white"><Link to="/search">Find Drugs</Link></div>
                    <div className="mr-0 footer:mr-8 mb-3 footer:mb-0 hover:text-white"><Link to="/duplicate_check">Duplicate Checker</Link></div>
                    { localStorage.getItem( "userStatus" ) ? <Link to="/member"><div className="mr-0 footer:mr-8 mb-3 footer:mb-0 hover:text-white">Member</div></Link>:<div className="mr-0 footer:mr-8 mb-3 footer:mb-0 hover:text-white"><Link to="/member">Sign in</Link></div>}
                </div>
                <hr className="w-11/12 bg-slate-300 h-px mx-auto my-8"/>
            </div>
            <div className="block footer:flex justify-between pb-3 footer:pb-0">
                <div className="flex ml-0 footer:ml-16 justify-center">
                    <a href="https://github.com/HeronCheng/Drugs-4-U"><img src={github} className="w-12 invert mr-6"/></a>
                    <a href="mailto:jc16884@gmail.com"><img src={email} className="w-12 invert mr-6"/></a>
                    <a href="https://www.linkedin.com/in/%E7%BE%BD%E7%AD%91-%E9%84%AD-a86a6220b/"><img src={linkedin} className="w-12 invert"/></a>
                </div>
                <div className="text-white mt-6 footer:mt-0 text-center mr-0 footer:mr-16">COPYRIGHT © 2022 Drugs 4 U</div>
            </div>
        </footer>
    );
};

export default Footer;