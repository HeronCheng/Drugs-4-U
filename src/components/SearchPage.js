import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SearchBox, InstantSearch, Hits, Highlight, Configure, Pagination, Stats } from "react-instantsearch-dom";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { Link, Outlet } from "react-router-dom";

//components
import Nav from "./Nav.js";
import Footer from "./Footer";

//圖片
import search from "../img/search.png";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter( {
    server : {
        apiKey : "b9d17neE5wyIDvtLanjhxp69KIIWfNAH", // Be sure to use an API key that only allows search operations
        nodes : [
            {
                host : "a6s4r87ukhp9q0i2p-1.a1.typesense.net",
                port : "443",
                protocol : "https",
            },
        ],
        cacheSearchResultsForSeconds : 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
    },
    additionalSearchParameters : {
        query_by : "中文品名,英文品名,主成分略述",
    },
} );
const searchClient = typesenseInstantsearchAdapter.searchClient;


const SearchPage = () => {
    const [ selectedValue, setSelectedValue ] = useState( "undischarged" );
    const handleSelectChange = ( e ) => {
        if( e.target.value === "全部藥品" ) {
            setSelectedValue( "alldrugs" );
        }
        else if( e.target.value === "已註銷藥品" ) {
            setSelectedValue( "cancellation" );
        }
        else if( e.target.value === "未註銷藥品" ) {
            setSelectedValue( "undischarged" );
        }
        else{
            setSelectedValue( "" );
        }
    };
    const [ isActive, setIsActive ] = useState( false );
    const changeArr = () => {
        setIsActive( current => !current );
    };

    function Hit( { hit } ) {
        let urlParameter = encodeURIComponent( hit.許可證字號 );
        return (
            <article className="border-solid border-2 shadow-md w-4/5 rounded-lg p-5 mx-auto my-6 leading-8 hover:shadow-lg hover:bg-slate-100">
                <Link to={`/search/${urlParameter}`}>
                    <h1 className="text-xl font-semibold mb-3 text-cyan-900"> 
                        <Highlight 
                            attribute="中文品名" 
                            hit={hit}
                            highlightedTagName="em"
                            classNames={{
                                highlighted : "bg-yellow-200 not-italic",
                            }}
                        />&nbsp;&nbsp; 
                        {hit.英文品名}
                    </h1>
                    <p className="text-zinc-700">適應症 : {hit.適應症}</p>
                    <p className="text-zinc-700">許可證字號 : {hit.許可證字號}</p>
                </Link>
            </article>
        );
    }

    return(
        <>
            <Nav/>
            <InstantSearch searchClient={searchClient} indexName={selectedValue}>
                <div className="pt-20 h-44 bg-sky-100 z-0 flex">
                    <select className={isActive?( "ml-10 h-10 w-56 rounded-lg pl-3 leading-6 mt-4 bg-dropup" ):( "ml-10 h-10 w-56 rounded-lg pl-3 leading-6 mt-4 bg-dropdown" )} onChange={e => handleSelectChange( e )} onClick={changeArr} >
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
                    <div className="flex justify-end w-11/12">
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
                    <Hits 
                        hitComponent={Hit}
                    />
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