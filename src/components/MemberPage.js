import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import printJS from "print-js";

//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import { db, doc, collection, getDocs, deleteDoc } from "../firebaseConfig";
import { AuthContext } from "../App";
//圖片
import search from "../img/search.png";
import star from "../img/star.png";
import cancel from "../img/cancel.png";
import loading from "../img/loading.svg";

const MemberPage = () => {
    //載入圖示
    const [ isloading, setIsLoading ] = useState( true );

    const { userUid, userName } = useContext( AuthContext );

    const [ uid ] = userUid;
    const [ name ] = userName;

    const [ likeList, setLikeList ] = useState( [] );
    const [ listState, setListState ] = useState( "" );

    const handleList = ( id ) => {
        setListState( id ); 
    };
    //抓收藏資料庫中的資料
    const fetchData = async() => {

        const docSnap = await getDocs( collection( db, "like_list", uid, "list" ) );
        return docSnap;
    };

    let list=[];

    useEffect( () => {
        fetchData().then( result => {	
            if( result !== null ) {	
                result.forEach( ( doc ) => {                   
                    list.push( doc.data() );
                } );
                setLikeList( list );
                setIsLoading( false );
            } } )
            .catch( console.log( "fail" ) );
    }, [ listState ] );

    //刪除收藏資料
    const handleDeleteLike = ( id ) => {

        async function deleteData() {
            await deleteDoc( doc( db, "like_list", uid, "list", id ) );
        }

        deleteData()
            .then( () => console.log( "success" ) )
            .catch( () => console.log( "fail" ) );

        handleList( id );
    };

    //收藏輸出PDF
    const printLikeList = () => {
        printJS( { printable : "list", type : "html", header : "<h1 style='text-align: center;letter-spacing: 0.1em;'>藥品清單</h1>" ,targetStyles : [ "*" ] } );
    };

    //抓資料庫中的重複用藥結果資料
    const fetchDupData = async() => {
        const docSnap = await getDocs( collection( db, "dup_result_list", uid, "list" ) );
        return docSnap;
    };

    let dup_list=[];
    const [ dupList, setDupList ] = useState( [] );

    useEffect( () => {
        fetchDupData().then( result => {	
            if( result !== null ) {	
                result.forEach( ( doc ) => {                   
                    dup_list.push( doc.data() );
                } );
                setDupList( dup_list );
            } } )
            .catch( console.log( "fail" ) );
    }, [ listState ] );
    
    //刪除重複用藥檢查資料
    const handleDeleteDup = ( id ) => {

        async function deleteData() {
            await deleteDoc( doc( db, "dup_result_list", uid, "list", id ) );
        }

        deleteData()
            .then( () => console.log( "success" ) )
            .catch( () => console.log( "fail" ) );

        handleList( id );
    };

    //輸出重複用藥檢查的PDF
    const printDupList = () => {
        printJS( { printable : "dupList", type : "html", header : "<h1 style='text-align: center;letter-spacing: 0.1em;'>重複用藥檢查結果列表</h1>" ,targetStyles : [ "*" ] } );
    };

    return(
        <>
            <div id="loading" className={isloading?( "w-full h-full flex justify-center items-center bg-zinc-300 z-20 fixed" ):"hidden" }>
                <img src={loading}/>
            </div>
            <Nav/>
            <div className="pt-[52px] tablet:pt-[66.5px] z-10 bg-darkblue">              
            </div>           
            <div className="flex justify-between">
                <div className="mt-5 ml-3 xs:ml-10 text-xl font-bold">{name} 您好，歡迎使用會員專區。</div>
            </div> 
            <div className="my-5 block lg:flex w-full justify-center ">
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
                                        <img src={cancel} className="w-8 h-8 justify-self-end cursor-pointer" onClick={() => handleDeleteLike( item.許可證字號 )}/>
                                    </div>                              
                                </div>
                            );
                        }
                        )}
                    </div>
                    <button className="black-button mx-auto mt-5 w-24 " type="button" onClick={printLikeList}>輸出PDF</button> 
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
                </div>
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
                                            <img src={cancel} className="w-8 h-8 justify-self-end cursor-pointer" onClick={() => handleDeleteDup( item.id )}/>
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
                                            <img src={cancel} className="w-8 h-8 justify-self-end cursor-pointer" onClick={() => handleDeleteDup( item.id )}/>
                                        </div> 
                                        <br/>                             
                                    </div>
                                );
                            }
                        }
                        )}
                       
                    </div>
                    <button className="black-button mx-auto mt-5 w-24 " type="button" onClick={printDupList}>輸出PDF</button>
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
                                    );
                                }
                            }
                            )}
                        </div>   
                    </div>
                </div>
            </div>         
            <Footer/>
        </>
    );
};


export default MemberPage;