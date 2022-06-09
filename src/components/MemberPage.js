import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "./FirebaseConfig.js";
import printJS from "print-js";

//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import { db, doc, collection, getDocs, deleteDoc } from "./FirebaseConfig";

//圖片
import search from "../img/search.png";
import star from "../img/star.png";
import cancel from "../img/cancel.png";

const MemberPage = () => {

    const user = auth.currentUser;

    const [ likeList, setListList ] = useState( [] );
    const [ listState, setListState ] = useState( "" );
  
    useEffect( () => {
        if ( user !== null ) {
            setUserData( user.uid );
        }
    },[ user ] );

    if ( user !== null ) {
        user.providerData.forEach( ( profile ) => {
            userName=profile.displayName;
        } );
    }
    

    function exit() {
        auth.signOut();
        localStorage.removeItem( "userStatus" );
    }

    const userId =localStorage.getItem( "userUid" );
    const handleList = ( id ) => {
        setListState( id ); 
    };
    //抓資料庫中的資料
    const fetchData = async() => {
        const docSnap = await getDocs( collection( db, "like_list", userId, "list" ) );
        return docSnap;
    };

    let list=[];

    useEffect( () => {
        fetchData().then( result => {			
            if( result!==null ) {		
                result.forEach( ( doc ) => {                   
                    list.push( doc.data() );
                } );
                setListList( list );
            } } )
            .catch( console.log( "fail" ) );
    }, [ listState ] );

    //刪除資料
    const handleDelete = ( id ) => {

        async function deleteData() {
            await deleteDoc( doc( db, "like_list", userId, "list", id ) );
        }

        deleteData()
            .then( () => console.log( "success" ) )
            .catch( () => console.log( "fail" ) );

        handleList( id );
    };

    //輸出PDF
    const print = () => {
        printJS( { printable : "list", type : "html", header : "<h1 style='text-align: center;letter-spacing: 0.1em;'>藥品清單</h1>" ,targetStyles : [ "*" ] } );
    };

    return(
        <>
            <Nav/>
            <div className="pt-[52px] tablet:pt-[66.5px] z-10 bg-darkblue">              
            </div>           
            <div className="flex justify-between">
                <div className="mt-5 ml-3 xs:ml-10 text-xl font-bold">您好，歡迎使用會員專區。</div>
            </div> 
            <div className="my-5 block lg:flex w-full justify-center ">
                <div className={likeList.length<2?"w-[100%] lg:w-[45%] h-96 pb-5 border-stone-300 border-r-0 lg:border-r-2 border-solid":"w-[100%] lg:w-[45%] pb-5 border-stone-300 border-r-0 lg:border-r-2 border-solid"} id="printLeft">
                    <div className="mb-3">
                        <div className="leading-[3rem] mx-auto w-full xs:w-[80%] footer:w-[60%] lg:w-[85%] text-left text-lg font-semibold tracking-wider bg-gradient-to-r from-blue-300 to-white rounded"><img src={star} className="inline-block w-8 mx-2"/><span className="align-middle">藥品資料收藏</span></div>
                    </div>
                    <div className="w-full xs:w-[80%] footer:w-[60%] lg:w-[85%] mx-auto border-t-2 xs:border-0 border-stone-600">
                        {likeList.map( item => {
                            return (
                                <div key={Math.random()}>
                                    <div className="flex w-[100%] border-b-2 xs:border-2 border-stone-600 rounded-none xs:rounded mb-0 xs:mb-3 p-6 xs:p-5 bg-zinc-50 hover:bg-zinc-100 hover:shadow-md">
                                        <div>
                                            <Link to={`/search/${item.許可證字號}`}><div className="font-bold text-base sm:text-lg text-cyan-900 mb-2">{item.中文品名}</div><div className="text-sm sm:text-base">{item.英文品名}</div></Link>
                                        </div>
                                        <div className="flex-auto"></div>
                                        <img src={cancel} className="w-8 h-8 justify-self-end cursor-pointer" onClick={() => handleDelete( item.id )}/>
                                    </div>                              
                                </div>
                            );
                        }
                        )}
                    </div>
                    <button className="black-button mx-auto mt-5 w-24 " type="button" onClick={print}>輸出PDF</button> 
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
                <div className="w-[100%] lg:w-[45%] h-96">
                    <div className="mb-3">
                        <div className="leading-[3rem] mx-auto w-full xs:w-[80%] footer:w-[60%] lg:w-[85%] text-left text-lg font-semibold tracking-wider bg-gradient-to-r from-blue-300 to-white rounded"><img src={search} className="inline-block w-8 mx-2"/>重複用藥檢核紀錄</div> 
                    </div>
              
                </div>
            </div>         
            <Footer/>
        </>
    );
};


export default MemberPage;