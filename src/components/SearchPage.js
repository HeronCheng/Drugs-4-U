import React from "react";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits, Highlight, RefinementList, Pagination, Configure} from "react-instantsearch-hooks-web";
import { Link, Outlet } from "react-router-dom";

//components
import Nav from "./Nav.js";
import Footer from "./Footer";

//圖片
import search from "../img/search.png";
import close from "../img/close.png";


const searchClient = algoliasearch( process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY );

function Hit({ hit }) {
    let urlParameter = encodeURIComponent(hit.許可證字號);
    return (
      <article className="border-solid border-2 rounded-lg p-5 leading-8 hover:shadow-lg hover:bg-slate-100">
        {/* <img src={hit.image} alt={hit.name} /> */}
        <Link to={`/search/${urlParameter}`}>
            <h1>藥品名稱 :&nbsp;  
                <Highlight 
                attribute="中文品名" 
                hit={hit}
                highlightedTagName="em"
                classNames={{
                    highlighted: 'bg-yellow-200 not-italic',
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
    
    return(
        <>
            <Nav/>
            <InstantSearch searchClient={searchClient} indexName="undischarged">
                <div className="pt-20 h-40 bg-sky-100 z-0">
                    <Configure hitsPerPage={10} />
                    <SearchBox 
                    placeholder="請輸入中文or英文藥品名"
                    submitIconComponent={({ classNames }) => (
                        <img className={classNames.submitIcon} src={search}/>
                    )}
                    resetIconComponent={({ classNames }) => (
                        <img className={classNames.resetIcon} src={close}/>
                    )}
                    classNames={{
                        input : 'w-56 h-10 rounded-xl ml-9 pl-4',
                        submitIcon : 'w-10 h-10 relative top-3.5',
                        resetIcon : 'w-7 h-7 relative right-20 top-2',
                    }}
                    />
                </div>
                <div className="ml-9 mt-9">
                    <RefinementList attribute="適應症" />
                    <Hits 
                    hitComponent={Hit}
                    classNames={{
                        item: 'my-8',    
                    }}
                     />
                    <Outlet />
                    <Pagination 
                    padding={2}
                    showPrevious={true}
                    showFirst={true}
                    showNext={true}
                    classNames={{
                        list: 'flex mb-6 justify-center text-base',
                        item:'mx-2',
                        selectedItem:'font-semibold underline ',
                    }}
                    />
                </div>
                
            </InstantSearch>                

            <Footer/>
        </>
    );
};


export default SearchPage;