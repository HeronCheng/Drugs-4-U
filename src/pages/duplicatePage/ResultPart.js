import React from "react";
//圖片
import listIcon2 from "../../img/cropsquare.png";


const ResultPart = ( { close, checkState, resultState } ) => {
    return(
        <div className="w-full md:w-[43%]" onMouseOver={close}>
            <div className={checkState===""?"w-[90%] xss:w-[80%] xs:w-[75%] md:w-full h-[420px] md:h-[90%] font-JasonHandwriting1-Regular text-slate-900 rounded-md mt-5 border mx-auto md:ml-3 bg-zinc-50":
                ( checkState==="查無重複用藥問題，"? "w-[90%] xss:w-[80%] h-[420px] md:h-[90%] md:w-full font-JasonHandwriting1-Regular text-slate-900 rounded-md mt-5 border mx-auto md:ml-3 bg-zinc-50":
                    "w-[90%] xss:w-[80%] xs:w-[75%] h-auto md:w-full font-JasonHandwriting1-Regular text-slate-900 rounded-md mt-5 border mx-auto md:ml-3 bg-zinc-50" ) }>
                <div className={checkState===""? "hidden":"w-[90%] xss:w-[80%] xs:w-[75%] mx-auto mt-[45px] text-left text-3xl leading-10 font-semibold tracking-widest "}>
                    <span className="text-4xl mb-5">結果如下</span>
                    <hr className="mt-4"/>
                    {resultState.map( function( item ) {
                        return (
                            <div key={Math.random()} className="flex text-gray-600">
                                <div className="flex w-[100%] border-b border-stone-300 p-4 ">
                                    <div >
                                        <div>
                                            <div className="font-semibold flex">
                                                <img src={listIcon2} className="w-9 h-9 mr-3"/>
                                                <span>{item[0]}</span>
                                            </div>
                                            <div className="font-semibold flex">
                                                <img src={listIcon2} className="w-9 h-9 mr-3"/>
                                                <span>{item[1]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>                              
                            </div>
                        ); }
                    )}
                    <div className="mb-[45px] mt-4">
                        <span className="text-rose-500">{checkState}</span>
                        <br/>
                        <span >如上述結果有疑慮，</span>
                        <br/>
                        <span >請洽詢醫師或藥師。</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPart;