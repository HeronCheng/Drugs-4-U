import React from "react";

const PdfContent = ( { likeList, dupList } ) => {

    return(
        <>
            <div className="hidden">
                <div id="list">
                    {likeList.map( function( item,index ) {
                        return (
                            <div key={Math.random()} className="flex">
                                <div className="w-10 mb-3 leading-[10rem] text-3xl font-extrabold text-slate-50 text-center bg-gray-600 rounded mr-3">{index+1}</div>
                                <div className="flex w-[90%] border-2 border-stone-600 rounded mb-3 p-4 bg-zinc-50 hover:bg-zinc-100 hover:shadow-md">
                                    <div>
                                        <span className="font-semibold text-xl text-cyan-900">{item.中文品名}</span>
                                        <br/>
                                        <span>{item.英文品名}</span>
                                        <br/>
                                        <span>許可證字號 : {item.許可證字號}</span>
                                        <br/>
                                        <span>成分 : {item.成分}</span>
                                        <br/>
                                        <span>適應症 : {item.適應症}</span>
                                    </div>
                                </div>                              
                            </div>
                        );
                    }
                    )}
                </div>
            </div> 
            <div className="hidden">
                <div className="w-[85%] mx-auto " id="dupList">
                    { dupList.map( item => {                               
                        if( ( item.評估結果 ).includes( "可能存在重複用藥" ) ) {
                            return (
                                <div key={item.id}>
                                    <div className="flex w-[100%] border-2 border-stone-600 rounded mb-3 p-5 bg-zinc-50 hover:bg-zinc-100 hover:shadow-md">
                                        <div>
                                            <div className="font-semibold text-xl text-cyan-900">檢查編號 <br/> <span className="text-base text-slate-600">{item.id}</span></div>
                                            <hr className="my-3"/>
                                            <div className="font-semibold text-xl text-cyan-900">評估品項{item.評估品項.map( function( data, index ) {
                                                return (
                                                    <div key={Math.random()} className="text-base text-slate-600">
                                                        <div>組合 {index+1}</div>
                                                        <div className="text-slate-900 font-extrabold text-lg">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10148;&nbsp;&nbsp;{data.split( "&" )[0].split( "%" )[0]}</div>
                                                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.split( "&" )[0].split( "%" )[1]}</div>
                                                        <div className="text-slate-900 font-extrabold text-lg">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10148;&nbsp;&nbsp;{data.split( "&" )[1].split( "%" )[0]}</div>
                                                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.split( "&" )[1].split( "%" )[1]}</div>
                                                    </div>
                                                );
                                            } )}
                                            </div>
                                            <hr className="my-3"/>
                                            <div className="font-semibold text-xl text-cyan-900">評估結果<br/><span className="text-base text-slate-600">{item.評估結果}</span></div>
                                        </div>
                                        <div className="flex-auto"></div>
                                                
                                    </div> 
                                    <br/>                             
                                </div>
                            );
                        }                            
                        else{
                            return (
                                <div key={item.id}>
                                    <div className="flex w-[100%] border-2 border-stone-600 rounded mb-3 p-5 bg-zinc-50 hover:bg-zinc-100 hover:shadow-md">
                                        <div>
                                            <div className="font-semibold text-xl text-cyan-900">檢查編號 <br/> <span className="text-base text-slate-600">{item.id}</span></div>
                                            <hr className="my-3"/>
                                            <div className="font-semibold text-xl text-cyan-900">評估品項{item.評估品項.map( function( data, index ) {
                                                return (
                                                    <div key={Math.random()} className="text-base text-slate-600">
                                                        <div>{index+1}、{data.中文品名}</div>
                                                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.許可證字號}</div>
                                                    </div>
                                                );
                                            } )}
                                            </div>
                                            <hr className="my-3"/>
                                            <div className="font-semibold text-xl text-cyan-900">評估結果<br/><span className="text-base text-slate-600">{item.評估結果}</span></div>
                                        </div>
                                        <div className="flex-auto"></div>                                               
                                    </div> 
                                    <br/>                             
                                </div>
                            ); }
                    } )}
                </div>   
            </div>
        </>
    );
};

export default PdfContent;