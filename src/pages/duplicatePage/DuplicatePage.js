import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SearchBox, InstantSearch, Configure, connectHits } from "react-instantsearch-dom";
import { db, doc, collection, getDocs, deleteDoc } from "../../firebaseConfig";
import { goCheck } from "./checkResult";
import searchClient from "./typesenseConfig";
//components
import Nav from "../../components/Nav.js";
import Footer from "../../components/Footer";
import { AuthContext } from "../../App";
import Hit from "./Hit";
import ResultPart from "./ResultPart";
import SignInUpPage from "../../components/SignInUpPage";
//圖片
import search from "../../img/search.png";
import cancel from "../../img/cancel.png";
import listIcon from "../../img/playlist_add_check.png";
import loading from "../../img/loading.svg";


const DuplicatePage = () => {

    //載入圖示
    const [ isloading, setIsLoading ] = useState( true );
    //確認使用者資料
    const { isSignedIn, userUid } = useContext( AuthContext );
    const [ uid ] = userUid;
    const [ signedIn ] = isSignedIn;

    const [ isOpen, setIsOpen ] = useState( false );

    const open = () => {
        setIsOpen( true );
    };
    const close = () => {
        setIsOpen( false );
    };

    const [ dupCheckList, setDupCheckList ] = useState( [] );
    const [ listState, setListState ] = useState( "" );

    const handleList = ( id ) => {
        setListState( id ); 
    };

    //抓資料庫中的資料
    const fetchData = async( uid ) => {
        const docSnap = await getDocs( collection( db, "dup_check_list", uid, "list" ) );
        return docSnap;
    };

    let list=[];

    useEffect( () => {
        fetchData( uid ).then( result => {			
            if( result!==null ) {		
                result.forEach( ( doc ) => {                   
                    list.push( doc.data() );
                } );
                setDupCheckList( list );
                setIsLoading( false );
            } } )
            .catch( console.log( "fail" ) );
    }, [ listState, signedIn ] );

    let searchParameter=dupCheckList.map( item => {
        return { 許可證字號 : item.許可證字號,中文品名 : item.中文品名 };     
    } );

    //刪除資料
    const handleDelete = ( uid, id ) => {

        async function deleteData() {
            await deleteDoc( doc( db, "dup_check_list", uid, "list", id ) );
        }

        deleteData()
            .then( () => console.log( "success" ) )
            .catch( () => console.log( "fail" ) );

        handleList( id );
    };
    //搜尋列表
    const Hits = ( { hits } ) => (
        <ol className="w-60 rounded-xl ml-4 absolute z-10 top-[66px] left-[-16px]">
            {hits.map( hit => (
                <Hit hit={hit} key={hit.許可證字號} handleList={handleList} />
            ) )}
        </ol>
    );
    const CustomHits = connectHits( Hits );

    const [ checkState, setCheckState ] = useState( "" );

    const [ resultState, setResultState ] = useState( [] );  

    return(
        <>
            { signedIn ?
                ( <>
                    <div id="loading" className={isloading ? ( "w-full h-full flex justify-center items-center bg-zinc-300 z-20 fixed" ) : "hidden"}>
                        <img src={loading} />
                    </div>
                    <Nav />
                    <div className="pt-[67px] bg-darkblue z-0 ">
                    </div>
                    <div className="mt-5 mb-10 md:my-5 block md:flex w-full justify-center">
                        <div className={dupCheckList.length < 2 ? "w-full md:w-[44%] h-[460px] px-5 pb-5" : "w-full md:w-[44%] px-5 pb-5"}>
                            <div className="w-full xss:w-[90%] xs:w-[80%] md:w-full mx-auto">
                                <InstantSearch searchClient={searchClient} indexName="undischarged">
                                    <div className="bg-white block dup:flex">
                                        <Configure hitsPerPage={6} />
                                        <div id="dupSearch" className="relative">
                                            <img src={search} className="w-7 h-7 absolute top-8 left-3" />
                                            <SearchBox onClick={open} />
                                            {isOpen ?
                                                <CustomHits hitComponent={Hit} /> : ""}
                                        </div>
                                        <div className="ml-0 dup:ml-5 mt-2 dup:mt-6 mb-6 md:mb-0 font-semibold">檢查您是否有吃到<span className="text-rose-500">重複</span>的藥品 :
                                            <br />請搜尋藥品按下送出，<span id="dup_text_right">右</span><span className="hidden" id="dup_text_down">下</span>方會呈現結果。</div>
                                    </div>
                                </InstantSearch>
                                <div className="flex mt-3 mb-5 bg-gradient-to-r from-blue-300 to-white rounded">
                                    <img src={listIcon} className="w-[48px] h-[48px]" />
                                    <div className="leading-[3rem] font-extrabold text-2xl tracking-widest ml-2" onMouseOver={close}>已選擇藥品</div>
                                </div>
                                {dupCheckList.map( function ( item, index ) {
                                    return (
                                        <div key={Math.random()} onMouseOver={close} className="flex">
                                            <div className="w-10 mb-3 leading-[108px] text-2xl font-extrabold text-slate-50 text-center bg-gray-600 rounded mr-3">{index + 1}</div>
                                            <div className="flex w-[100%] border-2 border-stone-600 rounded mb-3 p-5 bg-zinc-50 hover:bg-zinc-100 hover:shadow-md">
                                                <div>
                                                    <Link to={`/search/${item.許可證字號}`}><div className="font-bold text-base sm:text-lg text-cyan-900 mb-2">{item.中文品名}</div><div className="text-sm sm:text-base">{item.英文品名}</div></Link>
                                                </div>
                                                <div className="flex-auto"></div>
                                                <img src={cancel} className="w-8 h-8 justify-self-end cursor-pointer" onClick={() => handleDelete( uid, item.id )} />
                                            </div>
                                        </div>
                                    );
                                }
                                )}
                                <button className="black-button mx-auto mt-4 w-20" onClick={() => goCheck( uid, searchParameter, resultState, setResultState, checkState, setCheckState, dupCheckList )}>送出</button>
                                <div id="alert" className="text-rose-500 text-center font-semibold text-lg tracking-wide"></div>
                            </div>
                        </div>
                        <ResultPart close={close} checkState={checkState} resultState={resultState} />
                    </div>
                    <Footer />
                </> ) 
                : <SignInUpPage /> }
        </>
    ); };

export default DuplicatePage;