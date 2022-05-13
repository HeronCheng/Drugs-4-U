import React from "react";
import { Link } from "react-router-dom";
//圖片
import github from "../img/github.png";
import email from "../img/email.png";
import linkedin from "../img/linkedin.png";

const Footer = () => {
    return (
        <>
            <div className="bg-sky-100 h-56 relative font-inter text-base">
                <div className="pt-10 ">
                    <div className="ml-16">
                        <span className="mr-8"><Link to="/">Homepage</Link></span>
                        <span className="mr-8"><Link to="/search">Find Drugs</Link></span>
                        <span className="mr-8"><Link to="/duplicate_check">Interactions Checker</Link></span>
                        <span><Link to="/member">Sign in</Link></span>
                    </div>
                    <hr className="w-11/12 bg-blue-900 h-1 mx-auto my-8"/>
                </div>
                <div className="ml-16">COPYRIGHT © 2022 Drugs 4 U</div>
                <a href="https://github.com/HeronCheng/Drugs-4-U"><img src={github} className="w-12 absolute left-[78%]"/></a>
                <a href="mailto:jc16884@gmail.com"><img src={email} className="w-12 absolute left-[84%]"/></a>
                <a href="https://www.linkedin.com/in/%E7%BE%BD%E7%AD%91-%E9%84%AD-a86a6220b/"><img src={linkedin} className="w-12 absolute left-[90%]"/></a>
            </div>
        </>
    );
};

export default Footer;