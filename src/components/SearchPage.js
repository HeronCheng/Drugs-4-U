import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SearchBox, InstantSearch, Hits, Highlight, Configure, Pagination, Stats, RefinementList } from "react-instantsearch-dom";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { Link, Outlet } from "react-router-dom";

//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import NationalDN from "../utils/nation";

//圖片
import search from "../img/search.png";
import click from "../img/click.png";

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
        query_by : "中文品名, 英文品名, 主成分略述",
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
        return (
            <article className="border-solid border-2 shadow-md rounded-lg p-5 mx-auto my-6 leading-8 hover:shadow-lg hover:bg-slate-50">
                <Link to={`/search/${urlParameter}`}>
                    <h1 className="text-xl font-semibold mb-3 text-cyan-900"> 
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
                    <hr className="mb-3"/>
                    <p className="text-zinc-700">適應症 : {hit.適應症}</p>
                    <p className="text-zinc-700">許可證字號 : {hit.許可證字號}</p>
                </Link>
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

    return(
        <>
            <Nav/>
            <InstantSearch searchClient={searchClient} indexName={selectedValue}>
                <div className="pt-20 h-44 bg-sky-100 z-0 flex">
                    <select className="ml-10 h-10 w-56 rounded-lg pl-3 leading-6 mt-4 border-slate-200 bg-dropdown" onChange={e => handleSelectChange( e )} >
                        <option value="">請選擇想搜尋的藥品範圍</option>
                        <option value="未註銷藥品">未註銷藥品</option>
                        <option value="已註銷藥品">已註銷藥品</option>
                        <option value="全部藥品">全部藥品</option>
                    </select>         
                    <Configure hitsPerPage={10} />
                    <div className="relative">
                        <img src={search} className="w-7 h-7 absolute top-6 left-6" />
                        <SearchBox 
                            placeholder="請輸入中文or英文藥品名"
                        />
                    </div>              
                </div>
                <div className="ml-9 mt-9">
                    <div className="flex justify-between w-11/12">
                        <p>目前顯示的是&nbsp;<span className="font-bold text-lg">{showSelectedValue}</span>&nbsp;清單</p>
                        <Stats 
                            translations={{
                                stats( nbHits, processingTimeMS, nbSortedHits, areHitsSorted ) {
                                    return areHitsSorted && nbHits !== nbSortedHits
                                        ? `${!nbSortedHits.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found`
                                        : `找到 ${nbHits.toLocaleString()} 筆結果`;
                                },
                            }}
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="my-6 bg-teal-50 border-emerald-100 shadow-lg p-6 rounded-lg">
                            <div className="text-2xl font-bold mb-2.5 cursor-pointer relative" onClick={showSortList}>分類<img src={click} className="w-8 absolute bottom-0.5 left-14"/></div>
                            <div className={isActive ? "block":"hidden"}>
                                <button className="black-button" value="劑型" onClick={e => changeType( e )}>藥品劑型</button>
                                <button className="black-button" value="藥品類別" onClick={e => changeType( e )}>藥品類別</button>
                                <button className="black-button" value="許可證種類" onClick={e => changeType( e )}>許可證種類</button>
                                <button className="black-button" value="管制藥品分類級別" onClick={e => changeType( e )}>管制藥品分級</button>
                                <button className="black-button" value="製造廠國別" onClick={e => changeType( e )}>製造廠國別</button>
                            </div>
                            
                            <hr/>
                            <RefinementList attribute={type} className="w-52 mr-auto text-base"/>
                        </div>
                        <Hits 
                            hitComponent={Hit}
                            className="w-2/3"
                        />
                        <div className="w-1/12"></div>
                    </div>
                    
                    <Outlet />
                    <div className="flex justify-center">
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