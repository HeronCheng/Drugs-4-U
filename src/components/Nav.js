// 導覽列
import React, { useState } from "react";

import logo from "../img/logo.jpg";

const Nav = () => {



    return (
        <React.Fragment>
            <nav className='flex border-solid border-b-2 border-gray-200'>
                <img src={logo} className='w-64 h-24 p-3 cursor-pointer' />
                <div className='flex-1'></div>
                <div className="flex justify-center items-center font-medium text-xl">
                    <div className='px-6 text-center'>藥品查詢</div>
                    <div className='px-6 text-center'>統計資料</div>
                    <div className='px-6 text-center'>註冊登入</div>
                    <div className='px-6 text-center'>關於我們</div>
                </div>
                
            </nav>
        </React.Fragment>
    );
};

export default Nav;