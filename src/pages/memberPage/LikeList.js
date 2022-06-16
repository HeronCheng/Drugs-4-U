import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { handleDeleteLike, printLikeList } from "./fetchDatabaseData";
import { AuthContext } from "../../App";
//圖片
import star from "../../img/star.png";
import cancel from "../../img/cancel.png";

const LikeList = ( { likeList, listState, setListState } ) => { 
    const { userUid } = useContext( AuthContext );
    const [ uid ] = userUid;

    return(
        <div className={likeList.length<2?"w-[100%] lg:w-[45%] h-[20rem] pb-5 border-stone-300 border-r-0 lg:border-r-2 border-solid":"w-[100%] lg:w-[45%] pb-5 border-stone-300 border-r-0 lg:border-r-2 border-solid"} id="printLeft">
            <div className="mb-3">
                <div className="leading-[3rem] mx-auto w-full xs:w-[80%] footer:w-[60%] lg:w-[85%] text-left text-lg font-semibold tracking-wider bg-gradient-to-r from-blue-300 to-white rounded"><img src={star} className="inline-block w-8 mx-2"/><span className="align-middle">藥品資料收藏</span></div>
            </div>
            <div className={likeList.length===0?"hidden":"w-full xs:w-[80%] footer:w-[60%] lg:w-[85%] mx-auto border-t-2 xs:border-0 border-stone-600"}>
                {likeList.map( item => {
                    return (
                        <div key={Math.random()}>
                            <div className="flex w-[100%] border-b-2 xs:border-2 border-stone-600 rounded-none xs:rounded mb-0 xs:mb-3 p-6 xs:p-5 bg-zinc-50 hover:bg-zinc-100 hover:shadow-md">
                                <div>
                                    <Link to={`/search/${item.許可證字號}`}><div className="font-bold text-base sm:text-lg text-cyan-900 mb-2">{item.中文品名}</div><div className="text-sm sm:text-base">{item.英文品名}</div></Link>
                                </div>
                                <div className="flex-auto"></div>
                                <img src={cancel} className="w-8 h-8 justify-self-end cursor-pointer" onClick={() => handleDeleteLike( uid, item.許可證字號, listState, setListState )}/>
                            </div>                              
                        </div>
                    ); }
                )}
            </div>
            <button className="black-button mx-auto mt-5 w-24 " type="button" onClick={printLikeList}>輸出PDF</button> 
        </div>
    );
};

export default LikeList;