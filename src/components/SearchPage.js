import React, { useState } from "react";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits, Highlight, RefinementList, Pagination, Configure } from "react-instantsearch-hooks-web";
import { Link, Outlet } from "react-router-dom";

//components
import Nav from "./Nav.js";
import Footer from "./Footer";

//圖片
import search from "../img/search.png";
import close from "../img/close.png";


const searchClient = algoliasearch( process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY );

function Hit( { hit } ) {
    let urlParameter = encodeURIComponent( hit.許可證字號 );
    return (
        <article className="border-solid border-2 shadow-md w-4/5 rounded-lg p-5 mx-auto leading-8 hover:shadow-lg hover:bg-slate-100">
            {/* <img src={hit.image} alt={hit.name} /> */}
            <Link to={`/search/${urlParameter}`}>
                <h1>品名 :&nbsp;  
                    <Highlight 
                        attribute="中文品名" 
                        hit={hit}
                        highlightedTagName="em"
                        classNames={{
                            highlighted : "bg-yellow-200 not-italic",
                        }}
                    />&nbsp; 
                    {hit.英文品名}
                </h1>
                <p>適應症 : {hit.適應症}</p>
                <p>許可證字號 : {hit.許可證字號}</p>
            </Link>
        </article>
    );
}

const SearchPage = () => {
    const [ selectedValue,setSelectedValue ] = useState( "undischarged" );
    const handleSelectChange = ( e ) => {
        if( e.target.value === "全部藥品" ) {
            setSelectedValue( "all" );
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
                            resetIconComponent={( { classNames } ) => (
                                <img className={classNames.resetIcon} src={close}/>
                            )}
                            classNames={{
                                input : "w-60 h-10 rounded-xl ml-4 pl-11 mt-4",
                                resetIcon : "w-7 h-7 relative right-20 top-2",
                            }}
                        />
                    </div>
                    
                </div>
                <div className="ml-9 mt-9">
                    <RefinementList attribute="適應症" />
                    <Hits 
                        hitComponent={Hit}
                        classNames={{
                            item : "my-8 ",    
                        }}
                    />
                    <Outlet />
                    <Pagination 
                        padding={2}
                        showPrevious={true}
                        showFirst={true}
                        showNext={true}
                        classNames={{
                            list : "flex mb-6 justify-center text-base",
                            item : "mx-2",
                            selectedItem : "font-semibold underline ",
                        }}
                    />
                </div>
                
            </InstantSearch>                

            <Footer/>
        </>
    );
};


export default SearchPage;