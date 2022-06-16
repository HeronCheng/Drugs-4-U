import React, { useContext } from "react";
import { handleDeleteDup, printDupList } from "./fetchDatabaseData";
import { AuthContext } from "../../App";
//圖片
import search from "../../img/search.png";
import cancel from "../../img/cancel.png";

const DuplicateList = ( { dupList, listState, setListState } ) => { 
    const { userUid } = useContext( AuthContext );
    const [ uid ] = userUid;

    return(
        <div className={dupList.length===0?"w-[100%] lg:w-[45%] h-[20rem]" :"w-[100%] lg:w-[45%] h-auto"} >
            <div className="mb-3">
                <div className="leading-[3rem] mx-auto w-full xs:w-[80%] footer:w-[60%] lg:w-[85%] text-left text-lg font-semibold tracking-wider bg-gradient-to-r from-blue-300 to-white rounded"><img src={search} className="inline-block w-8 mx-2"/>重複用藥檢查紀錄</div> 
            </div>                   
            <div className={dupList.length===0?"hidden":"w-full xs:w-[80%] footer:w-[60%] lg:w-[85%] mx-auto "}>
                { dupList.map( item => {                                
                    if( ( item.評估結果 ).includes( "可能存在重複用藥" ) ) {
                        return (
                            <div key={item.id}>
                                <div className="flex w-[100%] border-y-2 xs:border-2 border-stone-600 rounded-none xs:rounded mb-0 xs:mb-3 p-6 xs:p-5 bg-zinc-50 hover:bg-zinc-100 hover:shadow-md">
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
                                    <img src={cancel} className="w-8 h-8 justify-self-end cursor-pointer" onClick={() => handleDeleteDup( uid, item.id, listState, setListState )}/>
                                </div> 
                                <br/>                             
                            </div>
                        );
                    }                           
                    else{
                        return (
                            <div key={item.id}>
                                <div className="flex w-[100%] border-y-2 xs:border-2 border-stone-600 rounded-none xs:rounded mb-0 xs:mb-3 p-6 xs:p-5 bg-zinc-50 hover:bg-zinc-100 hover:shadow-md">
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
                                    <img src={cancel} className="w-8 h-8 justify-self-end cursor-pointer" onClick={() => handleDeleteDup( uid, item.id, listState, setListState )}/>
                                </div> 
                                <br/>                             
                            </div>
                        );
                    } }
                )}                       
            </div>
            <button className="black-button mx-auto mt-5 w-24 " type="button" onClick={printDupList}>輸出PDF</button>
        </div>
    );
};

export default DuplicateList;