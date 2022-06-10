import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { SearchBox, InstantSearch, Hits, Highlight, Configure, Pagination, Stats, RefinementList } from "react-instantsearch-dom";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { Link, Outlet } from "react-router-dom";

//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import NationalDN from "../utils/nation";
import { db, doc, setDoc, collection, getDocs, getDoc, deleteDoc, query, where } from "./FirebaseConfig";

//圖片
import search from "../img/search.png";
import click from "../img/click.png";
import add from "../img/bookmark_add.png";
import fill from "../img/bookmark_add_FILL.png";
import close from "../img/close.png";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter( {
    server : {
        apiKey : process.env.REACT_APP_TYPESENSE_APIKEY, // Be sure to use an API key that only allows search operations
        nodes : [
            {
                host : process.env.REACT_APP_TYPESENSE_HOST,
                port : "443",
                protocol : "https",
            },
        ],
        cacheSearchResultsForSeconds : 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
    },
    additionalSearchParameters : {
        query_by : "中文品名, 英文品名, 主成分略述, 許可證字號",
        facet_by : "劑型, 藥品類別, 管制藥品分類級別, 製造廠國別, 許可證種類"
    },
} );
const searchClient = typesenseInstantsearchAdapter.searchClient;

const SearchPage = () => {
    const [ selectedValue, setSelectedValue ] = useState( "undischarged" );
    const [ showSelectedValue, setShowSelectedValue ] = useState( "未註銷藥品" );
    const handleSelectChange = ( e ) => {
        if( e.target.value === "全部藥品" ) {
            setSelectedValue( "alldrugs" );
            setShowSelectedValue( "全部藥品" );
        }
        else if( e.target.value === "已註銷藥品" ) {
            setSelectedValue( "cancellation" );
            setShowSelectedValue( "已註銷藥品" );
        }
        else if( e.target.value === "未註銷藥品" ) {
            setSelectedValue( "undischarged" );
            setShowSelectedValue( "未註銷藥品" );
        }
        else{
            setSelectedValue( "" );
        }
    };

    function Hit( { hit } ) {
        let urlParameter = encodeURIComponent( hit.許可證字號 );
        const [ bookMark, setBookMark ] = useState( false );

        const userId =localStorage.getItem( "userUid" );
        //添加收藏項目
        const addDoc= () => {
            let newData={
                中文品名 : hit.中文品名,
                英文品名 : hit.英文品名,
                許可證字號 : hit.許可證字號,
                成分 : hit.主成分略述,
                適應症 : hit.適應症
            };
            async function addData() {
                await setDoc( doc( db, "like_list", userId, "list", hit.許可證字號 ), newData );
            }
            addData()
                .then( () => {
                    console.log( "Document written with ID: ", hit.許可證字號 );
                    setBookMark( true );
                } )    
                .catch ( ( e ) => console.error( "Error adding document: ", e ) );
        };
        //確認此藥品是否已收藏(抓資料庫中的資料)
        const fetchData = async() => {
            const docSnap = await getDoc( doc( db, "like_list", userId, "list", hit.許可證字號 ) );
            return docSnap.data();
        };

        fetchData().then( ( result ) => {
            if( result !== undefined ) {
                setBookMark( true );
            }
            else{
                setBookMark( false );
            }
        })

        //刪除收藏項目
        const delDoc = () => {

            async function delData() {
                await deleteDoc( doc( db, "like_list", userId, "list", hit.許可證字號 ) );
            }
        
            delData()
                .then( () => {
                    console.log( "Document delete with ID: ", hit.許可證字號 );
                    setBookMark( false );
                } )    
                .catch ( ( e ) => console.error( "Error adding document: ", e ) );
        };

        return (
            <article className="border-solid border-y border-x-0 xs:border-2 shadow-none xs:shadow-md rounded-none xs:rounded-lg p-5 mx-auto my-0 xs:my-6 leading-8 hover:shadow-none xs:hover:shadow-lg hover:bg-slate-50">  
                <div className="relative">
                    <Link to={`/search/${urlParameter}`}>
                        <h1 className="text-lg xs:text-xl font-bold mb-3 text-cyan-900 w-[90%]"> 
                            <Highlight 
                                attribute="中文品名" 
                                hit={hit}
                                highlightedTagName="em"                            
                            />&nbsp;&nbsp;
                            <Highlight 
                                attribute="英文品名" 
                                hit={hit}
                                highlightedTagName="em"
                            /> 
                        </h1>
                    </Link>
                    { localStorage.getItem( "userStatus" ) ? <img src={bookMark?fill:add} className="absolute right-[-7px] top-[-7px] cursor-pointer" onClick={bookMark?delDoc:addDoc}/> : "" }
                </div>
                <hr className="mb-3"/>
                <p className="text-zinc-700 w-[95%] text-sm xs:text-base"><span className="font-semibold">適應症 :</span> {hit.適應症}</p>
                <p className="text-zinc-700 w-[95%] text-sm xs:text-base"><span className="font-semibold">許可證字號 :</span> {hit.許可證字號}</p>
            </article>
        );
    }
    //展開分類選項
    const [ isActive, setIsActive ] = useState( false );
    const showSortList = () => {
        setIsActive( !isActive );
    };
    //選取分類
    const [ type, setType ] = useState( "劑型" );
    const changeType = ( e ) => {
        setType( e.target.value );
    };
    
    const cancel = () => {
        setIsActive( false );
    };

    return(
        <>
            <Nav/>
            <InstantSearch searchClient={searchClient} indexName={selectedValue}>
                <div className="pt-[52px] tablet:pt-[67px] bg-darkblue"></div>
                <div className="block md:hidden mt-6 ml-11 text-2xl font-extrabold tracking-widest">藥品搜尋介面</div>
                <div className="h-32 tablet:h-20 z-0 block tablet:flex">
                    <select className="ml-10 h-11 w-56 rounded-xl pl-3 leading-6 mt-6 mr-0 xs:mr-3 border shadow bg-dropdown" onChange={e => handleSelectChange( e )} >
                        <option value="">請選擇想搜尋的藥品範圍</option>
                        <option value="未註銷藥品">未註銷藥品</option>
                        <option value="已註銷藥品">已註銷藥品</option>
                        <option value="全部藥品">全部藥品</option>
                    </select>  
                    <Configure hitsPerPage={10} />
                    <div className="relative block justify-center">
                        <img src={search} className="w-7 h-7 absolute top-8 left-[3.1rem] tablet:left-3" />
                        <SearchBox />
                    </div> 
                </div>
                <div className="block xs:flex justify-between w-11/12 mt-4">
                    <div>
                        <p className="pt-3 xs:pt-0 mb-5 xs:mb-0 ml-10 ">目前顯示的是&nbsp;<span className="font-bold text-lg text-rose-500">{showSelectedValue}</span>&nbsp;清單</p>
                    </div>
                    <Stats 
                        className="pt-0.5 ml-10 xs:ml-0 mb-5 xs:mb-0"
                        translations={{
                            stats( nbHits, processingTimeMS, nbSortedHits, areHitsSorted ) {
                                return areHitsSorted && nbHits !== nbSortedHits
                                    ? `${!nbSortedHits.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found`
                                    : `找到 ${nbHits.toLocaleString()} 筆結果`;
                            },
                        }}
                    />
                </div>
                <div className="mt-2.5 w-full md:w-1/3 block md:hidden mb-4 md:mb-0">
                    <div id="classification" className={isActive ?"text-xl font-bold cursor-pointer bg-blue-50 border-slate-200 border-2 rounded-lg block md:hidden w-20 text-center h-10 leading-10  ml-10 ":"text-xl font-bold mt-2.5 cursor-pointer bg-blue-50 border-slate-200 border-2 rounded-lg block md:hidden w-20 text-center ml-10 h-10 leading-10"} onClick={showSortList}>分類</div>
                    <div className={isActive ? "block bg-slate-600 ml-10 rounded-md fixed left-[14%] xxs:left-[20%] xs:left-[25%] footer:left-[33%] top-[16%]  xs:top-[19%] tablet:top-[21%] z-10 w-[200px]" :"hidden"}>
                        <div className="flex relative">
                            <select className={isActive ? "block bg-dropdown rounded-xl border h-10 pl-5 mt-4 ml-4":"hidden"} onClick={ e => changeType( e )}>
                                <option className="black-button" value="劑型" >藥品劑型</option>
                                <option className="black-button" value="藥品類別" >藥品類別</option>
                                <option className="black-button" value="許可證種類" >許可證種類</option>
                                <option className="black-button" value="管制藥品分類級別" >管制藥品分級</option>
                                <option className="black-button" value="製造廠國別" >製造廠國別</option>
                            </select>
                            <img src={close} className="w-[30px] h-[30px] invert absolute left-[166px] top-[20px] cursor-pointer" onClick={cancel}/>
                        </div>
                       
                        <RefinementList operator="or" attribute={type} className="w-40 search:w-48 lg:w-52 mx-auto text-base"/>
                    </div>
                </div>      
                <div className="ml-0 md:ml-9 mt-1.5 md:mt-4 border-t md:border-t-0">
                    <div className="flex justify-center md:justify-between">
                        <div className="hidden md:block my-6 bg-blue-50 border-slate-200 border-2 shadow-lg p-6 rounded-lg">
                            <div className="text-2xl font-bold mb-2.5 cursor-pointer relative" onClick={showSortList}>分類<img src={click} className="w-8 absolute bottom-0.5 left-14"/></div>
                            <div className={isActive ? "block":"hidden"}>
                                <button className="black-button" value="劑型" onClick={e => changeType( e )}>藥品劑型</button>
                                <button className="black-button" value="藥品類別" onClick={e => changeType( e )}>藥品類別</button>
                                <button className="black-button" value="許可證種類" onClick={e => changeType( e )}>許可證種類</button>
                                <button className="black-button" value="管制藥品分類級別" onClick={e => changeType( e )}>管制藥品分級</button>
                                <button className="black-button" value="製造廠國別" onClick={e => changeType( e )}>製造廠國別</button>
                            </div>
                            <hr className="bg-slate-300 h-0.5"/>
                            <RefinementList operator="or" attribute={type} className="w-40 search:w-48 lg:w-52 mr-auto text-base"/>
                        </div>
                        <Hits 
                            hitComponent={Hit}
                            className="w-full xs:w-[95%] tablet:w-[80%] md:w-2/3"
                        />
                        <div className="w-[1%] xl:w-1/12"></div>
                    </div>
                    <Outlet />
                    <div className="flex justify-center my-10 xs:my-5">
                        <Pagination 
                            padding={2}
                            showPrevious={true}
                            showFirst={true}
                            showNext={true}
                            showLast={true}
                        />
                    </div>
                </div>
            </InstantSearch>                
            <Footer/>
        </>
    );
};


export default SearchPage;
